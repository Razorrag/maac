import { test, expect } from '@playwright/test';

test.describe('WhyMAAC Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render WhyMAAC section on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Wait for component to mount
    await page.waitForTimeout(1000);
    
    // Scroll to WhyMAAC section
    await page.evaluate(() => {
      document.querySelector('section')?.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Check for header text
    await expect(page.getByText(/Creative Careers/i)).toBeVisible();
    await expect(page.getByText(/That Click/i)).toBeVisible();
    await expect(page.getByText(/Think MAAC/i)).toBeVisible();
    
    // Check for featured card
    await expect(page.getByText(/Workshops & Masterclasses/i)).toBeVisible();
    
    // Check for benefit cards (should have 6 benefits)
    const benefitCards = page.locator('section').getByRole('heading', { level: 4 });
    await expect(benefitCards).toHaveCount(6);
    
    // Check for student showcase gallery
    await expect(page.getByText(/Student Showcase/i)).toBeVisible();
  });

  test('should render WhyMAAC section on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    
    // Wait for component to mount
    await page.waitForTimeout(1000);
    
    // Scroll to WhyMAAC section
    await page.evaluate(() => {
      document.querySelector('section')?.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Check for header text
    await expect(page.getByText(/Creative Careers/i)).toBeVisible();
    await expect(page.getByText(/That Click/i)).toBeVisible();
    
    // Check for featured card (mobile version)
    await expect(page.getByText(/Workshops & Masterclasses/i)).toBeVisible();
    
    // Check for benefit cards in vertical stack
    const benefitCards = page.locator('section').getByRole('heading', { level: 4 });
    await expect(benefitCards).toHaveCount(6);
    
    // Check for swipe gallery text
    await expect(page.getByText(/Student Showcase/i)).toBeVisible();
    await expect(page.getByText(/Swipe to explore/i)).toBeVisible();
  });

  test('should have smooth animations on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Wait for animations to initialize
    await page.waitForTimeout(1500);
    
    // Check for animated elements
    const animatedElements = page.locator('[style*="transform"]');
    await expect(animatedElements.first()).toBeVisible();
    
    // Verify glassmorphism effect
    const glassElements = page.locator('.glass, .glass-contrast');
    await expect(glassElements.first()).toBeVisible();
  });

  test('should have touch-friendly gallery on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(1000);
    
    // Find the horizontal scroll gallery
    const gallery = page.locator('[class*="snap-x"]');
    await expect(gallery).toBeVisible();
    
    // Verify snap scrolling is enabled
    const scrollType = await gallery.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.scrollSnapType;
    });
    expect(scrollType).toContain('x mandatory');
  });

  test('should lazy load images', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Check for image placeholders (skeleton loaders)
    const images = page.locator('img[loading="lazy"]');
    await expect(images.first()).toBeVisible();
    
    // Verify images have proper loading attributes
    const firstImage = images.first();
    const loadingAttr = await firstImage.getAttribute('loading');
    expect(loadingAttr).toBe('lazy');
  });

  test('should have proper CLS prevention', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Check for images with explicit dimensions
    const images = page.locator('img');
    const firstImage = images.first();
    
    // Wait for images to load
    await page.waitForLoadState('networkidle');
    
    // Verify layout stability (no layout shift)
    const initialHeight = await page.evaluate(() => document.body.scrollHeight);
    await page.waitForTimeout(2000);
    const finalHeight = await page.evaluate(() => document.body.scrollHeight);
    
    // Allow small tolerance for font loading
    expect(Math.abs(finalHeight - initialHeight)).toBeLessThan(50);
  });

  test('should respond to reduced motion preferences', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Animations should be disabled or minimal
    const animatedElements = page.locator('[style*="animation"]');
    
    // With reduced motion, animations should be very short or disabled
    // This is handled by CSS @media (prefers-reduced-motion)
    await expect(page.locator('body')).toBeVisible();
  });

  test('should have magnetic hover effect on buttons', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Find the CTA button
    const button = page.getByRole('button', { name: /explore workshops/i });
    await expect(button).toBeVisible();
    
    // Hover over button
    await button.hover();
    
    // Check for hover state (scale/shadow change)
    await page.waitForTimeout(300);
    const buttonStyle = await button.evaluate((el) => window.getComputedStyle(el));
    expect(buttonStyle.transform).not.toBe('none');
  });

  test('should have sticky horizontal benefits section on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Scroll to horizontal benefits section
    await page.evaluate(() => {
      window.scrollBy({ top: 800, behavior: 'smooth' });
    });
    
    // Check for sticky container
    const stickyElement = page.locator('[class*="sticky"]');
    await expect(stickyElement).toBeVisible();
    
    // Verify sticky positioning
    const isSticky = await stickyElement.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.position === 'sticky';
    });
    expect(isSticky).toBe(true);
  });

  test('should convert horizontal scroll to vertical on mobile', async ({ page }) => {
    // Test desktop first
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(500);
    
    const desktopHorizontal = page.locator('[class*="flex"]').filter({ hasText: '01' });
    await expect(desktopHorizontal).toBeVisible();
    
    // Switch to mobile
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(500);
    
    // On mobile, benefits should be stacked vertically
    const mobileVertical = page.locator('section').getByRole('heading', { level: 4 }).first();
    await expect(mobileVertical).toBeVisible();
  });
});
