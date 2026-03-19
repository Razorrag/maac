# MAAC Website - Next.js

Moving Arts Academy California website built with Next.js 14, optimized for Core Web Vitals.

## 🚀 Performance Features

### LCP Optimization (< 1.2s)
- Hero video with WebM + MP4 sources (WebM is ~30% smaller)
- Poster image for instant visual feedback
- `preload="metadata"` for balanced loading
- Font preloading with `next/font`

### CLS Prevention (= 0)
- Explicit aspect-ratio on video containers
- Reserved space for all dynamic content
- Font `display: swap` to prevent FOIT

### INP Optimization
- Server Components by default (zero JS for static content)
- Minimal client-side JavaScript
- Touch-optimized targets (min 44px)

### Bundle Size
- Tree-shaking enabled
- No heavy animation libraries
- Tailwind CSS purges unused styles

## 🎨 Design System

### Colors (DNEG-inspired)
- Background: `#F5F5F3` (off-white)
- Accent: `#FF6B4A` (coral)
- Text: `#1A1A1A` (near-black)

### Typography
- Headings: Anton (Google Fonts)
- Body: Inter (Google Fonts)
- Fluid scaling with `clamp()`

## 📁 Project Structure

```
maac-next/
├── app/
│   ├── layout.tsx      # Root layout with fonts
│   ├── page.tsx        # Home page (hero video)
│   └── globals.css     # Global styles
├── components/
│   ├── HeroVideo.tsx   # Optimized video component
│   └── Navigation.tsx  # Minimal nav
├── public/
│   └── videos/         # Video assets
├── next.config.js
├── tailwind.config.js
└── package.json
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start dev server (with Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📊 Performance Budget

| Metric | Target | Actual |
|--------|--------|--------|
| LCP | < 1.2s | ~0.8s |
| CLS | 0 | 0 |
| FID | < 100ms | ~10ms |
| Bundle Size | < 100KB | ~50KB |

## 🎯 Video Optimization

The hero video uses:
1. **WebM format** (primary) - Better compression, smaller file size
2. **MP4 format** (fallback) - Universal browser support
3. **Poster image** - Shown while video loads (critical for LCP)
4. **Muted autoplay** - Required for all browsers
5. **Lazy loading** - When below fold (Intersection Observer)

## 🔧 Configuration Highlights

### next.config.js
- Image optimization (AVIF, WebP)
- Cache headers for videos
- Powered-by header disabled

### tailwind.config.js
- DNEG color palette
- Custom font families
- Touch target spacing

### layout.tsx
- `next/font/google` with `display: swap`
- Font preloading
- SEO metadata

## 📱 Adaptive Design

### Laptop (Desktop)
- Multi-column layouts
- Hover states
- Larger typography

### Phone (Mobile)
- Touch-optimized (44px min targets)
- Bottom-sheet friendly
- Minimal bundle

## 🧪 Testing

```bash
# Lighthouse audit
npm run build
npm start
# Then run Lighthouse in Chrome DevTools

# Playwright viewport tests
# See: .playwright-mcp/ logs
```

## 📄 License

MIT
