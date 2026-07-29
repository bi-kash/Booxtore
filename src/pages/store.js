import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react"
import Link from "next/link"
import Layout from "@/components/layout"
import Meta from "@/components/meta"
import { buildBookshopUrl } from "@/libs/bookshop"
import {
  fetchGoogleBooks,
  GOOGLE_BOOKS_GENRES,
  GOOGLE_BOOKS_SORT_OPTIONS,
  resolveGenre,
} from "@/libs/googleBooks"

export const DEFAULT_SORT = "rating"

const fallbackBooks = [
  {
    id: "fallback-1",
    title: "The Midnight Library",
    authors: ["Matt Haig"],
    description:
      "A hopeful novel about second chances and the lives we might have lived.",
    categories: ["Fiction"],
    thumbnail: "/images/mood/v5/bohemian-reading.webp",
    isbn: "9780525559474",
  },
  {
    id: "fallback-2",
    title: "Atomic Habits",
    authors: ["James Clear"],
    description:
      "Practical strategies to build good habits and break bad ones.",
    categories: ["Self-Help"],
    thumbnail: "/images/mood/v5/bohemian-reading.webp",
    isbn: "9780735211292",
  },
  {
    id: "fallback-3",
    title: "The Silent Patient",
    authors: ["Alex Michaelides"],
    description:
      "A sharp psychological thriller about silence, obsession, and truth.",
    categories: ["Mystery"],
    thumbnail: "/images/mood/v5/bohemian-reading.webp",
    isbn: "9781250301697",
  },
  {
    id: "fallback-4",
    title: "Project Hail Mary",
    authors: ["Andy Weir"],
    description:
      "A science-driven space adventure with humor, heart, and high stakes.",
    categories: ["Fantasy"],
    thumbnail: "/images/mood/v5/bohemian-reading.webp",
    isbn: "9780593135204",
  },
  {
    id: "fallback-5",
    title: "The 7 Habits of Highly Effective People",
    authors: ["Stephen R. Covey"],
    description:
      "A timeless framework for personal leadership and long-term growth.",
    categories: ["Business"],
    thumbnail: "/images/mood/v5/bohemian-reading.webp",
    isbn: "9781471195204",
  },
  {
    id: "fallback-6",
    title: "The Love Hypothesis",
    authors: ["Ali Hazelwood"],
    description:
      "A smart and funny romance set in the world of academic science.",
    categories: ["Romance"],
    thumbnail: "/images/mood/v5/bohemian-reading.webp",
    isbn: "9780593336823",
  },
]

export function resolveSort(sort) {
  return (
    GOOGLE_BOOKS_SORT_OPTIONS.find(option => option.key === sort)?.key ||
    DEFAULT_SORT
  )
}

export function getStoreGenrePath(genreKey) {
  return genreKey === "all" ? "/store" : `/store/${genreKey}`
}

function withBookshopUrls(books = []) {
  return books
    .map(book => ({
      ...book,
      bookshopUrl: buildBookshopUrl(book.isbn),
    }))
    .filter(book => Boolean(book.bookshopUrl))
}

function compactDescription(text, maxLength = 180) {
  if (!text) return ""
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trim()}...`
}

function BookCard({ book }) {
  return (
    <Flex
      direction="column"
      border="1px solid"
      borderColor="rgba(15, 76, 92, 0.12)"
      borderRadius="xl"
      bg="white"
      boxShadow="0 10px 24px rgba(16, 33, 58, 0.06)"
      overflow="hidden"
      h="100%"
    >
      <Flex
        bg="linear-gradient(135deg, rgba(15, 76, 92, 0.08) 0%, rgba(192, 132, 61, 0.12) 100%)"
        justify="center"
        align="center"
        p={4}
        minH="240px"
      >
        <Box
          as="img"
          src={book.thumbnail}
          alt={book.title}
          maxH="220px"
          objectFit="contain"
          borderRadius="md"
          boxShadow="0 8px 24px rgba(16, 33, 58, 0.16)"
        />
      </Flex>

      <VStack align="stretch" spacing={3} p={5} h="100%">
        <VStack align="stretch" spacing={2}>
          <Heading size="md" lineHeight="1.2" color="brand.ink">
            {book.title}
          </Heading>

          {book.subtitle && (
            <Text fontSize="sm" color="brand.gray" fontStyle="italic">
              {book.subtitle}
            </Text>
          )}

          {book.authors?.length > 0 && (
            <Text fontSize="sm" color="brand.gray">
              By {book.authors.join(", ")}
            </Text>
          )}

          {book.categories?.[0] && (
            <Badge
              alignSelf="flex-start"
              colorScheme="teal"
              variant="subtle"
              px={2}
              py={1}
              borderRadius="full"
            >
              {book.categories[0]}
            </Badge>
          )}

          {book.averageRating && (
            <Text fontSize="sm" color="brand.gray">
              Rating: {book.averageRating}/5
              {book.ratingsCount ? ` (${book.ratingsCount.toLocaleString()})` : ""}
            </Text>
          )}

          {book.description && (
            <Text fontSize="sm" color="gray.700" lineHeight="1.65">
              {compactDescription(book.description)}
            </Text>
          )}
        </VStack>

        <Stack spacing={2} mt="auto" pt={1}>
          <Button
            as="a"
            href={book.bookshopUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="md"
          >
            Buy & Support Local Bookstores
          </Button>

          {book.infoLink && (
            <Button
              as="a"
              href={book.infoLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="sm"
            >
              More Details
            </Button>
          )}
        </Stack>
      </VStack>
    </Flex>
  )
}

function BookSection({ title, books }) {
  if (!books?.length) return null

  return (
    <Box as="section" w="100%" maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
      <Heading as="h2" size="2xl" mb={6} color="brand.ink" letterSpacing="0.02em">
        {title}
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default function StorePage({
  featuredNewest,
  featuredPopular,
  genreBooks,
  activeGenre,
  activeSort,
  genres,
  sortOptions,
  isFallback,
  canonicalUrl,
  showFeaturedSections,
}) {
  const activeGenreLabel =
    genres.find(genre => genre.key === activeGenre)?.label || "All Genres"
  const isGenreStorePage = !showFeaturedSections

  return (
    <Layout>
      <Meta
        url={canonicalUrl}
        title="Bookstore"
        description="ISBN-based book catalog by genre with sorting and local bookstore buy links."
        keywords={[
          "google books api",
          "isbn books",
          "book genres",
          "latest books",
          "popular books",
          "support local bookstores",
        ]}
      />

      <Box
        bg="radial-gradient(circle at 10% 10%, rgba(15, 76, 92, 0.08), transparent 35%), radial-gradient(circle at 90% 15%, rgba(192, 132, 61, 0.09), transparent 32%), #fcfaf5"
        pt={{ base: 8, md: 12 }}
        pb={{ base: 12, md: 16 }}
      >
        <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }} mb={10}>
          <VStack
            align="stretch"
            spacing={5}
            bg="rgba(255, 255, 255, 0.76)"
            border="1px solid"
            borderColor="rgba(15, 76, 92, 0.14)"
            borderRadius="2xl"
            p={{ base: 6, md: 8 }}
            boxShadow="0 16px 36px rgba(16, 33, 58, 0.08)"
          >
            <Badge
              alignSelf="flex-start"
              colorScheme="orange"
              variant="subtle"
              px={3}
              py={1}
              borderRadius="full"
            >
              ISBN-Only Catalog
            </Badge>

            <Heading as="h1" size="3xl" lineHeight="1.1" color="brand.ink">
              {isGenreStorePage
                ? `${activeGenreLabel} Book Store`
                : "Latest and popular books, organized like a real store."}
            </Heading>

            <Text fontSize={{ base: "md", md: "lg" }} color="brand.gray" maxW="3xl">
              {isGenreStorePage
                ? `You're in the dedicated ${activeGenreLabel.toLowerCase()} page. Browse this category and sort by relevance, newest, ratings, or title.`
                : "Browse by genre routes like /store/fiction, and sort catalog sections by relevance, newest, rating, rating count, or title."}
            </Text>

            <Text color="brand.gray" fontSize="sm">
              Some books might be cheaper elsewhere, but buying here helps
              independent bookstores and neighborhood reading communities.
            </Text>
          </VStack>
        </Box>

        <Box w="100%" maxW="1200px" mx="auto" px={{ base: 4, md: 8 }} mb={10}>
          <VStack
            align="stretch"
            spacing={4}
            bg="rgba(255, 255, 255, 0.72)"
            border="1px solid"
            borderColor="rgba(15, 76, 92, 0.14)"
            borderRadius="xl"
            p={{ base: 4, md: 5 }}
          >
            <Text fontWeight="700" color="brand.secondary">
              Store Genres
            </Text>
            <HStack spacing={2} overflowX="auto" py={1}>
              {genres.map(genre => {
                const isActive = genre.key === activeGenre
                const basePath = getStoreGenrePath(genre.key)
                const href = activeSort ? `${basePath}?sort=${activeSort}` : basePath

                return (
                  <Button
                    key={genre.key}
                    as={Link}
                    href={href}
                    size="sm"
                    whiteSpace="nowrap"
                    variant={isActive ? "primary" : "outline"}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {genre.label}
                  </Button>
                )
              })}
            </HStack>

            <Text fontWeight="700" color="brand.secondary" mt={2}>
              Sort Catalog
            </Text>
            <HStack spacing={2} overflowX="auto" py={1}>
              {sortOptions.map(sort => {
                const isActive = sort.key === activeSort
                const basePath = getStoreGenrePath(activeGenre)
                const href = `${basePath}?sort=${sort.key}`

                return (
                  <Button
                    key={sort.key}
                    as={Link}
                    href={href}
                    size="sm"
                    whiteSpace="nowrap"
                    variant={isActive ? "primary" : "outline"}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {sort.label}
                  </Button>
                )
              })}
            </HStack>
          </VStack>
        </Box>

        {isFallback && (
          <Box w="100%" maxW="1200px" mx="auto" px={{ base: 4, md: 8 }} mb={10}>
            <Text
              color="brand.gray"
              bg="rgba(255,255,255,0.72)"
              border="1px solid"
              borderColor="rgba(15, 76, 92, 0.14)"
              borderRadius="lg"
              px={4}
              py={3}
            >
              Live Google Books results are temporarily unavailable. Showing
              curated ISBN titles for now.
            </Text>
          </Box>
        )}

        <VStack spacing={12} align="stretch">
          {showFeaturedSections && (
            <>
              <BookSection title="Latest Releases" books={featuredNewest} />
              <BookSection title="Most Popular Picks" books={featuredPopular} />
            </>
          )}
          <BookSection
            title={
              isGenreStorePage
                ? `${activeGenreLabel} Collection`
                : `Genre Spotlight: ${activeGenreLabel}`
            }
            books={genreBooks}
          />
        </VStack>
      </Box>
    </Layout>
  )
}

export async function buildStoreProps({
  genre = "all",
  sort = DEFAULT_SORT,
  showFeaturedSections = true,
}) {
  const activeGenre = resolveGenre(genre).key
  const activeSort = resolveSort(sort)

  try {
    let latestBooks = []
    let popularBooks = []

    if (showFeaturedSections) {
      ;[latestBooks, popularBooks] = await Promise.all([
        fetchGoogleBooks({
          query: "award winning books",
          genre: "all",
          sortBy: "newest",
          maxResults: 9,
          printType: "books",
          filter: "partial",
        }),
        fetchGoogleBooks({
          query: "bestseller books popular books",
          genre: "all",
          sortBy: "ratings_count",
          maxResults: 9,
          printType: "books",
          filter: "partial",
        }),
      ])
    }

    const selectedGenreBooks = await fetchGoogleBooks({
      query: "popular books",
      genre: activeGenre,
      sortBy: activeSort,
      maxResults: 18,
      printType: "books",
      filter: "partial",
    })

    const fallback = withBookshopUrls(fallbackBooks)
    const featuredNewest =
      showFeaturedSections && latestBooks.length > 0 ? latestBooks : fallback
    const featuredPopular =
      showFeaturedSections && popularBooks.length > 0 ? popularBooks : fallback
    const genreBooks = selectedGenreBooks.length > 0 ? selectedGenreBooks : fallback

    return {
      featuredNewest,
      featuredPopular,
      genreBooks,
      activeGenre,
      activeSort,
      genres: GOOGLE_BOOKS_GENRES,
      sortOptions: GOOGLE_BOOKS_SORT_OPTIONS,
      canonicalUrl: getStoreGenrePath(activeGenre),
      showFeaturedSections,
      isFallback: showFeaturedSections
        ? latestBooks.length === 0 &&
          popularBooks.length === 0 &&
          selectedGenreBooks.length === 0
        : selectedGenreBooks.length === 0,
    }
  } catch (error) {
    console.error("Error building store page:", error)

    const fallback = withBookshopUrls(fallbackBooks)

    return {
      featuredNewest: fallback,
      featuredPopular: fallback,
      genreBooks: fallback,
      activeGenre,
      activeSort,
      genres: GOOGLE_BOOKS_GENRES,
      sortOptions: GOOGLE_BOOKS_SORT_OPTIONS,
      canonicalUrl: getStoreGenrePath(activeGenre),
      showFeaturedSections,
      isFallback: true,
    }
  }
}

export async function getServerSideProps({ query }) {
  const props = await buildStoreProps({
    genre: "all",
    sort: query.sort,
    showFeaturedSections: true,
  })

  return {
    props,
  }
}
