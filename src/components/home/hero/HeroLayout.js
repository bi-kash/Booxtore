import { Stack } from "@chakra-ui/react"

export default function HeroLayout({ children }) {
  return (
    <Stack
      direction={{
        base: "column-reverse",
        md: "row",
      }}
      bg="linear-gradient(140deg, #f7f4ec 0%, #edf4f8 50%, #f7f4ec 100%)"
      border="1px solid"
      borderColor="rgba(15, 76, 92, 0.14)"
      borderRadius={{ base: "none", md: "2xl" }}
      mx={{ base: 0, md: 8, xl: 14 }}
      mt={{ base: 2, md: 4 }}
      overflow="hidden"
      boxShadow="0 12px 40px rgba(16, 33, 58, 0.08)"
      gap={0}
    >
      {children}
    </Stack>
  )
}
