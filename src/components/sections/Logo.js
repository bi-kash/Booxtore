import { Text, Box } from "@chakra-ui/layout"
import Link from "next/link"
import config from "@/contents/site-settings.json"

export default function Logo() {
  // Split logo text on first space
  const logoText = config.logo_text || config.site_title || "Site Logo"
  const firstSpaceIndex = logoText.indexOf(" ")

  let topLine = logoText
  let bottomLine = ""

  if (firstSpaceIndex !== -1) {
    topLine = logoText.substring(0, firstSpaceIndex)
    bottomLine = logoText.substring(firstSpaceIndex + 1)
  }

  return (
    <Box
      as={Link}
      href="/"
      display="flex"
      flexDirection="column"
      color="black"
      fontSize="1.25rem"
      _hover={{ color: "blue.900" }}
      fontFamily="montserrat, system-ui, open-sans, sans-serif"
      lineHeight={1}
      position="relative"
    >
      <Text as="span" fontWeight="500" fontStyle="italic">
        {topLine}
      </Text>
      {bottomLine && (
        <Text as="span" fontWeight="900">
          {bottomLine}
        </Text>
      )}
    </Box>
  )
}
