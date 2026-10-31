import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <!-- Background for maskable icon support -->
  <rect width="512" height="512" fill="#002f6c" />
  
  <!-- Outer Ring (White/Silver Cap Device Border) -->
  <circle cx="256" cy="256" r="180" fill="#002f6c" stroke="#ffffff" stroke-width="14" />
  
  <!-- Central White Triangle -->
  <polygon points="256,132 148,318 364,318" fill="#ffffff" stroke="#ffffff" stroke-width="6" stroke-linejoin="round" />
  
  <!-- Red Propeller Blades (pointing straight up, down-left, down-right) -->
  <g transform="translate(0, 0)">
    <!-- Blade 1 (Straight Up) -->
    <rect x="245" y="172" width="22" height="74" rx="11" ry="11" fill="#cc0000" transform="rotate(0, 256, 255)" />
    
    <!-- Blade 2 (Down-Right) -->
    <rect x="245" y="172" width="22" height="74" rx="11" ry="11" fill="#cc0000" transform="rotate(120, 256, 255)" />
    
    <!-- Blade 3 (Down-Left) -->
    <rect x="245" y="172" width="22" height="74" rx="11" ry="11" fill="#cc0000" transform="rotate(240, 256, 255)" />
  </g>
  
  <!-- Propeller Center Cap/Hub -->
  <circle cx="256" cy="255" r="20" fill="#cc0000" />
  <circle cx="256" cy="255" r="6" fill="#ffffff" />
</svg>
`;

async function main() {
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const svgBuffer = Buffer.from(svg);

  console.log('Generating 512x512 icon...');
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'icon-512.png'));

  console.log('Generating 192x192 icon...');
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'icon-192.png'));

  console.log('All icons generated successfully!');
}

main().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
