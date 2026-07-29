const GOOGLE_BOOKS_API_BASE_URL = "https://www.googleapis.com/books/v1/volumes"
import { buildBookshopUrl } from "@/libs/bookshop"

export const GOOGLE_BOOKS_SORT_OPTIONS = [
  { key: "relevance", label: "Relevance" },
  { key: "newest", label: "Newest" },
  { key: "rating", label: "Top Rated" },
  { key: "ratings_count", label: "Most Rated" },
  { key: "title", label: "A-Z" },
]

export const GOOGLE_BOOKS_GENRES = [
  { key: "all", label: "All Genres", subject: "" },
  { key: "fiction", label: "Fiction", subject: "fiction" },
  { key: "fantasy", label: "Fantasy", subject: "fantasy" },
  { key: "mystery", label: "Mystery", subject: "mystery" },
  { key: "thriller", label: "Thriller", subject: "thriller" },
  { key: "romance", label: "Romance", subject: "romance" },
  { key: "history", label: "History", subject: "history" },
  { key: "science", label: "Science", subject: "science" },
  { key: "business", label: "Business", subject: "business" },
  { key: "self-help", label: "Self-Help", subject: "self-help" },
]

function getGoogleBooksApiKey() {
  return (
    process.env.GOOGLE_BOOKS_API_KEY ||
    process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY ||
    null
  )
}

function toNumber(value, fallback) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function extractIsbnFromIdentifiers(identifiers = []) {
  if (!Array.isArray(identifiers)) return null

  const isbn13 = identifiers.find(id => id?.type === "ISBN_13")?.identifier
  const isbn10 = identifiers.find(id => id?.type === "ISBN_10")?.identifier
  const isbn = isbn13 || isbn10

  if (!isbn) return null
  const normalized = String(isbn)
    .replace(/[^0-9Xx]/g, "")
    .toUpperCase()

  if (normalized.length === 10 || normalized.length === 13) {
    return normalized
  }

  return null
}

function normalizeBook(item) {
  const info = item?.volumeInfo || {}
  const isbn = extractIsbnFromIdentifiers(info.industryIdentifiers)
  const listPrice = item?.saleInfo?.listPrice

  return {
    id: item?.id,
    title: info.title || "Untitled",
    subtitle: info.subtitle || "",
    authors: info.authors || [],
    description: info.description || "",
    categories: info.categories || [],
    pageCount: info.pageCount || null,
    averageRating: toNumber(info.averageRating, null),
    ratingsCount: toNumber(info.ratingsCount, null),
    publishedDate: info.publishedDate || "",
    thumbnail:
      info.imageLinks?.thumbnail ||
      info.imageLinks?.smallThumbnail ||
      "/images/mood/v5/bohemian-reading.webp",
    infoLink: info.infoLink || "",
    previewLink: info.previewLink || "",
    isbn,
    bookshopUrl: buildBookshopUrl(isbn),
    listPrice:
      listPrice && listPrice.amount
        ? `${listPrice.amount} ${listPrice.currencyCode || ""}`.trim()
        : null,
  }
}

function sortBooks(books, sortBy) {
  const clone = [...books]

  switch (sortBy) {
    case "rating":
      return clone.sort((a, b) => {
        const left = (a.averageRating || 0) * (a.ratingsCount || 0)
        const right = (b.averageRating || 0) * (b.ratingsCount || 0)
        return right - left
      })
    case "ratings_count":
      return clone.sort((a, b) => (b.ratingsCount || 0) - (a.ratingsCount || 0))
    case "title":
      return clone.sort((a, b) => a.title.localeCompare(b.title))
    case "newest":
      return clone.sort((a, b) => {
        const left = new Date(a.publishedDate || 0).getTime()
        const right = new Date(b.publishedDate || 0).getTime()
        return right - left
      })
    default:
      return clone
  }
}

function getOrderBy(sortBy) {
  if (sortBy === "newest") return "newest"
  return "relevance"
}

export function resolveGenre(genreKey = "all") {
  return (
    GOOGLE_BOOKS_GENRES.find(genre => genre.key === genreKey) ||
    GOOGLE_BOOKS_GENRES[0]
  )
}

export async function fetchGoogleBooks({
  query = "",
  genre = "all",
  maxResults = 8,
  startIndex = 0,
  orderBy,
  sortBy = "relevance",
  printType = "books",
  filter = "partial",
  langRestrict = "en",
  projection = "full",
}) {
  const url = new URL(GOOGLE_BOOKS_API_BASE_URL)
  const selectedGenre = resolveGenre(genre)
  const apiOrderBy = orderBy || getOrderBy(sortBy)

  const fullQuery = [
    query,
    selectedGenre.subject ? `subject:${selectedGenre.subject}` : "",
  ]
    .filter(Boolean)
    .join(" ")

  url.searchParams.set("q", fullQuery || "popular books")
  url.searchParams.set("maxResults", String(maxResults))
  url.searchParams.set("startIndex", String(startIndex))
  url.searchParams.set("orderBy", apiOrderBy)
  url.searchParams.set("printType", printType)
  url.searchParams.set("filter", filter)
  url.searchParams.set("langRestrict", langRestrict)
  url.searchParams.set("projection", projection)

  const key = getGoogleBooksApiKey()
  if (key) {
    url.searchParams.set("key", key)
  }

  const response = await fetch(url.toString())

  if (!response.ok) {
    let errorPayload = null
    try {
      errorPayload = await response.json()
    } catch (error) {
      errorPayload = null
    }

    console.warn("Google Books API request failed", {
      status: response.status,
      query,
      message: errorPayload?.error?.message,
    })
    return []
  }

  const data = await response.json()
  const isbnOnlyBooks = (data.items || [])
    .map(normalizeBook)
    .filter(book => Boolean(book.isbn))

  return sortBooks(isbnOnlyBooks, sortBy)
}
