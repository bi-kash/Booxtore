import StorePage, { buildStoreProps, getStoreGenrePath } from "../store"
import { resolveGenre } from "@/libs/googleBooks"

export default StorePage

export async function getServerSideProps({ params, query }) {
  const inputGenre = params?.genre || "all"
  const resolvedGenre = resolveGenre(inputGenre)

  if (resolvedGenre.key !== inputGenre) {
    return {
      redirect: {
        destination: getStoreGenrePath(resolvedGenre.key),
        permanent: false,
      },
    }
  }

  const props = await buildStoreProps({
    genre: resolvedGenre.key,
    sort: query.sort,
    showFeaturedSections: false,
  })

  return {
    props,
  }
}
