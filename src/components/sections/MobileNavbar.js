import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Icon,
  Link,
  UnorderedList,
  VStack,
} from "@chakra-ui/react"
import { AiOutlineInstagram } from "react-icons/ai"

import MobileNavItem from "./MobileNavItem"
import { getNavigationLinks } from "src/constanst/routes"
import { useGlobalContext } from "@/context"
import config from "@/contents/site-settings.json"

export default function MobileNavbar({ isOpen, onClose }) {
  const { categories } = useGlobalContext()
  const navigationLinks = getNavigationLinks(categories)
  const siteName = config.site_name || config.site_title

  return (
    <Drawer
      placement="left"
      autoFocus={false}
      onClose={onClose}
      isOpen={isOpen}
      zIndex={12}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader
          py={5}
          borderBottomWidth="1px"
          borderBottomColor="gray.200"
        >
          <Flex alignItems="center">
            <Heading size="md" fontWeight="medium">
              {siteName}
            </Heading>
          </Flex>
        </DrawerHeader>
        <DrawerBody pt={0} px={0}>
          <VStack
            w="full"
            spacing={0}
            justifyContent="space-between"
            height="full"
          >
            <UnorderedList width={"full"}>
              {navigationLinks.map((link, index, arr) => (
                <MobileNavItem
                  key={link.name}
                  to={link.to}
                  icon={link.icon}
                  activeIcon={link.activeIcon}
                  isLast={index === arr.length - 1}
                >
                  {link.name}
                </MobileNavItem>
              ))}
            </UnorderedList>

            <UnorderedList
              alignSelf="flex-end"
              w="full"
              px={6}
              pb={2}
              pt={3}
              color="brand.gray"
              display="flex"
              alignItems="center"
              borderTop="1px solid"
              borderTopColor="gray.300"
            >
              <Icon marginRight={4} boxSize="1.2em" as={AiOutlineInstagram} />
              <Link href="/redirect?url=https://instagram.com/ya.magz">
                {siteName}
              </Link>
            </UnorderedList>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
