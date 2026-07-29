import {
  fetchGoogleBooks,
  GOOGLE_BOOKS_GENRES,
  GOOGLE_BOOKS_SORT_OPTIONS,
  resolveGenre,
} from "@/libs/googleBooks"

const DEFAULT_SORT = "rating"

function resolveSort(sort) {
  return (
    GOOGLE_BOOKS_SORT_OPTIONS.find(option => option.key === sort)?.key ||
    DEFAULT_SORT
  )
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const genre = resolveGenre(req.query.genre || "all")
  const sort = resolveSort(req.query.sort)
  const page = Math.max(1, parseInt(req.query.page || "1", 10))
  const limit = Math.min(40, Math.max(1, parseInt(req.query.limit || "18", 10)))
  const startIndex = (page - 1) * limit

  try {
    const books = await fetchGoogleBooks({
      query: req.query.q || "popular books bestseller",
      genre: genre.key,
      sortBy: sort,
      maxResults: limit,
      startIndex,
      printType: "books",
      filter: "partial",
      langRestrict: "en",
      projection: "full",
    })

    return res.status(200).json({
      genre: genre.key,
      sort,
      page,
      limit,
      count: books.length,
      genres: GOOGLE_BOOKS_GENRES,
      sortOptions: GOOGLE_BOOKS_SORT_OPTIONS,
      books,
    })
  } catch (error) {
    console.error("Store API error:", error)
    return res.status(500).json({
      error: "Failed to fetch store catalog",
      genre: genre.key,
      sort,
      page,
      limit,
      genres: GOOGLE_BOOKS_GENRES,
      sortOptions: GOOGLE_BOOKS_SORT_OPTIONS,
      books: [],
    })
  }
}
