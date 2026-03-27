# Course Video Assets

This directory contains video and image assets for the Full-Screen Video Showcase section.

## Required Files

### Videos (6 courses)
Place the following video files in `/public/videos/courses/`:

1. `3d-animation.mp4` - 3D Animation course video
2. `digital-content.mp4` - Digital Content Creation course video
3. `game-design.mp4` - Game Design course video
4. `vfx.mp4` - VFX Courses video
5. `motion-graphics.mp4` - Motion Graphics & Broadcast Design video
6. `skill-enhancement.mp4` - Skill Enhancement Courses video

### Poster Images (6 courses)
Place the following poster images in `/public/images/courses/`:

1. `3d-animation-poster.jpg` - 3D Animation poster (1920x1080 recommended)
2. `digital-content-poster.jpg` - Digital Content Creation poster
3. `game-design-poster.jpg` - Game Design poster
4. `vfx-poster.jpg` - VFX Courses poster
5. `motion-graphics-poster.jpg` - Motion Graphics poster
6. `skill-enhancement-poster.jpg` - Skill Enhancement poster

---

## Video Specifications

### Format Requirements
- **Container**: MP4 (H.264 codec)
- **Alternative**: WebM (VP9 codec) for better compression
- **Resolution**: 1920x1080 (Full HD) or 3840x2160 (4K for high-DPI)
- **Aspect Ratio**: 16:9
- **Frame Rate**: 24fps, 25fps, or 30fps
- **Bitrate**: 5-10 Mbps for 1080p, 15-25 Mbps for 4K

### Optimization Guidelines
1. **Compress videos** using HandBrake or FFmpeg
2. **Use two-source approach** for better browser support:
   ```html
   <video>
     <source src="video.webm" type="video/webm">
     <source src="video.mp4" type="video/mp4">
   </video>
   ```
3. **Target file sizes**:
   - 1080p: 5-15 MB per video
   - 4K: 15-30 MB per video

### FFmpeg Compression Example
```bash
# Compress to 1080p H.264
ffmpeg -i input.mov -vf "scale=1920:1080" -c:v libx264 -crf 23 -c:a aac -b:a 128k output.mp4

# Create WebM version
ffmpeg -i input.mov -vf "scale=1920:1080" -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus output.webm
```

### Mobile Optimization
For better mobile performance, consider creating lower-resolution versions:
```bash
# Mobile-optimized 720p version
ffmpeg -i input.mp4 -vf "scale=1280:720" -c:v libx264 -crf 25 -c:a aac -b:a 96k mobile-output.mp4
```

---

## Poster Image Specifications

### Requirements
- **Format**: JPG (progressive) or WebP
- **Resolution**: 1920x1080 (same as video)
- **Quality**: 80-85% compression
- **File Size**: < 200 KB per image

### Best Practices
1. **Use key frame** from video as poster
2. **Add text overlay** with course title for initial load
3. **Optimize with Squoosh** or ImageOptim
4. **Consider WebP** for 30% better compression

---

## Content Guidelines

### Video Content Suggestions
Each course video should showcase:

**3D Animation:**
- Character animation reels
- 3D modeling process
- Student work highlights
- Industry software (Maya, 3ds Max)

**Digital Content Creation:**
- Social media content examples
- Short film clips
- Video production behind-the-scenes
- Content creator workflows

**Game Design:**
- Game gameplay footage
- Character/environment design
- Unity/Unreal Engine demos
- Student game projects

**VFX:**
- Before/after VFX shots
- Compositing breakdowns
- Green screen work
- Film/OTT platform examples

**Motion Graphics:**
- Motion design reels
- Broadcast graphics
- Title sequences
- Advertising animations

**Skill Enhancement:**
- Quick skill demonstrations
- Software tutorials
- Student success stories
- Career outcomes

---

## Loading Strategy

The component implements:
1. **Lazy loading** - Videos load only when needed
2. **Poster first** - Images show before video loads
3. **Preload first video** - First course video preloaded for instant play
4. **Intersection Observer** - Videos play only when visible

---

## Testing Checklist

After adding videos:
- [ ] All 6 videos play correctly on desktop
- [ ] All 6 videos play correctly on mobile
- [ ] Videos auto-play when scrolled into view
- [ ] Videos pause when scrolled out of view
- [ ] Crossfade transitions are smooth (60fps)
- [ ] Text overlay is readable on all videos
- [ ] Mobile swipe carousel works smoothly
- [ ] Dot navigation updates correctly
- [ ] Progress bar (desktop) tracks scroll position
- [ ] Reduced motion preference is respected

---

## Troubleshooting

### Videos Don't Auto-Play
- Ensure videos are **muted** (`muted` attribute)
- Add `playsInline` for iOS Safari
- Check browser autoplay policies

### Videos Buffer/Slow
- Compress videos further
- Use WebM format (better compression)
- Implement adaptive bitrate streaming (HLS/DASH)

### Poster Images Not Showing
- Check file paths are correct
- Verify image formats are supported
- Clear Next.js cache: `npm run clean`

---

## Performance Monitoring

Use Chrome DevTools to monitor:
- **LCP (Largest Contentful Paint)**: Should be < 2.5s
- **Video decode time**: Should be smooth, no frame drops
- **Memory usage**: Videos should release memory when not visible

Run Lighthouse audit:
```bash
npm run build
npm run start
# Then open Chrome DevTools > Lighthouse > Analyze
```
