export function generatePagination(current, pages) {
  const safePages = Math.floor(Number(pages))
  if (!safePages || safePages <= 1 || isNaN(safePages)) {
    return []
  }
  return Array.from(Array(safePages).keys())
    .map(it => it + 1)
    .filter(it => it === 1 || it === safePages || Math.abs(current - it) <= 2)
    .map(it => ({
      page:
        Math.abs(current - it) === 2 && it !== 1 && it !== safePages ? null : it,
      current: it === current,
      excerpt: Math.abs(current - it) === 2 && it !== 1 && it !== safePages,
    }))
}
