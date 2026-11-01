import Layout from "@/components/layout"
import ArticleList from "@/components/article/ArticleList"
import Meta from "@/components/meta"
import { countArticles, fetchArticles } from "@/libs/api"
import { ARTICLE_PAGE_ROUTE } from "src/constanst/routes"
import config from "@/contents/site-settings.json"

export default function Page({ articles, pagination, page }) {
  const url = ARTICLE_PAGE_ROUTE(page)
  const title = `All posts page ${page}`
  return (
    <Layout>
      <Meta url={url} title={title} />
      <ArticleList
        title={"Articles"}
        articles={articles}
        pagination={pagination}
      />
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  try {
    const page = parseInt(params.page, 10)
    if (isNaN(page) || page < 1) {
      return {
        notFound: true,
      }
    }

    if (page === 1) {
      return {
        redirect: {
          destination: "/article",
          permanent: false,
        },
      }
    }

    const postsPerPage = config.posts_per_page || 9
    const offset = (page - 1) * postsPerPage

    const [articles, count] = await Promise.all([
      fetchArticles({ limit: postsPerPage, offset }),
      countArticles(),
    ])

    const totalPages = Math.ceil((count || 0) / postsPerPage)

    const pagination = {
      current: page,
      pages: totalPages,
    }

    return {
      props: {
        articles: articles || [],
        pagination,
        page,
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error("Error in getStaticProps for article page:", error)
    return {
      props: {
        articles: [],
        pagination: {
          current: parseInt(params.page, 10) || 1,
          pages: 0,
        },
        page: parseInt(params.page, 10) || 1,
      },
      revalidate: 60,
    }
  }
}

export async function getStaticPaths() {
  try {
    const postsPerPage = config.posts_per_page || 9
    const count = await countArticles()
    const pages = Math.ceil((count || 0) / postsPerPage)
    const paths = []

    for (let i = 2; i <= pages; i++) {
      paths.push({
        params: { page: i.toString() },
      })
    }

    return {
      paths,
      fallback: "blocking",
    }
  } catch (error) {
    console.error("Error generating article pagination paths:", error)
    return {
      paths: [],
      fallback: "blocking",
    }
  }
}
