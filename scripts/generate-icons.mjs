import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import pngToIco from 'png-to-ico';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const svgPath = join(root, 'assets', 'icon.svg');
const svgBuffer = readFileSync(svgPath);

mkdirSync(join(root, 'assets', 'icons', 'mac'), { recursive: true });
mkdirSync(join(root, 'assets', 'icons', 'win'), { recursive: true });
mkdirSync(join(root, 'assets', 'icons', 'png'), { recursive: true });

const sizes = [16, 32, 48, 64, 128, 256, 512, 1024];

console.log('Generating PNGs...');
for (const size of sizes) {
  await sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(join(root, 'assets', 'icons', 'png', `${size}.png`));
  console.log(`  ${size}x${size} done`);
}

// Copy 1024 as the main icon.png
await sharp(svgBuffer).resize(1024, 1024).png().toFile(join(root, 'assets', 'icon.png'));
console.log('Wrote assets/icon.png');

// Generate .ico for Windows (multi-size)
console.log('Generating icon.ico...');
const icoBuffer = await pngToIco([
  join(root, 'assets', 'icons', 'png', '16.png'),
  join(root, 'assets', 'icons', 'png', '32.png'),
  join(root, 'assets', 'icons', 'png', '48.png'),
  join(root, 'assets', 'icons', 'png', '64.png'),
  join(root, 'assets', 'icons', 'png', '128.png'),
  join(root, 'assets', 'icons', 'png', '256.png'),
]);
writeFileSync(join(root, 'assets', 'icons', 'win', 'icon.ico'), icoBuffer);
console.log('Wrote assets/icons/win/icon.ico');

// Generate .icns for Mac using iconutil (macOS only)
console.log('Generating icon.icns...');
const { execSync } = await import('child_process');
const iconsetDir = join(root, 'assets', 'icons', 'mac', 'icon.iconset');
mkdirSync(iconsetDir, { recursive: true });

const icnsSizes = [
  [16, 'icon_16x16.png'],
  [32, 'icon_16x16@2x.png'],
  [32, 'icon_32x32.png'],
  [64, 'icon_32x32@2x.png'],
  [128, 'icon_128x128.png'],
  [256, 'icon_128x128@2x.png'],
  [256, 'icon_256x256.png'],
  [512, 'icon_256x256@2x.png'],
  [512, 'icon_512x512.png'],
  [1024, 'icon_512x512@2x.png'],
];

for (const [size, filename] of icnsSizes) {
  await sharp(svgBuffer).resize(size, size).png().toFile(join(iconsetDir, filename));
}

execSync(`iconutil -c icns "${iconsetDir}" -o "${join(root, 'assets', 'icons', 'mac', 'icon.icns')}"`);
console.log('Wrote assets/icons/mac/icon.icns');

console.log('\nAll icons generated successfully!');
