// Builds matching team portraits: same square frame, same head size and position, black and white, even tone.
// Face boxes were found with OpenCV's frontal-face detector (x, y, size in source pixels).
// Run: node scripts/portraits.mjs  →  public/images/team/<name>.jpg and .webp at 1000×1000.
import sharp from 'sharp';
import fs from 'node:fs/promises';

const W = 1000, H = 1000;
const FACE = 0.54;   // face width as a share of the frame width
const TOP = 0.26;    // top of the face box as a share of the frame height
const people = [
  { name: 'krishna', src: 'design/assets/krishna-killa-scaled.jpeg', face: [466, 334, 518] },
  { name: 'aritra', src: 'design/assets/aritra-original.jpg', face: [298, 275, 570] },
  { name: 'vansh', src: 'design/assets/t-vansh.jpg', face: [238, 146, 417] },
  { name: 'yash', src: 'design/assets/t-yash.jpg', face: [198, 403, 470] },
  { name: 'mohit', src: 'design/assets/mohit-kumar2-e1777712672199.png', face: [334, 126, 343] },
];

await fs.mkdir('public/images/team', { recursive: true });
for (const p of people) {
  const [fx, fy, fs_] = p.face;
  const scale = (W * FACE) / fs_;
  const meta = await sharp(p.src).metadata();
  const sw = Math.round(meta.width * scale), sh = Math.round(meta.height * scale);
  const left = Math.round((fx + fs_ / 2) * scale - W / 2);
  const top = Math.round(fy * scale - H * TOP);
  // pad with the photo's own edge pixels (plain walls) where the frame runs past the source
  const pad = { top: Math.max(0, -top), left: Math.max(0, -left), right: Math.max(0, left + W - sw), bottom: Math.max(0, top + H - sh) };
  const padded = await sharp(p.src).rotate().resize(sw, sh, { kernel: 'lanczos3' }).grayscale()
    .extend({ ...pad, extendWith: 'copy' }).toBuffer();
  const base = await sharp(padded).extract({ left: left + pad.left, top: top + pad.top, width: W, height: H }).toBuffer();
  // even out tone: stretch to the 1st–99th percentile, then lift the wall to a common light grey
  const img = sharp(base).normalise({ lower: 1, upper: 99 }).linear(0.92, 12).sharpen({ sigma: 0.6 });
  await img.clone().jpeg({ quality: 84, progressive: true, mozjpeg: true }).toFile(`public/images/team/${p.name}.jpg`);
  await img.clone().webp({ quality: 80 }).toFile(`public/images/team/${p.name}.webp`);
  console.log(p.name, { scale: scale.toFixed(2), pad });
}
