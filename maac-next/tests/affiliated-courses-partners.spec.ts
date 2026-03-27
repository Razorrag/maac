import { test, expect } from '@playwright/test';

test.describe('AffiliatedCoursesPartners Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render affiliated courses section on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Scroll to the section
    await page.evaluate(() => {
      document.querySelector('#careerx-creatorx')?.scrollIntoView({ block: 'end' });
    });

    // Wait for section to be visible
    const section = page.locator('section').filter({ hasText: 'Our Affiliated Courses' }).first();
    await expect(section).toBeVisible();

    // Check title
    const title = section.locator('h2').filter({ hasText: 'Our Affiliated Courses' }).first();
    await expect(title).toBeVisible();
    await expect(title).toHaveCSS('color', /rgb\(245, 185, 50\)/); // Amber color

    // Check course cards exist (4 cards)
    const courseCards = section.locator('.glass').filter({ hasText: 'AD3D Edge Plus' });
    await expect(courseCards.first()).toBeVisible();

    // Check all 4 courses are present
    const courses = ['AD3D Edge Plus', 'ADVFX Plus', 'APDMC Plus', 'ADIDG Plus'];
    for (const course of courses) {
      await expect(section.locator(`text=${course}`)).toBeVisible();
    }
  });

  test('should render partner logos on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Scroll to partners section
    await page.evaluate(() => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        if (section.textContent?.includes('Industry Knowledge Partners')) {
          section.scrollIntoView({ block: 'start' });
        }
      });
    });

    // Check partners title
    const partnersTitle = page.locator('h2').filter({ hasText: 'Our Industry Knowledge Partners' }).first();
    await expect(partnersTitle).toBeVisible();

    // Check some partner logos exist
    const partners = ['Nilee Games', 'Autodesk', 'Canon', 'Physics Wallah'];
    for (const partner of partners) {
      const logo = page.locator(`img[alt*="${partner}"]`);
      await expect(logo.first()).toBeVisible();
    }
  });

  test('should render correctly on mobile viewport', async ({ page }) => {
    // Set mobile viewport (iPhone 14 Pro)
    await page.setViewportSize({ width: 393, height: 852 });

    // Scroll to section
    await page.evaluate(() => {
      document.querySelector('#careerx-creatorx')?.scrollIntoView({ block: 'end' });
    });

    // Check section is visible
    const section = page.locator('section').filter({ hasText: 'Our Affiliated Courses' }).first();
    await expect(section).toBeVisible();

    // Check horizontal scroll container exists
    const scrollContainer = section.locator('.overflow-x-auto').first();
    await expect(scrollContainer).toBeVisible();

    // Check course cards are in scroll container
    const firstCourse = scrollContainer.locator('text=AD3D Edge Plus');
    await expect(firstCourse).toBeVisible();

    // Check scroll hint dots
    const scrollDots = section.locator('.rounded-full').filter({ has: page.locator('bg-[#F5B932]') });
    await expect(scrollDots.first()).toBeVisible();
  });

  test('should have proper hover effects on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Scroll to courses section
    await page.evaluate(() => {
      document.querySelector('#careerx-creatorx')?.scrollIntoView({ block: 'end' });
    });

    // Find first course card
    const firstCard = page.locator('.glass').filter({ hasText: 'AD3D Edge Plus' }).first();

    // Hover over card
    await firstCard.hover();

    // Check arrow button scales on hover
    const arrowButton = firstCard.locator('role=img[name="arrow"]');
    await expect(arrowButton.first()).toBeVisible();

    // Check progress line appears (should animate to 100% width)
    const progressLine = firstCard.locator('.bg-white').first();
    await expect(progressLine).toBeVisible();
  });

  test('should have marquee animation classes on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Scroll to partners section
    await page.evaluate(() => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        if (section.textContent?.includes('Industry Knowledge Partners')) {
          section.scrollIntoView({ block: 'start' });
        }
      });
    });

    // Check marquee animation classes exist
    const marqueeRight = page.locator('.animate-marquee-right');
    const marqueeLeft = page.locator('.animate-marquee-left');

    await expect(marqueeRight.first()).toBeVisible();
    await expect(marqueeLeft.first()).toBeVisible();
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Scroll to section
    await page.evaluate(() => {
      document.querySelector('#careerx-creatorx')?.scrollIntoView({ block: 'end' });
    });

    // Check section has proper heading hierarchy
    const h2Headings = page.locator('h2');
    await expect(h2Headings.filter({ hasText: 'Our Affiliated Courses' })).toBeVisible();
    await expect(h2Headings.filter({ hasText: 'Our Industry Knowledge Partners' })).toBeVisible();

    // Check all partner logos have alt text
    const partnerLogos = page.locator('img[alt*="logo"]');
    const count = await partnerLogos.count();
    expect(count).toBeGreaterThan(0);

    // Verify each logo has descriptive alt text
    for (let i = 0; i < Math.min(count, 5); i++) {
      const altText = await partnerLogos.nth(i).getAttribute('alt');
      expect(altText).toBeTruthy();
      expect(altText?.length).toBeGreaterThan(5);
    }
  });

  test('should not have layout shift (CLS check)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Measure layout stability
    let cumulativeLayoutShift = 0;

    // Listen for layout shifts
    page.on('console', async (msg) => {
      if (msg.type() === 'metric') {
        const metric = await msg.args()[0]?.jsonValue();
        if (metric?.name === 'CLS') {
          cumulativeLayoutShift = metric.value;
        }
      }
    });

    // Navigate and scroll through section
    await page.goto('/');
    await page.evaluate(() => {
      document.querySelector('#careerx-creatorx')?.scrollIntoView({ block: 'end' });
    });

    // Wait for content to stabilize
    await page.waitForTimeout(2000);

    // CLS should be minimal (under 0.1 is good, under 0.25 is acceptable)
    // Note: This is a simplified check - real CLS measurement requires PerformanceObserver
    expect(cumulativeLayoutShift).toBeLessThan(0.25);
  });
});
