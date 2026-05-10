// ─────────────────────────────────────────────────────────────────────────────
// scan-photos.js
// Auto-runs before `npm run dev` and `npm run build`.
// Scans /public/photos/{ceremony,family,candid,details}/ subfolders
// and writes the manifest to /src/data/photos.json
// → No code changes needed when adding/removing photos.
// ─────────────────────────────────────────────────────────────────────────────
const fs   = require('fs');
const path = require('path');

const PHOTOS_DIR   = path.join(process.cwd(), 'public', 'photos');
const OUTPUT_FILE  = path.join(process.cwd(), 'src', 'data', 'photos.json');
const CATEGORIES   = ['ceremony', 'family', 'candid', 'details'];
const IMAGE_EXTS   = /\.(jpg|jpeg|png|webp|JPG|JPEG|PNG|WEBP)$/;

// Ensure output directory exists
fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });

// Also ensure each category subfolder exists so git/Vercel don't complain
CATEGORIES.forEach(cat => {
  const dir = path.join(PHOTOS_DIR, cat);
  fs.mkdirSync(dir, { recursive: true });
});

const photos = [];
let id = 1;

CATEGORIES.forEach(cat => {
  const dir = path.join(PHOTOS_DIR, cat);
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir)
    .filter(f => IMAGE_EXTS.test(f) && !f.startsWith('.'))
    .sort((a, b) => {
      // Natural sort: photo2.jpg before photo10.jpg
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    });

  files.forEach(file => {
    photos.push({
      id:       id++,
      src:      `/photos/${cat}/${file}`,
      category: cat,
      alt:      `Sia's naming ceremony – ${cat}`,
    });
  });
});

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(photos, null, 2));

if (photos.length === 0) {
  console.log('📂  No photos found yet. Add images to:');
  CATEGORIES.forEach(c => console.log(`     public/photos/${c}/`));
} else {
  console.log(`✅  Photo manifest: ${photos.length} photo${photos.length !== 1 ? 's' : ''} across ${CATEGORIES.join(', ')}`);
}
