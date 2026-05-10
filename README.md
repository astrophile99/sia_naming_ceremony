# 🌸 Sia's Naming Ceremony

A magical, dreamy photo gallery website for Sia's naming ceremony — built with Next.js 14, Framer Motion, and Tailwind CSS.

---

## ✨ Features

- **Animated Hero Section** — floating petals, glowing particles, parallax crown
- **Interactive Photo Gallery** — masonry grid, lightbox modal, category filters, like functionality
- **Timeline of Moments** — alternating card layout with scroll-reveal animations
- **Floating Decoratives** — animated butterflies, petals, and glowing blobs
- **Particle Field** — canvas-based sparkle particles that react to mouse
- **Ambient Music Player** — floating play/pause with volume control
- **Loading Screen** — elegant entrance animation
- **Glassmorphism UI** — throughout the entire site
- **Mobile-first & fully responsive** — works beautifully on all devices
- **Vercel-ready deployment**

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
open http://localhost:3000
```

---

## 📁 Project Structure

```
sia-naming-ceremony/
├── src/
│   ├── app/
│   │   ├── globals.css        # Global styles, animations, glass effects
│   │   ├── layout.tsx         # Root layout with SEO metadata
│   │   └── page.tsx           # Main page composition
│   ├── components/
│   │   ├── decorative/
│   │   │   ├── Butterflies.tsx
│   │   │   ├── FloatingBlobs.tsx
│   │   │   ├── FloatingPetals.tsx
│   │   │   └── ParticleField.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── GallerySection.tsx
│   │   │   ├── TimelineSection.tsx
│   │   │   ├── MusicPlayer.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/
│   │       ├── Navbar.tsx
│   │       ├── ScrollToTop.tsx
│   │       └── LoadingScreen.tsx
│   ├── hooks/
│   │   ├── useParallax.ts
│   │   └── useMusic.ts
│   ├── lib/
│   │   └── utils.ts           # Photo data, timeline data, helpers
│   └── types/
│       └── index.ts
├── public/
│   ├── photos/                # ← Add photo1.jpg → photo30.jpg here
│   │   └── README.md
│   └── music/                 # ← Add lullaby.mp3 here
│       └── README.md
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
├── vercel.json
└── package.json
```

---

## 🖼️ Adding Real Photos

1. Place your photos in `/public/photos/` named `photo1.jpg` through `photo30.jpg`
2. Update `src/lib/utils.ts` — change the `src` field:

```ts
// From (placeholder):
src: `https://picsum.photos/seed/sia${i + 1}/800/600`,

// To (real photos):
src: `/photos/photo${i + 1}.jpg`,
```

---

## 🎵 Adding Music

1. Place `lullaby.mp3` in `/public/music/`
2. The player will automatically pick it up

---

## 🚢 Deploy to Vercel

```bash
# Option 1: Vercel CLI
npx vercel

# Option 2: GitHub integration
# Push to GitHub → Import project in Vercel dashboard
# Framework: Next.js (auto-detected)
```

---

## 🎨 Customization

### Change baby name
Search and replace `"Sia"` throughout the project.

### Change colors
Edit `tailwind.config.ts` — the primary color system is built on `blush`, `rose`, `sage`, and `gold`.

### Add more photos
Update the `Array.from({ length: 30 }, ...)` count in `src/lib/utils.ts`.

### Change timeline content
Edit the `timelineItems` array in `src/lib/utils.ts`.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 14 | App Router, SSR, Image optimization |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations & transitions |
| Lucide React | Icons |

---

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 90+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

---

Made with 💝 for Sia's special day.
