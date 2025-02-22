const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ICON_SIZES = [192, 512];
const ICON_COLOR = '#4F46E5'; // Indigo-600 from Tailwind

// Create a simple icon with text
async function generateIcon(size) {
  const padding = Math.round(size * 0.2); // 20% padding
  const textSize = Math.round(size * 0.4); // 40% of icon size for text
  
  // Create an SVG with the text "FP"
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${ICON_COLOR}" rx="${size * 0.2}"/>
      <text
        x="50%"
        y="50%"
        font-family="Arial"
        font-size="${textSize}px"
        fill="white"
        text-anchor="middle"
        dominant-baseline="middle"
        font-weight="bold"
      >FP</text>
    </svg>
  `;

  // Convert SVG to PNG
  await sharp(Buffer.from(svg))
    .png()
    .toFile(path.join(__dirname, '..', 'public', `icon-${size}x${size}.png`));

  console.log(`Generated ${size}x${size} icon`);
}

// Generate screenshot placeholder
async function generateScreenshot() {
  const width = 1080;
  const height = 1920;
  
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="#F9FAFB"/>
      <rect x="0" y="0" width="${width}" height="80" fill="${ICON_COLOR}"/>
      <text
        x="50%"
        y="50"
        font-family="Arial"
        font-size="24px"
        fill="white"
        text-anchor="middle"
        dominant-baseline="middle"
      >FocusPath</text>
      <rect x="40" y="120" width="${width - 80}" height="60" fill="#E5E7EB" rx="8"/>
      <rect x="40" y="200" width="${width - 80}" height="60" fill="#E5E7EB" rx="8"/>
      <rect x="40" y="280" width="${width - 80}" height="60" fill="#E5E7EB" rx="8"/>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(path.join(__dirname, '..', 'public', 'screenshot1.png'));

  console.log('Generated screenshot');
}

async function main() {
  // Create scripts directory if it doesn't exist
  const scriptsDir = path.join(__dirname);
  if (!fs.existsSync(scriptsDir)) {
    fs.mkdirSync(scriptsDir, { recursive: true });
  }

  // Generate icons
  for (const size of ICON_SIZES) {
    await generateIcon(size);
  }

  // Generate screenshot
  await generateScreenshot();
}

main().catch(console.error); 