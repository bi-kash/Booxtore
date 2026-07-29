const DEFAULT_BOOKSHOP_AFFILIATE_ID = "121771"

export function getBookshopAffiliateId() {
  return (
    process.env.NEXT_PUBLIC_BOOKSHOP_AFFILIATE_ID ||
    process.env.BOOKSHOP_AFFILIATE_ID ||
    DEFAULT_BOOKSHOP_AFFILIATE_ID
  )
}

export function buildBookshopUrl(isbn) {
  if (!isbn) return null

  const normalizedIsbn = String(isbn)
    .replace(/[^0-9Xx]/g, "")
    .toUpperCase()

  if (normalizedIsbn.length !== 10 && normalizedIsbn.length !== 13) {
    return null
  }

  const affiliateId = getBookshopAffiliateId()
  return `https://bookshop.org/a/${affiliateId}/${normalizedIsbn}`
}
