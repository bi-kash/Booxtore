const sharp = require("sharp")
const fs = require("fs")
const path = require("path")

// Read site settings
const siteSettings = require("../contents/site-settings.json")

const OUTPUT_DIR = path.join(__dirname, "../public/meta")
const SITE_NAME = siteSettings.site_name || siteSettings.site_title || "Site"

// Icon sizes to generate
const ICON_SIZES = [
  { name: "favicon.ico", size: 32 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "logo-512.png", size: 512 },
  { name: "maskable_icon_x192.png", size: 192 },
  { name: "maskable_icon_x512.png", size: 512 },
]

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

// Function to generate text-based icon using SVG
async function generateIcon(text, size, outputPath) {
  const svg = createSVG(text, size)

  // Convert SVG to PNG using sharp
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(outputPath)
}

// Create SVG with text - styled like Logo.js
function createSVG(text, size) {
  // Split text on first space (same as Logo.js)
  const firstSpaceIndex = text.indexOf(" ")
  let topLine = text
  let bottomLine = ""

  if (firstSpaceIndex !== -1) {
    topLine = text.substring(0, firstSpaceIndex)
    bottomLine = text.substring(firstSpaceIndex + 1)
  }

  // Calculate font sizes proportionally
  const topFontSize = Math.floor(size * 0.25) // 25% of canvas size
  const bottomFontSize = Math.floor(size * 0.3) // 30% for bottom (bolder)

  let textElements = ""

  if (bottomLine) {
    // Two-line layout - lineHeight: 1 (like Logo.js)
    // Lines stack with NO gap, touching directly
    const totalHeight = topFontSize + bottomFontSize
    const startY = (size - totalHeight) / 2

    // Position baselines (text renders from baseline)
    const topLineY = startY + topFontSize * 0.82 // baseline is ~82% down from top
    const bottomLineY = startY + topFontSize + bottomFontSize * 0.82

    textElements = `
      <text x="${size / 2}" y="${topLineY}" 
            font-family="Arial, Helvetica, sans-serif" 
            font-size="${topFontSize}" 
            font-style="italic" 
            font-weight="500"
            fill="#000000" 
            text-anchor="middle">${topLine}</text>
      <text x="${size / 2}" y="${bottomLineY}" 
            font-family="Arial, Helvetica, sans-serif" 
            font-size="${bottomFontSize}" 
            font-weight="900"
            fill="#000000" 
            text-anchor="middle">${bottomLine}</text>
    `
  } else {
    // Single line - centered
    textElements = `
      <text x="${size / 2}" y="${size / 2 + bottomFontSize * 0.32}" 
            font-family="Arial, Helvetica, sans-serif" 
            font-size="${bottomFontSize}" 
            font-weight="900"
            fill="#000000" 
            text-anchor="middle">${topLine}</text>
    `
  }

  return `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="#FFFFFF"/>
      ${textElements}
    </svg>
  `
}

// Main execution
async function generateAllIcons() {
  console.log("🎨 Generating icons for:", SITE_NAME)
  console.log("📁 Output directory:", OUTPUT_DIR)

  try {
    for (const icon of ICON_SIZES) {
      const outputPath = path.join(OUTPUT_DIR, icon.name)
      console.log(`⏳ Generating ${icon.name} (${icon.size}x${icon.size})...`)
      await generateIcon(SITE_NAME, icon.size, outputPath)
      console.log(`✅ Created ${icon.name}`)
    }

    console.log("\n🎉 All icons generated successfully!")
    console.log(
      "\n💡 Tip: Icons are based on site_name from site-settings.json"
    )
  } catch (error) {
    console.error("❌ Error generating icons:", error)
    process.exit(1)
  }
}

// Run the script
generateAllIcons()
