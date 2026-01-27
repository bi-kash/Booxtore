const sharp = require("sharp")
const fs = require("fs")
const path = require("path")

// Use shared logo SVG generator
const { generateLogoSvg } = require("../src/utils/logoSvg")

const OUTPUT_DIR = path.join(__dirname, "../public/meta")

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

// Function to generate icon using shared SVG generator
async function generateIcon(size, outputPath) {
  const svg = generateLogoSvg({
    size,
    includeBg: true,
    bgColor: "#FDFBF7",
    primaryColor: "#1F2937",
    secondaryColor: "#374151",
  })

  // Convert SVG to PNG using sharp
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(outputPath)
}

// Main execution
async function generateAllIcons() {
  console.log("📚 Generating Booxtore icons...")
  console.log("📁 Output directory:", OUTPUT_DIR)
  console.log("🔄 Using shared logo utility: src/utils/logoSvg.js")

  try {
    for (const icon of ICON_SIZES) {
      const outputPath = path.join(OUTPUT_DIR, icon.name)
      console.log(`⏳ Generating ${icon.name} (${icon.size}x${icon.size})...`)
      await generateIcon(icon.size, outputPath)
      console.log(`✅ Created ${icon.name}`)
    }

    console.log("\n🎉 All Booxtore icons generated successfully!")
    console.log("\n💡 To change the logo, edit: src/utils/logoSvg.js")
  } catch (error) {
    console.error("❌ Error generating icons:", error)
    process.exit(1)
  }
}

// Run the script
generateAllIcons()
