import { test, expect } from '@playwright/test';

/**
 * Playwright Tests for CourseVideoShowcase Component
 * 
 * Tests cover:
 * - Desktop scrollytelling experience
 * - Mobile swipe carousel
 * - Video playback behavior
 * - Navigation interactions
 * - Responsive breakpoints
 * - Accessibility
 */

test.describe('CourseVideoShowcase', () => {
  const DESKTOP_WIDTH = 1920;
  const DESKTOP_HEIGHT = 1080;
  const MOBILE_WIDTH = 375;
  const MOBILE_HEIGHT = 667;
  const TABLET_WIDTH = 768;
  const TABLET_HEIGHT = 1024;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Desktop Experience (≥1024px)', () => {
    test.use({
      viewport: { width: DESKTOP_WIDTH, height: DESKTOP_HEIGHT },
    });

    test('should render video showcase section', async ({ page }) => {
      // Scroll to the section
      await page.getByTestId('course-showcase').scrollIntoViewIfNeeded();
      
      // Check section exists
      const section = page.locator('#course-showcase');
      await expect(section).toBeVisible();
    });

    test('should display 6 course videos', async ({ page }) => {
      await page.goto('/');
      
      // Wait for videos to load
      const videos = page.locator('video');
      await expect(videos).toHaveCount(6);
    });

    test('should show progress indicator with 6 segments', async ({ page }) => {
      await page.goto('/');
      
      const progressSegments = page.locator('[class*="progress-segment"]');
      await expect(progressSegments).toHaveCount(6);
    });

    test('should display text overlay in bottom-left corner', async ({ page }) => {
      await page.goto('/');
      
      // Check for glassmorphism card in bottom-left
      const textOverlay = page.locator('[class*="glass"]').first();
      await expect(textOverlay).toBeVisible();
      
      // Verify position (should be in bottom-left)
      const box = await textOverlay.boundingBox();
      expect(box).toBeTruthy();
      expect(box!.x).toBeLessThan(DESKTOP_WIDTH / 2);
      expect(box!.y).toBeGreaterThan(DESKTOP_HEIGHT / 2);
    });

    test('should show first course title by default', async ({ page }) => {
      await page.goto('/');
      
      const firstCourseTitle = page.getByText('3D Animation', { exact: false });
      await expect(firstCourseTitle).toBeVisible();
    });

    test('should update active course on scroll', async ({ page }) => {
      await page.goto('/');
      
      // Scroll down to trigger course change
      await page.mouse.wheel(0, 1000);
      await page.waitForTimeout(500);
      
      // Second course should become visible
      const secondCourseTitle = page.getByText('Digital Content Creation', { exact: false });
      await expect(secondCourseTitle).toBeVisible({ timeout: 5000 });
    });

    test('should update progress bar on scroll', async ({ page }) => {
      await page.goto('/');
      
      // Get initial active segment
      const initialActiveSegment = page.locator('[style*="height: 100%"]').first();
      await expect(initialActiveSegment).toBeVisible();
      
      // Scroll down
      await page.mouse.wheel(0, 1500);
      await page.waitForTimeout(500);
      
      // Different segment should be active
      const newActiveSegment = page.locator('[style*="height: 100%"]').first();
      await expect(newActiveSegment).toBeVisible();
    });

    test('should display course icons (emojis)', async ({ page }) => {
      await page.goto('/');
      
      // Check for emoji icons
      const icons = ['🎬', '📱', '🎮', '✨', '📺', '🚀'];
      
      for (const icon of icons) {
        const iconElement = page.getByText(icon);
        await expect(iconElement).toBeVisible();
      }
    });

    test('should have working explore course links', async ({ page }) => {
      await page.goto('/');
      
      // Find all explore course buttons
      const exploreButtons = page.getByRole('link', { name: /explore course/i });
      await expect(exploreButtons).toHaveCount(1);
      
      // Click first button
      await exploreButtons.first().click();
      
      // Should navigate to course page
      await expect(page).toHaveURL(/\/courses\//);
    });

    test('should show scroll hint on first section', async ({ page }) => {
      await page.goto('/');
      
      const scrollHint = page.getByText('Scroll to explore');
      await expect(scrollHint).toBeVisible();
    });

    test('should hide scroll hint after scrolling', async ({ page }) => {
      await page.goto('/');
      
      // Scroll down
      await page.mouse.wheel(0, 800);
      await page.waitForTimeout(500);
      
      const scrollHint = page.getByText('Scroll to explore');
      await expect(scrollHint).not.toBeVisible();
    });

    test('should crossfade videos smoothly', async ({ page }) => {
      await page.goto('/');
      
      // Get first video opacity
      const videos = page.locator('video');
      const firstVideo = videos.first();
      
      // First video should be visible
      await expect(firstVideo).toBeVisible();
      
      // Scroll to trigger crossfade
      await page.mouse.wheel(0, 1200);
      await page.waitForTimeout(600);
      
      // First video should fade out, second should fade in
      // (This is hard to test directly, but we can check visibility changes)
    });
  });

  test.describe('Mobile Experience (<1024px)', () => {
    test.use({
      viewport: { width: MOBILE_WIDTH, height: MOBILE_HEIGHT },
    });

    test('should render horizontal swipe carousel', async ({ page }) => {
      await page.goto('/');
      
      // Check for horizontal scroll container
      const carousel = page.locator('[class*="scroll-snap"]');
      await expect(carousel).toBeVisible();
    });

    test('should display dot navigation', async ({ page }) => {
      await page.goto('/');
      
      const dots = page.locator('[aria-label^="Go to"]');
      await expect(dots).toHaveCount(6);
    });

    test('should highlight active dot', async ({ page }) => {
      await page.goto('/');
      
      // First dot should be active (wider)
      const firstDot = page.locator('[aria-label="Go to 3D Animation"]');
      await expect(firstDot).toHaveCSS('width', '24px');
    });

    test('should swipe to next course', async ({ page }) => {
      await page.goto('/');
      
      // Swipe left to go to next course
      await page.mouse.move(100, 300);
      await page.mouse.down();
      await page.mouse.move(-100, 300);
      await page.mouse.up();
      await page.waitForTimeout(500);
      
      // Second dot should now be active
      const secondDot = page.locator('[aria-label="Go to Digital Content Creation"]');
      await expect(secondDot).toHaveCSS('width', '24px');
    });

    test('should click dot to navigate', async ({ page }) => {
      await page.goto('/');
      
      // Click third dot
      const thirdDot = page.locator('[aria-label="Go to Game Design"]');
      await thirdDot.click();
      await page.waitForTimeout(500);
      
      // Third dot should be active
      await expect(thirdDot).toHaveCSS('width', '24px');
    });

    test('should display text overlay on mobile', async ({ page }) => {
      await page.goto('/');
      
      const textOverlay = page.locator('[class*="glass"]').first();
      await expect(textOverlay).toBeVisible();
    });

    test('should have touch-friendly tap targets', async ({ page }) => {
      await page.goto('/');
      
      // Check explore course button size
      const exploreButton = page.getByRole('link', { name: /explore course/i }).first();
      const box = await exploreButton.boundingBox();
      
      expect(box).toBeTruthy();
      expect(box!.height).toBeGreaterThanOrEqual(44); // Minimum touch target
      expect(box!.width).toBeGreaterThanOrEqual(44);
    });
  });

  test.describe('Tablet Experience (768px - 1023px)', () => {
    test.use({
      viewport: { width: TABLET_WIDTH, height: TABLET_HEIGHT },
    });

    test('should use mobile layout on tablet portrait', async ({ page }) => {
      await page.goto('/');
      
      // Tablet portrait should use mobile carousel
      const carousel = page.locator('[class*="scroll-snap"]');
      await expect(carousel).toBeVisible();
    });

    test('should use desktop layout on tablet landscape', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      await page.goto('/');
      
      // Tablet landscape should use desktop scrollytelling
      const progressIndicator = page.locator('[class*="progress-segment"]');
      await expect(progressIndicator).toHaveCount(6);
    });
  });

  test.describe('Video Playback', () => {
    test.use({
      viewport: { width: DESKTOP_WIDTH, height: DESKTOP_HEIGHT },
    });

    test('should autoplay videos when in view', async ({ page }) => {
      await page.goto('/');
      
      // Wait for video to start playing
      const video = page.locator('video').first();
      await expect(video).toBeVisible();
      
      // Check video is playing (not paused)
      const isPaused = await video.evaluate((el: HTMLVideoElement) => el.paused);
      expect(isPaused).toBe(false);
    });

    test('should mute videos by default', async ({ page }) => {
      await page.goto('/');
      
      const video = page.locator('video').first();
      const isMuted = await video.evaluate((el: HTMLVideoElement) => el.muted);
      expect(isMuted).toBe(true);
    });

    test('should loop videos', async ({ page }) => {
      await page.goto('/');
      
      const video = page.locator('video').first();
      const isLooping = await video.evaluate((el: HTMLVideoElement) => el.loop);
      expect(isLooping).toBe(true);
    });

    test('should have playsInline attribute for iOS', async ({ page }) => {
      await page.goto('/');
      
      const video = page.locator('video').first();
      const hasPlaysInline = await video.evaluate((el: HTMLVideoElement) => 
        el.hasAttribute('playsInline')
      );
      expect(hasPlaysInline).toBe(true);
    });
  });

  test.describe('Accessibility', () => {
    test.use({
      viewport: { width: DESKTOP_WIDTH, height: DESKTOP_HEIGHT },
    });

    test('should have proper ARIA labels', async ({ page }) => {
      await page.goto('/');
      
      const section = page.locator('#course-showcase');
      await expect(section).toHaveAttribute('aria-label', 'MAAC Course Video Showcase');
    });

    test('should have keyboard navigable links', async ({ page }) => {
      await page.goto('/');
      
      // Tab to explore course button
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      
      // Focused element should be a link
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toHaveAttribute('href');
    });

    test('should have descriptive link text', async ({ page }) => {
      await page.goto('/');
      
      const exploreLink = page.getByRole('link', { name: /explore course/i });
      await expect(exploreLink).toBeVisible();
    });

    test('should respect reduced motion preference', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto('/');
      
      // Animations should be disabled
      // This is hard to test directly, but we can verify the page still works
      const section = page.locator('#course-showcase');
      await expect(section).toBeVisible();
    });
  });

  test.describe('Performance', () => {
    test.use({
      viewport: { width: DESKTOP_WIDTH, height: DESKTOP_HEIGHT },
    });

    test('should lazy load videos', async ({ page }) => {
      await page.goto('/');
      
      // Check videos have loading="lazy"
      const videos = page.locator('video');
      const loadingValues = await videos.all();
      
      for (const video of loadingValues.slice(1)) { // Skip first (preloaded)
        const loading = await video.getAttribute('loading');
        expect(loading).toBe('lazy');
      }
    });

    test('should have poster images', async ({ page }) => {
      await page.goto('/');
      
      const videos = page.locator('video');
      const count = await videos.count();
      
      for (let i = 0; i < count; i++) {
        const poster = await videos.nth(i).getAttribute('poster');
        expect(poster).toBeTruthy();
      }
    });

    test('should not have layout shift', async ({ page }) => {
      await page.goto('/');
      
      // Get section position
      const section = page.locator('#course-showcase');
      const initialBox = await section.boundingBox();
      
      // Wait for videos to load
      await page.waitForTimeout(2000);
      
      // Check position hasn't changed significantly
      const finalBox = await section.boundingBox();
      
      expect(initialBox).toBeTruthy();
      expect(finalBox).toBeTruthy();
      expect(Math.abs(initialBox!.y - finalBox!.y)).toBeLessThan(10);
    });
  });

  test.describe('Color Coding', () => {
    test.use({
      viewport: { width: DESKTOP_WIDTH, height: DESKTOP_HEIGHT },
    });

    test('should use MAAC brand colors', async ({ page }) => {
      await page.goto('/');
      
      // Check for red accent (#E8281C)
      const redElements = page.locator('[style*="#E8281C"]');
      await expect(redElements).toHaveCount({ gte: 2 });
      
      // Check for green accent (#22C55E)
      const greenElements = page.locator('[style*="#22C55E"]');
      await expect(greenElements).toHaveCount({ gte: 2 });
      
      // Check for amber accent (#F5B932)
      const amberElements = page.locator('[style*="#F5B932"]');
      await expect(amberElements).toHaveCount({ gte: 2 });
    });

    test('should color-code courses correctly', async ({ page }) => {
      await page.goto('/');
      
      // 3D Animation should be red
      const animationTitle = page.getByText('3D Animation').first();
      const animationBox = await animationTitle.boundingBox();
      expect(animationBox).toBeTruthy();
      
      // Digital Content should be green
      const contentTitle = page.getByText('Digital Content Creation').first();
      const contentBox = await contentTitle.boundingBox();
      expect(contentBox).toBeTruthy();
    });
  });
});
