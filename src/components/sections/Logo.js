import { Text, Box, Flex } from "@chakra-ui/layout"
import Link from "next/link"

export default function Logo({ size = "md" }) {
  // Size variants for different contexts
  const sizes = {
    sm: { x: "2rem", text: "0.6rem", spacing: "-0.15rem" },
    md: { x: "2.5rem", text: "0.75rem", spacing: "-0.2rem" },
    lg: { x: "3.5rem", text: "1rem", spacing: "-0.25rem" },
    xl: { x: "5rem", text: "1.4rem", spacing: "-0.35rem" },
  }

  const s = sizes[size] || sizes.md

  return (
    <Box
      as={Link}
      href="/"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      color="gray.800"
      _hover={{ color: "brand.primary", transform: "scale(1.02)" }}
      transition="all 0.2s ease"
      fontFamily="'Georgia', 'Times New Roman', serif"
      position="relative"
    >
      {/* Container for the stacked logo design */}
      <Flex direction="column" align="center" lineHeight="1">
        {/* "Boo" - upper part along X */}
        <Flex align="flex-end" mb={s.spacing}>
          <Text
            as="span"
            fontSize={s.text}
            fontWeight="600"
            letterSpacing="0.15em"
            textTransform="uppercase"
            color="gray.700"
          >
            Boo
          </Text>
        </Flex>

        {/* Big "X" - central anchor */}
        <Text
          as="span"
          fontSize={s.x}
          fontWeight="900"
          lineHeight="0.75"
          color="gray.900"
          fontFamily="'Georgia', serif"
          letterSpacing="-0.05em"
        >
          X
        </Text>

        {/* "tore" - lower part along X */}
        <Flex align="flex-start" mt={s.spacing}>
          <Text
            as="span"
            fontSize={s.text}
            fontWeight="600"
            letterSpacing="0.15em"
            textTransform="uppercase"
            color="gray.700"
          >
            tore
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}
