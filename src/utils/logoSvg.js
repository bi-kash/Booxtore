/**
 * Shared Booxtore Logo SVG Generator
 * Used by generate-icons.js script
 *
 * Matches the visual design from Logo.js:
 * - md size: X = 2.5rem, text = 0.75rem (ratio 0.3)
 * - spacing = -0.2rem (ratio -0.08 of X)
 * - X lineHeight = 0.75
 */

/**
 * Generate Booxtore logo SVG markup
 * @param {Object} options - Configuration options
 * @param {number} options.size - Canvas size in pixels
 * @param {string} options.bgColor - Background color
 * @param {string} options.primaryColor - Color for the big X (gray.900)
 * @param {string} options.secondaryColor - Color for BOO and TORE text (gray.700)
 * @param {boolean} options.includeBg - Whether to include background rect
 * @returns {string} SVG markup string
 */
function generateLogoSvg(options = {}) {
  const {
    size = 100,
    bgColor = "#FDFBF7",
    primaryColor = "#111827", // gray.900
    secondaryColor = "#374151", // gray.700
    includeBg = true,
  } = options

  // EXACTLY match Logo.js ratios from "md" size:
  // X = 2.5rem, text = 0.75rem → text/X = 0.3
  // spacing = -0.2rem → spacing/X = 0.08
  const xFontSize = Math.round(size * 0.5) // X takes 50% of canvas
  const textFontSize = Math.round(xFontSize * 0.3) // Exactly 30% of X (0.75/2.5)
  // Reduce spacing so BOO/TORE sit further from X (match Logo.js visual)
  // Make spacing smaller than previous 8% to increase separation visually
  const spacing = Math.round(xFontSize * 0.03) // ~3.5% of X size

  const centerX = size / 2

  // Calculate total height of stacked elements (matching flex column behavior)
  // In Logo.js: BOO + negative margin + X (with lineHeight 0.75) + negative margin + TORE
  const xVisualHeight = xFontSize * 0.75 // lineHeight: 0.75 compresses X
  const totalHeight = textFontSize + xVisualHeight + textFontSize - spacing * 2

  // Start Y position to vertically center the whole stack
  const startY = (size - totalHeight) / 2

  // Position each element (SVG text y = baseline)
  const booBaseline = startY + textFontSize * 0.85 // baseline ~85% down from top of text
  const xBaseline = booBaseline + xVisualHeight - spacing // X baseline, pulled up by negative spacing
  const toreBaseline = xBaseline + textFontSize * 0.85 - spacing // TORE baseline, pulled up

  const background = includeBg
    ? `<rect width="${size}" height="${size}" fill="${bgColor}"/>`
    : ""

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  ${background}
  <!-- BOO - uppercase, fontWeight 600, letterSpacing 0.15em -->
  <text 
    x="${centerX}" 
    y="${booBaseline}" 
    font-family="Georgia, 'Times New Roman', serif" 
    font-size="${textFontSize}" 
    font-weight="600"
    letter-spacing="0.15em"
    fill="${secondaryColor}" 
    text-anchor="middle"
  >BOO</text>
  
  <!-- X - fontWeight 900, letterSpacing -0.05em -->
  <text 
    x="${centerX}" 
    y="${xBaseline}" 
    font-family="Georgia, 'Times New Roman', serif" 
    font-size="${xFontSize}" 
    font-weight="900"
    letter-spacing="-0.05em"
    fill="${primaryColor}" 
    text-anchor="middle"
  >X</text>
  
  <!-- TORE - uppercase, fontWeight 600, letterSpacing 0.15em -->
  <text 
    x="${centerX}" 
    y="${toreBaseline}" 
    font-family="Georgia, 'Times New Roman', serif" 
    font-size="${textFontSize}" 
    font-weight="600"
    letter-spacing="0.15em"
    fill="${secondaryColor}" 
    text-anchor="middle"
  >TORE</text>
</svg>`
}

// Export for both CommonJS (Node.js scripts) and ES modules (React components)
if (typeof module !== "undefined" && module.exports) {
  module.exports = { generateLogoSvg }
}

export { generateLogoSvg }
