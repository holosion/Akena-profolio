import { test, expect } from "@playwright/test";

test("desktop loads real 3D and changes chapters while scrolling", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Turning ideas",
  );
  await expect(page.locator(".hero .scene-ready canvas")).toBeVisible({
    timeout: 30000,
  });
  await page.screenshot({ path: "test-results/desktop-hero.png" });
  const journey = page.locator("#experience");
  for (const [fraction, chapter] of [
    [0.05, 0],
    [0.5, 1],
    [0.87, 2],
  ]) {
    await journey.evaluate((el, fraction) => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: top + (el.clientHeight - window.innerHeight) * fraction,
        behavior: "instant",
      });
    }, fraction);
    await expect(journey).toHaveClass(new RegExp(`chapter-${chapter}`));
    await expect(journey.locator(".scene-ready canvas")).toBeVisible({ timeout: 30000 });
    await page.waitForTimeout(700);
    await page.screenshot({
      path: `test-results/desktop-chapter-${chapter}.png`,
    });
  }
  for (const art of await page.locator(".project-art img").all()) {
    await art.scrollIntoViewIfNeeded();
    await expect
      .poll(() => art.evaluate((img) => (img as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
  }
  await expect(page.locator(".work-card")).toHaveCount(4);
  await page.locator("#work").scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await page.screenshot({ path: "test-results/desktop-work.png" });
  await expect(
    page.locator('a[href="https://www.instagram.com/holosion/"]'),
  ).toHaveCount(3);
  expect(errors).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("mobile navigation, project cards, and contact are usable without overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".hero .scene-ready")).toBeVisible({
    timeout: 30000,
  });
  await page.screenshot({
    path: "test-results/mobile-hero.png",
    fullPage: false,
  });
  const menu = page.getByRole("button", { name: "Open navigation" });
  await menu.click();
  await expect(page.locator("#main-navigation")).toBeVisible();
  await page.getByRole("link", { name: "Selected work", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
  await expect(page).toHaveURL(/#work$/);
  await page.locator(".work-card").first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await page.screenshot({ path: "test-results/mobile-work.png" });
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await page.screenshot({ path: "test-results/mobile-contact.png" });
  await expect(
    page.getByRole("link", { name: "Instagram / @holosion" }),
  ).toHaveAttribute("href", "https://www.instagram.com/holosion/");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("reduced motion exposes all chapters and static artwork", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(
    page.locator('.journey-chapter[aria-hidden="false"]'),
  ).toHaveCount(3);
  await expect(page.locator(".hero .scene-fallback")).toBeVisible();
  await expect(page.locator(".journey-sticky")).toHaveCSS(
    "position",
    "relative",
  );
  await expect(page.locator(".hero-copy")).toHaveCSS("transform", "none");
});
