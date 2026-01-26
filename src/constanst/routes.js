import { AiFillHome, AiOutlineHome } from "react-icons/ai"
import { BiCategory } from "react-icons/bi"

export const HOME_ROUTE = "/"
export const ARTICLE_ROUTE = "/article"
export const MAGAZINE_ROUTE = "/magazine"
export const GALLERY_ROUTE = "/gallery"
export const ENTERTAINMENT_ROUTE = "/entertainment"
export const AUTHORS_ROUTE = "/authors"
export const ABOUT_US_ROUTE = "/about-us"
export const MEET_THE_TEAM_ROUTE = "/meet-the-team"
export const CATEGORIES_ROUTE = "/category"

export const ARTICLE_ID_ROUTE = id => `${ARTICLE_ROUTE}/${id}`
export const CATEGORY_ID_ROUTE = id => `${CATEGORIES_ROUTE}/${id}`
export const AUTHOR_ID_ROUTE = id => `${AUTHORS_ROUTE}/${id}`
export const ARTICLE_PAGE_ROUTE = page => `${ARTICLE_ROUTE}/page/${page}`

// Generate navigation links from categories
export const getNavigationLinks = (categories = []) => {
  const links = [
    {
      name: "Home",
      to: HOME_ROUTE,
      icon: AiOutlineHome,
      activeIcon: AiFillHome,
    },
  ]

  // Add all category links to navbar
  categories.forEach(category => {
    links.push({
      name: category.name,
      to: CATEGORY_ID_ROUTE(category.slug),
      icon: BiCategory,
      activeIcon: BiCategory,
    })
  })

  return links
}

// Default navigation links (used as fallback)
export const navigationLinks = [
  {
    name: "Home",
    to: HOME_ROUTE,
    icon: AiOutlineHome,
    activeIcon: AiFillHome,
  },
]

export const footerLinks = [
  { name: "Home", path: HOME_ROUTE },
  { name: "Articles", path: ARTICLE_ROUTE },
  { name: "Magazines", path: MAGAZINE_ROUTE },
  { name: "Authors", path: AUTHORS_ROUTE },
  { name: "About Us", path: ABOUT_US_ROUTE },
  { name: "Meet the Team", path: MEET_THE_TEAM_ROUTE },
  { name: "Gallery", path: GALLERY_ROUTE },
]
