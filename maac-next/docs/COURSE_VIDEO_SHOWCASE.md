# 🎬 Course Video Showcase - Implementation Documentation

## Overview

A **full-screen immersive video showcase** section featuring 6 MAAC courses with scroll-driven interactions on desktop and swipe-based navigation on mobile.

---

## 🏆 Design Pattern: Hybrid Scrollytelling

### Desktop (≥1024px)
- **Sticky viewport** with scroll-driven video crossfades
- **Vertical progress bar** showing 6 course segments
- **Glassmorphism text overlay** in bottom-left corner
- **Smooth scrub effect** using Framer Motion

### Mobile (<1024px)
- **Horizontal swipe carousel** with CSS scroll-snap
- **Dot navigation** at bottom
- **Touch-optimized** text overlay
- **Native scroll performance**

---

## 📁 File Structure

```
maac-next/
├── components/
│   └── CourseVideoShowcase.tsx       # Main component (~500 lines)
├── app/
│   └── globals.css                   # Added custom styles
├── public/
│   ├── videos/courses/               # 6 course videos
│   │   ├── 3d-animation.mp4
│   │   ├── digital-content.mp4
│   │   ├── game-design.mp4
│   │   ├── vfx.mp4
│   │   ├── motion-graphics.mp4
│   │   └── skill-enhancement.mp4
│   └── images/courses/               # 6 poster images
│       └── *-poster.jpg
├── tests/
│   └── course-video-showcase.spec.ts # Playwright tests
└── docs/
    └── COURSE_VIDEO_SHOWCASE.md      # This file
```

---

## 🎨 Course Data

```typescript
const COURSES = [
  {
    id: '3d-animation',
    title: '3D Animation',
    subtitle: 'Master the art of storytelling',
    description: 'Master the art of storytelling through high-quality animation...',
    video: '/videos/courses/3d-animation.mp4',
    poster: '/images/courses/3d-animation-poster.jpg',
    color: '#E8281C', // Red
    icon: '🎬',
    link: '/courses/3d-animation',
  },
  // ... 5 more courses
];
```

### Color Coding
- **Red (#E8281C)**: 3D Animation, VFX (Courses 1, 4)
- **Green (#22C55E)**: Digital Content, Motion Graphics (Courses 2, 5)
- **Amber (#F5B932)**: Game Design, Skill Enhancement (Courses 3, 6)

---

## 🏗️ Component Architecture

### Main Component: `CourseVideoShowcase`

```
CourseVideoShowcase
├── DesktopShowcase (≥1024px)
│   ├── StickyContainer (position: fixed)
│   │   ├── VideoLayer × 6 (absolute, crossfade)
│   │   ├── ProgressIndicator (left side)
│   │   └── TextOverlay (bottom-left)
│   └── ScrollHeight (invisible, defines scroll distance)
│
└── MobileShowcase (<1024px)
    ├── HorizontalScroll (snap-type)
    │   └── VideoSlide × 6
    │       ├── Video (full screen)
    │       └── TextOverlay (simplified)
    └── DotNavigation (bottom center)
```

### Sub-Components

| Component | Purpose | Lines |
|-----------|---------|-------|
| `VideoLayer` | Individual video with opacity control | ~40 |
| `ProgressIndicator` | Left-side progress bar (6 segments) | ~30 |
| `TextOverlay` | Glassmorphism card with course info | ~80 |
| `DotNavigation` | Mobile dot indicators | ~30 |
| `DesktopShowcase` | Scrollytelling logic | ~100 |
| `MobileShowcase` | Swipe carousel logic | ~80 |

---

## 🎬 Key Features

### 1. Scroll-Driven Video Transitions (Desktop)

```typescript
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ['start start', 'end end'],
});

const activeIndex = useTransform(
  scrollYProgress,
  [0, 1],
  [0, COURSES.length - 1]
);
```

**How it works:**
- Container has height = `600px × 6 courses = 3600px`
- As user scrolls, `scrollYProgress` goes from 0 to 1
- Maps to active index (0-5)
- Each video's opacity is calculated based on scroll position
- Crossfade effect: opacity 0→1→0 over scroll range

### 2. Intersection Observer for Video Playback

```typescript
function useVideoIntersection(videoRef, isPlaying) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && isPlaying) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [videoRef, isPlaying]);
}
```

**Benefits:**
- Videos only play when 50% visible
- Saves bandwidth and battery
- Prevents multiple videos playing simultaneously

### 3. Glassmorphism Text Overlay

```css
.glass {
  background: rgba(20, 20, 20, 0.65);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(245, 239, 224, 0.08);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  border-radius: 16px;
}
```

**Staggered Animation:**
- Icon: delay 0.3s, scale 0.8→1
- Title: delay 0.4s, y: 20→0
- Subtitle: delay 0.5s, y: 20→0
- Description: delay 0.6s, y: 20→0
- Button: delay 0.7s, y: 20→0

### 4. Mobile Swipe Carousel

```css
.scroll-snap-carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.scroll-snap-carousel > * {
  flex-shrink: 0;
  width: 100%;
  scroll-snap-align: start;
}
```

**Features:**
- Native CSS scroll-snap (no JS library needed)
- Touch-optimized with `-webkit-overflow-scrolling`
- Hidden scrollbar for clean look
- Dot navigation syncs with scroll position

---

## ⚡ Performance Optimizations

### 1. Lazy Loading
```tsx
<video loading="lazy" preload="auto" />
```
- First video: `preload="auto"` (instant play)
- Other videos: `loading="lazy"` (load on demand)

### 2. Intersection Observer
- Videos play only when 50% visible
- Prevents unnecessary decoding

### 3. GPU Acceleration
```css
.video-layer {
  will-change: opacity;
}
```
- Opacity changes use GPU (not CPU)
- No layout thrashing

### 4. Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  .video-layer {
    transition: none !important;
  }
}
```

### 5. Mobile Data Saver
```typescript
// Future enhancement: detect connection speed
const connection = navigator.connection;
if (connection.saveData || connection.effectiveType === 'slow-2g') {
  // Load lower quality videos
}
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout | Features |
|------------|--------|----------|
| < 640px | Mobile swipe | Simplified overlay, dot nav |
| 640-1023px | Mobile swipe | Enhanced overlay, dot nav |
| ≥ 1024px | Desktop scrollytelling | Progress bar, crossfades |

---

## 🎯 Animation Specifications

### Video Crossfade
- **Duration**: 400ms
- **Easing**: `ease-out`
- **Trigger**: Scroll position

### Text Slide-In
- **Duration**: 600ms
- **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)`
- **Delay**: Staggered (0.3s, 0.4s, 0.5s, 0.6s, 0.7s)

### Progress Bar
- **Duration**: 300ms
- **Easing**: `ease-out`
- **Trigger**: Active index change

### Hover States
- **Duration**: 200ms
- **Easing**: `ease-out`
- **Effect**: Scale 1.05, shadow glow

---

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm test

# Run specific test file
npx playwright test course-video-showcase

# Run with UI
npx playwright test --ui

# Run in specific browser
npx playwright test --project=chromium
```

### Test Coverage
- ✅ Desktop scrollytelling
- ✅ Mobile swipe carousel
- ✅ Video playback
- ✅ Navigation interactions
- ✅ Responsive breakpoints
- ✅ Accessibility (ARIA, keyboard nav)
- ✅ Performance (lazy loading, no layout shift)
- ✅ Color coding

---

## 🛠️ Customization

### Change Scroll Speed
```typescript
// In DesktopShowcase
const scrollHeight = 600; // Increase for slower scroll, decrease for faster
```

### Change Course Colors
```typescript
// In COURSES array
color: '#E8281C', // Change to any hex color
```

### Adjust Glassmorphism
```css
.glass {
  background: rgba(20, 20, 20, 0.65); // Change opacity
  backdrop-filter: blur(24px); // Change blur amount
}
```

### Modify Progress Bar Position
```tsx
// In ProgressIndicator
<div className="absolute left-4 md:left-8 ...">
  // Change left value
</div>
```

---

## 🐛 Troubleshooting

### Videos Don't Auto-Play
**Problem**: Videos show but don't play automatically

**Solution**:
1. Ensure `muted` attribute is present
2. Add `playsInline` for iOS
3. Check browser autoplay policy

```tsx
<video muted playsInline autoPlay loop />
```

### Scroll Jerky/Stuttering
**Problem**: Scroll feels choppy

**Solution**:
1. Compress videos (smaller file size)
2. Use WebM format (better compression)
3. Reduce number of simultaneous videos
4. Check Lenis scroll configuration

### Text Overlay Not Visible
**Problem**: Can't read text on bright videos

**Solution**:
1. Increase gradient overlay opacity
2. Darken glass background
3. Add text shadow

```css
.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
}
```

### Mobile Swipe Not Working
**Problem**: Can't swipe on mobile

**Solution**:
1. Check `overflow-x: auto` is applied
2. Ensure `scroll-snap-type: x mandatory`
3. Verify touch events aren't blocked

---

## 📊 Performance Metrics

### Target Core Web Vitals

| Metric | Target | Measurement |
|--------|--------|-------------|
| LCP | < 2.5s | First video poster load |
| INP | < 200ms | Scroll responsiveness |
| CLS | < 0.1 | No layout shift |

### Lighthouse Audit
```bash
npm run build
npm run start
# Open Chrome DevTools > Lighthouse > Analyze
```

### Video Optimization
- **Target size**: 5-15 MB per 1080p video
- **Codec**: H.264 (MP4) or VP9 (WebM)
- **Bitrate**: 5-10 Mbps for 1080p
- **Frame rate**: 24-30 fps

---

## 🎓 Learning Resources

### Framer Motion
- [Official Docs](https://www.framer.com/motion/)
- [Scroll Animations](https://www.framer.com/motion/scroll/)
- [useTransform](https://www.framer.com/motion/use-transform/)

### CSS Scroll-Snap
- [MDN Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap)
- [CSS-Tricks Tutorial](https://css-tricks.com/introducing-css-scroll-snap-points/)

### Video Optimization
- [HandBrake](https://handbrake.fr/) - Video transcoder
- [FFmpeg Guide](https://ffmpeg.org/)
- [WebM Project](https://www.webmproject.org/)

---

## 📝 Future Enhancements

### Phase 2
- [ ] Add video thumbnails preview on hover
- [ ] Implement keyboard navigation (arrow keys)
- [ ] Add share functionality per course
- [ ] Video captions/subtitles support

### Phase 3
- [ ] Adaptive bitrate streaming (HLS/DASH)
- [ ] 360° video support for VR courses
- [ ] Interactive hotspots on videos
- [ ] A/B test different interaction patterns

### Analytics
- [ ] Track video engagement (play time, completion)
- [ ] Track course clicks per video
- [ ] A/B test scroll speed
- [ ] Heatmap analysis

---

## ✅ Launch Checklist

Before deploying:

- [ ] All 6 videos uploaded and optimized
- [ ] All 6 poster images uploaded
- [ ] Desktop scrollytelling tested (Chrome, Firefox, Safari, Edge)
- [ ] Mobile swipe tested (iOS Safari, Chrome Android)
- [ ] Tablet layout tested (iPad, Surface)
- [ ] Reduced motion preference respected
- [ ] Keyboard navigation works
- [ ] All links working
- [ ] Performance audit passed (Lighthouse > 90)
- [ ] No console errors
- [ ] Analytics tracking implemented

---

## 👥 Credits

**Design Pattern**: Inspired by Awwwards Site of the Day winners
**Implementation**: Framer Motion + Next.js
**Testing**: Playwright
**Optimization**: HandBrake + WebM

---

## 📞 Support

For issues or questions:
1. Check this documentation
2. Review component code comments
3. Run Playwright tests for debugging
4. Check Chrome DevTools Performance tab

---

**Last Updated**: March 27, 2026
**Version**: 1.0.0
**Component**: CourseVideoShowcase.tsx
