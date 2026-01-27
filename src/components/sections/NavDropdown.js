import {
  Box,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
} from "@chakra-ui/react"
import { HiChevronDown } from "react-icons/hi"
import Link from "next/link"
import { useRouter } from "next/router"
import { CATEGORY_ID_ROUTE } from "src/constanst/routes"
import config from "@/contents/site-settings.json"

// Get category info by slug
function getCategoryBySlug(slug) {
  const categories = config.predefined_categories || []
  return categories.find(cat => cat.slug === slug)
}

// Single dropdown group
function NavDropdownGroup({ group }) {
  const router = useRouter()

  // Check if any item in this group is active
  const isGroupActive = group.items.some(
    slug =>
      router.asPath === CATEGORY_ID_ROUTE(slug) ||
      router.asPath.startsWith(CATEGORY_ID_ROUTE(slug) + "/")
  )

  return (
    <Menu isLazy>
      <MenuButton
        as={Box}
        cursor="pointer"
        px={3}
        py={2}
        fontSize="sm"
        fontWeight={isGroupActive ? 600 : 400}
        color={isGroupActive ? "gray.900" : "gray.600"}
        _hover={{ color: "gray.900" }}
        transition="color 0.2s"
        display="flex"
        alignItems="center"
        gap={1}
      >
        <Text as="span">{group.label}</Text>
        <Icon as={HiChevronDown} boxSize="0.9em" />
      </MenuButton>
      <MenuList
        bg="white"
        border="1px solid"
        borderColor="gray.100"
        boxShadow="lg"
        borderRadius="md"
        py={2}
        minW="180px"
        zIndex={20}
      >
        {group.items.map(slug => {
          const category = getCategoryBySlug(slug)
          if (!category) return null

          const isActive = router.asPath === CATEGORY_ID_ROUTE(slug)

          return (
            <MenuItem
              key={slug}
              as={Link}
              href={CATEGORY_ID_ROUTE(slug)}
              fontSize="sm"
              fontWeight={isActive ? 600 : 400}
              color={isActive ? "brand.primary" : "gray.700"}
              bg="transparent"
              _hover={{ bg: "gray.50", color: "brand.primary" }}
              _focus={{ bg: "gray.50" }}
              px={4}
              py={2}
            >
              {category.name}
            </MenuItem>
          )
        })}
      </MenuList>
    </Menu>
  )
}

// Desktop navbar with dropdowns
export default function NavDropdown() {
  const navGroups = config.navbar_groups || []

  return (
    <Flex display={{ base: "none", md: "flex" }} alignItems="center" gap={1}>
      {/* Home link */}
      <Box
        as={Link}
        href="/"
        px={3}
        py={2}
        fontSize="sm"
        fontWeight={400}
        color="gray.600"
        _hover={{ color: "gray.900" }}
        transition="color 0.2s"
      >
        Home
      </Box>

      {/* Dropdown groups */}
      {navGroups.map((group, index) => (
        <NavDropdownGroup key={index} group={group} />
      ))}
    </Flex>
  )
}
