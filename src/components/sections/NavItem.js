import Link from "next/link"
import { useRouter } from "next/router"
import { ListItem, Text } from "@chakra-ui/react"

export default function NavItem({ children, isLast, to = "/", ...rest }) {
  const router = useRouter()
  const isActive = router.asPath === to || router.asPath.startsWith(to + "/")
  return (
    <ListItem listStyleType="none">
      <Text
        as={Link}
        href={to}
        display="block"
        color={isActive ? "black" : "brand.gray"}
        cursor="pointer"
        fontWeight={isActive ? 700 : 400}
        _hover={{
          color: "black",
        }}
        fontFamily="body"
        mb={{ base: isLast ? 4 : 8, md: 0 }}
        mr={{ base: 0, md: isLast ? 0 : 8 }}
        {...rest}
      >
        {children}
      </Text>
    </ListItem>
  )
}
