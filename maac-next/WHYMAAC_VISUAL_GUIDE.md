# WhyMAAC Component - Visual Structure Guide

## 📐 Layout Architecture

### Desktop (Laptop) Layout
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  [Think MAAC Badge] (mouse parallax)                │   │
│  │                                                      │   │
│  │  Creative Careers That Click — Think MAAC           │   │
│  │  (word-by-word reveal animation)                    │   │
│  │                                                      │   │
│  │  Empower Your Future with Skills That Matter        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────────┐  ┌───────────────┬───────────────┐   │
│  │                  │  │               │               │   │
│  │  FEATURED CARD   │  │   BENEFIT 01  │   BENEFIT 02  │   │
│  │  (3D tilt on    │  │   (mouse       │   (mouse      │   │
│  │   mouse move)   │  │    follow)    │    follow)    │   │
│  │                  │  │               │               │   │
│  │  [Parallax      │  ├───────────────┼───────────────┤   │
│  │   Image]        │  │               │               │   │
│  │                  │  │   BENEFIT 03  │   BENEFIT 04  │   │
│  │  Workshops &    │  │               │               │   │
│  │  Masterclasses  │  ├───────────────┼───────────────┤   │
│  │                  │  │               │               │   │
│  │  [CTA Button]   │  │   BENEFIT 05  │   BENEFIT 06  │   │
│  │  (magnetic)     │  │               │               │   │
│  └──────────────────┘  └───────────────┴───────────────┘   │
│                                                             │
│  ╔═══════════════════════════════════════════════════════╗ │
│  ║  STICKY SECTION (scrolls horizontally)                ║ │
│  ║  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐    ║ │
│  ║  │ 01  │ │ 02  │ │ 03  │ │ 04  │ │ 05  │ │ 06  │    ║ │
│  ║  │Img  │ │Img  │ │Img  │ │Img  │ │Img  │ │Img  │    ║ │
│  ║  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘    ║ │
│  ╚═══════════════════════════════════════════════════════╝ │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  STUDENT SHOWCASE (auto-scrolling carousel)         │   │
│  │  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐  │   │
│  │  │Img │ │Img │ │Img │ │Img │ │Img │ │Img │ │Img │  │   │
│  │  └────┘ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Mobile (Phone) Layout
```
┌─────────────────────────┐
│                         │
│  ┌───────────────────┐ │
│  │ [Think MAAC]      │ │
│  │                   │ │
│  │ Creative Careers  │ │
│  │ That Click        │ │
│  │                   │ │
│  │ Skills That       │ │
│  │ Matter            │ │
│  └───────────────────┘ │
│                         │
│  ┌───────────────────┐ │
│  │                   │ │
│  │  FEATURED CARD    │ │
│  │  (simplified)     │ │
│  │                   │ │
│  │  [Image]          │ │
│  │                   │ │
│  │  Workshops &      │ │
│  │  Masterclasses    │ │
│  │                   │ │
│  │  [CTA Button]     │ │
│  └───────────────────┘ │
│                         │
│  ┌───────────────────┐ │
│  │ BENEFIT 01        │ │
│  │ [Icon] Title      │ │
│  │ Description...    │ │
│  └───────────────────┘ │
│  ┌───────────────────┐ │
│  │ BENEFIT 02        │ │
│  │ [Icon] Title      │ │
│  │ Description...    │ │
│  └───────────────────┘ │
│  ┌───────────────────┐ │
│  │ BENEFIT 03        │ │
│  │ [Icon] Title      │ │
│  │ Description...    │ │
│  └───────────────────┘ │
│  ... (vertical stack)  │
│                         │
│  ┌───────────────────┐ │
│  │  Student Showcase │ │
│  │  Swipe to explore │ │
│  │  → → →            │ │
│  │ ┌───┐┌───┐┌───┐  │ │
│  │ │Img││Img││Img│  │ │
│  │ └───┘└───┘└───┘  │ │
│  │  (snap scroll)    │ │
│  └───────────────────┘ │
│                         │
└─────────────────────────┘
```

---

## 🎬 Animation Flow

### Desktop Animation Sequence

```
Page Load
    │
    ├─→ 0ms:   Badge fades in (scale + opacity)
    │
    ├─→ 300ms: "Creative" word reveal (rotateX + y)
    │
    ├─→ 400ms: "Careers" word reveal
    │
    ├─→ 500ms: "That" word reveal
    │
    ├─→ 600ms: "Click" word reveal
    │
    ├─→ 700ms: "— Think MAAC" color reveal
    │
    ├─→ 800ms: Subtitle fade up
    │
    ├─→ 900ms: Description slide in from right
    │
    ├─→ 1000ms: Featured card slides from left
    │          └─→ Image parallax enabled
    │          └─→ 3D tilt on mouse move
    │
    ├─→ 1100ms: Benefit cards stagger in (2x3 grid)
    │          └─→ Each card: scale + fade
    │          └─→ Mouse follow parallax enabled
    │
    ├─→ 1500ms: Horizontal benefits section
    │          └─→ Sticky container activates
    │          └─→ Scroll-linked horizontal animation
    │
    └─→ 2000ms: Student gallery auto-scroll starts
               └─→ Infinite loop (pause on hover)
```

### Mobile Animation Sequence

```
Page Load
    │
    ├─→ 0ms:   Badge fades in
    │
    ├─→ 100ms: Header slide up (opacity + y)
    │
    ├─→ 600ms: Featured card slide up
    │          └─→ Simplified (no 3D tilt)
    │
    ├─→ 800ms: Benefit cards stagger (vertical)
    │          └─→ Each: opacity + y (simple)
    │          └─→ No mouse parallax
    │
    └─→ 1200ms: Gallery fade in
               └─→ Touch swipe enabled
```

---

## 🎯 Interactive Elements

### Desktop Interactions

```
┌────────────────────────────────────────────┐
│  HOVER EFFECTS                             │
├────────────────────────────────────────────┤
│                                            │
│  Badge:                                    │
│  └─→ Follows cursor (±10px parallax)      │
│                                            │
│  Benefit Cards:                            │
│  ├─→ Scale 1.05 on hover                  │
│  ├─→ Glow shadow increases                │
│  ├─→ Icon rotates 5deg                    │
│  ├─→ Title slides right 8px               │
│  └─→ Number watermark opacity 0.05→0.15   │
│                                            │
│  Featured Card:                            │
│  ├─→ 3D tilt (rotateX, rotateY)           │
│  ├─→ Image parallax scroll                │
│  ├─→ Button shadow glow                   │
│  └─→ Magnetic hover (spring physics)      │
│                                            │
│  Gallery Images:                           │
│  ├─→ Scale 1.05 + lift -8px               │
│  ├─→ Glass overlay fades in               │
│  ├─→ Caption slides up                    │
│  └─→ Border glow (red)                    │
│                                            │
└────────────────────────────────────────────┘
```

### Mobile Interactions

```
┌────────────────────────────────────────────┐
│  TOUCH EFFECTS                             │
├────────────────────────────────────────────┤
│                                            │
│  Benefit Cards:                            │
│  ├─→ Tap highlight (gradient overlay)     │
│  └─→ Active state scale 0.98              │
│                                            │
│  Gallery:                                  │
│  ├─→ Swipe left/right (snap scroll)       │
│  ├─→ Touch-optimized (44px min targets)   │
│  └─→ Smooth momentum scrolling            │
│                                            │
│  CTA Button:                               │
│  ├─→ Full width (easy tap)                │
│  └─→ Active state scale 0.96              │
│                                            │
└────────────────────────────────────────────┘
```

---

## 🎨 Visual Hierarchy

### Desktop (Visual Weight)

```
Priority 1 (Largest):
┌─────────────────────────────────────┐
│ "Creative Careers That Click"       │
│ Font: Anton, 5xl-6xl (clamp)        │
│ Color: #F5EFE0 + #E8281C accent     │
└─────────────────────────────────────┘

Priority 2 (Medium):
┌─────────────────────────────────────┐
│ Featured Card Title                 │
│ Benefit Card Titles                 │
│ Font: Anton, 2xl-3xl                │
│ Color: #F5EFE0                      │
└─────────────────────────────────────┘

Priority 3 (Small):
┌─────────────────────────────────────┐
│ Descriptions                        │
│ Captions                            │
│ Font: Sans, sm-base                 │
│ Color: #C9BFA8 / #8A7F72            │
└─────────────────────────────────────┘
```

### Mobile (Visual Weight)

```
Priority 1 (Largest):
┌─────────────────────────────────────┐
│ "Creative Careers That Click"       │
│ Font: Anton, 4xl-5xl (clamp)        │
│ Color: #F5EFE0 + #E8281C accent     │
└─────────────────────────────────────┘

Priority 2 (Medium):
┌─────────────────────────────────────┐
│ Featured Card Title                 │
│ Font: Anton, 2xl                    │
│ Color: #F5EFE0                      │
└─────────────────────────────────────┘

Priority 3 (Small):
┌─────────────────────────────────────┐
│ Benefit Titles (stacked)            │
│ Descriptions                        │
│ Font: Sans, sm-base                 │
│ Color: #C9BFA8 / #8A7F72            │
└─────────────────────────────────────┘
```

---

## 📦 Component Tree

```
WhyMAAC (Main)
│
├── Device Detection (useEffect)
│   │
│   ├─→ isMobile = true
│   │   └── WhyMAACPhone
│   │       ├── HeaderSection (motion.div)
│   │       ├── FeaturedCardPhone
│   │       │   ├── OptimizedImage
│   │       │   └── CTA Button
│   │       ├── BenefitCardPhone (x6)
│   │       │   ├── Icon
│   │       │   └── Text Content
│   │       └── ImageGalleryPhone
│   │           └── Swipe Carousel (snap scroll)
│   │
│   └─→ isMobile = false
│       └── WhyMAACLaptop
│           ├── HeaderSection
│           │   ├── Badge (mouse parallax)
│           │   └── Word Reveal (staggered)
│           ├── FeaturedCardLaptop
│           │   ├── Parallax Image
│           │   ├── 3D Tilt Container
│           │   └── Magnetic Button
│           ├── BenefitCardLaptop (x6)
│           │   ├── Mouse Parallax
│           │   ├── Icon Hover
│           │   └── Title Slide
│           ├── HorizontalBenefits
│           │   ├── Sticky Container
│           │   ├── Progress Bar
│           │   └── Scroll-linked Cards
│           └── ImageGalleryLaptop
│               └── Auto-scroll Carousel
│
└── Shared Utilities
    ├── OptimizedImage (lazy load + CLS)
    └── AnimatedNumber (counter)
```

---

## 🔧 Scroll-Linked Animations

### Horizontal Benefits Section

```
Scroll Progress: 0% ──────────────────────→ 100%
                 │                         │
Container X:     0vw                       -500vw
                 │                         │
Progress Bar:    0%                        100%
                 │                         │
Visible Card:    Intro → 01 → 02 → 03 → 04 → 05 → 06
```

### Parallax Image

```
Scroll Progress: 0% ──────────────────────→ 100%
                 │                         │
Image Y:         -10%                      +10%
                 │                         │
Effect:          Image moves slower        │
                 than container            │
```

---

## 🎯 Performance Critical Path

### Desktop (Critical Resources)
```
1. Above-fold content (LCP)
   ├─→ Hero header text (priority font)
   ├─→ Featured card image (priority load)
   └─→ First benefit cards (eager)

2. Below-fold content (Lazy)
   ├─→ Horizontal benefits (lazy)
   ├─→ Gallery images (lazy)
   └─→ Animations (progressive enhancement)
```

### Mobile (Critical Resources)
```
1. Above-fold content (LCP)
   ├─→ Hero header text (priority font)
   ├─→ Featured card (simplified)
   └─→ First 2 benefit cards

2. Below-fold content (Lazy)
   ├─→ Remaining benefits (lazy)
   ├─→ Gallery (lazy + swipe)
   └─→ Animations (minimal)
```

---

This visual guide helps understand the component structure, animations, and interactions at a glance.
