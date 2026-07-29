import { extendTheme, theme as chakraTheme } from "@chakra-ui/react"

const theme = extendTheme({
  fonts: {
    heading: "'Cormorant Garamond', Georgia, serif",
    body: "'Karla', -apple-system, BlinkMacSystemFont, sans-serif",
    serif: "'Lora', Georgia, serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  colors: {
    brand: {
      primary: "#0F4C5C",
      secondary: "#1B263B",
      accent: "#C0843D",
      cream: "#FCFAF5",
      parchment: "#F2EEE4",
      ink: "#1A2333",
      gray: "#5F6B7A",
      lightGray: "#99A3AF",
    },
  },
  breakpoints: {
    sm: "30em", // small phone
    md: "48em", // ipad
    lg: "62em", // ipad pro
    xl: "80em", // laptop
    xxl: "96em", // pc
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "600",
        borderRadius: "sm",
      },
      variants: {
        primary: {
          bg: "brand.primary",
          color: "white",
          _hover: { bg: "#0B3C49", transform: "translateY(-1px)" },
        },
        outline: {
          borderColor: "brand.primary",
          color: "brand.primary",
          _hover: { bg: "brand.parchment" },
        },
      },
    },
    Heading: {
      baseStyle: {
        fontFamily: "'Playfair Display', Georgia, serif",
        fontWeight: "700",
        color: "brand.ink",
      },
    },
    Text: {
      baseStyle: {
        color: "gray.700",
        lineHeight: "1.7",
      },
    },
    Link: {
      baseStyle: {
        color: "brand.primary",
        _hover: { textDecoration: "underline", color: "brand.secondary" },
      },
    },
  },
  styles: {
    global: {
      "::selection": {
        color: "white",
        background: "#0F4C5C",
      },
      "::-webkit-scrollbar": {
        width: "0.5em",
      },
      "::-webkit-scrollbar-track": {
        background: "#F2EEE4",
      },
      "::-webkit-scrollbar-thumb": {
        transition: "150ms all ease-in-out",
        bgColor: "#B9C3CE",
        borderRadius: "full",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#99A3AF",
      },
      html: {
        scrollBehavour: "smooth",
      },
      "html, body": {
        overflowX: "hidden",
        backgroundColor: "#FCFAF5",
        color: "#1A2333",
        fontSize: "16px",
        lineHeight: "1.7",
      },
      ".booxtore-logo": {
        fontFamily: "'Georgia', 'Times New Roman', serif",
      },
      ".markdown": {
        "div.end-p": {
          marginBottom: 4,
        },
        a: {
          color: "#0F4C5C",
          fontWeight: "500",
          _hover: {
            textDecoration: "underline",
            color: "#1B263B",
          },
        },
        p: {
          fontFamily: "'Lora', Georgia, serif",
          lineHeight: "1.8",
          marginY: 6,
          fontSize: "lg",
          color: "#2A3343",
          letterSpacing: "0.01em",
        },
        "h1, h2, h3, h4, h5, h6": {
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 700,
          marginTop: 8,
          marginBottom: 4,
          textOverflow: "ellipsis",
          lineHeight: "1.3",
          color: "#1A2333",
        },
        h1: {
          fontSize: "4xl",
        },
        h2: {
          fontSize: "3xl",
        },
        h3: {
          fontSize: "2xl",
        },
        h4: {
          fontSize: "xl",
        },
        h5: {
          fontSize: "lg",
        },
        h6: {
          fontSize: "md",
        },
        blockquote: {
          pl: 6,
          py: 2,
          my: 6,
          pos: "relative",
          fontStyle: "italic",
          color: "#425063",
          bg: "#F3F6F9",
          borderRadius: "md",
          _before: {
            content: "''",
            display: "block",
            pos: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "4px",
            bgColor: "#0F4C5C",
            borderRadius: "full",
          },
        },
        table: {
          maxWidth: "full",
          borderSpacing: 0,
          mt: 6,
          borderRadius: "md",
          overflow: "hidden",
          thead: {
            background: "#EAF0F5",
          },
          th: {
            fontWeight: 600,
            color: "#1A2333",
          },
          "th, td": {
            padding: "0.75em 1em",
            border: "1px solid #D7E0E9",
          },
        },
        "ol, ul": {
          padding: 0,
          fontSize: "lg",
        },
        li: {
          lineHeight: "1.8",
          marginLeft: 6,
          paddingLeft: 2,
          marginBottom: 3,
        },
      },
      "#nprogress": {
        pointerEvents: "none",
      },
      "#nprogress .bar": {
        background: "#0F4C5C",
        pos: "fixed",
        zIndex: 99999,
        top: 0,
        left: 0,
        width: "full",
        height: "3px",
      },
      ".nprogress-custom-parent": {
        overflow: "hidden",
        position: "absolute",
      },
    },
  },
})

export default theme
