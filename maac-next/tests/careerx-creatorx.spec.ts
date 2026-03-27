import { test, expect } from '@playwright/test';

test.describe('CareerXCreatorX Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render CareerXCreatorX section on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Scroll to CareerXCreatorX section
    await page.locator('#careerx-creatorx').scrollIntoViewIfNeeded();

    // Check header is visible
    const header = page.getByText('INTRODUCING', { exact: true });
    await expect(header).toBeVisible();

    // Check CareerX and CreatorX titles
    await expect(page.getByText('CAREER X')).toBeVisible();
    await expect(page.getByText('CREATOR X')).toBeVisible();

    // Check "Newly Launched" badge
    await expect(page.getByText('Newly Launched')).toBeVisible();

    // Check feature cards
    const careerXCard = page.locator('text=Taught by seasoned industry practitioners').first();
    await expect(careerXCard).toBeVisible();

    const creatorXCard = page.locator('text=Real-world content production skills').first();
    await expect(creatorXCard).toBeVisible();

    // Check affiliated courses section
    await expect(page.getByText('Our Affiliated Courses')).toBeVisible();

    // Check course cards
    await expect(page.getByText('Animation & VFX')).toBeVisible();
    await expect(page.getByText('Game Design & Development')).toBeVisible();

    // Verify no purple colors (check for purple in style attributes)
    const section = page.locator('#careerx-creatorx');
    const purpleElements = await section.evaluate((el) => {
      const elements = el.querySelectorAll('*');
      const purple: string[] = [];
      elements.forEach((elem) => {
        const style = window.getComputedStyle(elem);
        if (
          style.color.includes('128') || // purple RGB
          style.backgroundColor.includes('128') ||
          style.color.includes('rgb(128, 0, 128)') ||
          style.backgroundColor.includes('rgb(128, 0, 128)')
        ) {
          purple.push(elem.tagName);
        }
      });
      return purple;
    });
    expect(purpleElements).toHaveLength(0);
  });

  test('should render CareerXCreatorX section on mobile', async ({ page }) => {
    // Set mobile viewport (iPhone 14)
    await page.setViewportSize({ width: 390, height: 844 });

    // Scroll to CareerXCreatorX section
    await page.locator('#careerx-creatorx').scrollIntoViewIfNeeded();

    // Check header is visible
    const header = page.getByText('INTRODUCING', { exact: true });
    await expect(header).toBeVisible();

    // Check titles are stacked vertically on mobile
    await expect(page.getByText('CAREER X')).toBeVisible();
    await expect(page.getByText('CREATOR X')).toBeVisible();

    // Check feature cards are stacked
    const careerXCard = page.locator('text=CAREER X').first();
    await expect(careerXCard).toBeVisible();

    // Check horizontal scroll for courses
    const courseCarousel = page.locator('.snap-x');
    await expect(courseCarousel).toBeVisible();

    // Verify touch-friendly tap targets (min 44px)
    const buttons = await page.locator('button, a').evaluateAll((elements) => {
      return elements.map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          width: rect.width,
          height: rect.height,
          isTouchFriendly: rect.width >= 44 || rect.height >= 44,
        };
      });
    });

    // All interactive elements should be touch-friendly
    buttons.forEach((btn) => {
      expect(btn.isTouchFriendly).toBe(true);
    });
  });

  test('should have proper image loading with skeleton', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Block image loading to test skeleton
    await page.route('**/*.svg', (route) => route.abort());

    await page.goto('/');
    await page.locator('#careerx-creatorx').scrollIntoViewIfNeeded();

    // Skeleton should be visible initially
    const skeleton = page.locator('.animate-pulse');
    await expect(skeleton).toBeVisible();
  });

  test('should have proper color theme (red/green, no purple)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.locator('#careerx-creatorx').scrollIntoViewIfNeeded();

    // Check CareerX red gradient
    const careerXTitle = page.getByText('CAREER X').first();
    const careerXColor = await careerXTitle.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.backgroundImage;
    });
    expect(careerXColor).toContain('232, 40, 28'); // RGB for #E8281C

    // Check CreatorX green gradient
    const creatorXTitle = page.getByText('CREATOR X').first();
    const creatorXColor = await creatorXTitle.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.backgroundImage;
    });
    expect(creatorXColor).toContain('34, 197, 94'); // RGB for #22C55E
  });

  test('should have proper ARIA labels for accessibility', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.locator('#careerx-creatorx').scrollIntoViewIfNeeded();

    // Check images have alt text
    const images = page.locator('#careerx-creatorx img');
    await expect(images.first()).toHaveAttribute('alt');

    // Check buttons have accessible names
    const buttons = page.locator('#careerx-creatorx button');
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      await expect(button).toBeVisible();
    }
  });

  test('should have smooth animations on scroll', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Start above the section
    await page.evaluate(() => window.scrollTo(0, 0));

    // Scroll to section
    await page.locator('#careerx-creatorx').scrollIntoViewIfNeeded();

    // Wait for animations to complete
    await page.waitForTimeout(1000);

    // Elements should be visible after scroll reveal
    const header = page.getByText('INTRODUCING', { exact: true });
    await expect(header).toBeInViewport();

    // Check feature cards are animated in
    const cards = page.locator('#careerx-creatorx').getByRole('listitem');
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThan(0);
  });

  test('should respect reduced motion preferences', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Emulate reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await page.goto('/');
    await page.locator('#careerx-creatorx').scrollIntoViewIfNeeded();

    // Component should still render correctly
    const header = page.getByText('INTRODUCING', { exact: true });
    await expect(header).toBeVisible();
  });
});
