import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
process.env.PLAYWRIGHT_BROWSERS_PATH = path.resolve(".tools/browsers");
const require = createRequire(path.resolve(".tools/qa/package.json"));
const playwright = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;
const engine = process.env.QA_BROWSER || "chromium";
const origin = process.env.QA_ORIGIN || "http://localhost:3113";
const out = process.env.QA_OUTPUT || `.tools/ui02/${engine}`;
fs.mkdirSync(out, { recursive: true });
const browser = await playwright[engine].launch({
  headless: true,
  ...(engine === "chromium" ? { channel: "chromium" } : {}),
});
const results = [];
try {
  for (const theme of ["light", "dark"])
    for (const [width, height] of [
      [320, 568],
      [360, 800],
      [390, 844],
      [430, 932],
      [768, 1024],
      [1024, 768],
      [1440, 1000],
    ]) {
      const context = await browser.newContext({
        viewport: { width, height },
        hasTouch: width <= 430,
        reducedMotion: "reduce",
      });
      await context.addInitScript(
        (t) => localStorage.setItem("youverse-theme", t),
        theme,
      );
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(origin);
      await page.getByRole("tab", { name: "For You", exact: true }).waitFor();
      await page.waitForFunction(
        (t) => document.documentElement.dataset.theme === t,
        theme,
      );
      await page.evaluate(() => document.fonts.ready);
      const first = page.locator(".premium-post").first();
      const metrics = await first.evaluate((el) => ({
        width: el.getBoundingClientRect().width,
        textSize: parseFloat(
          getComputedStyle(el.querySelector(".post-text")).fontSize,
        ),
        font: getComputedStyle(document.body).fontFamily,
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
      }));
      assert(!metrics.overflow);
      assert(metrics.textSize >= 14 && metrics.textSize <= 16);
      assert(metrics.font.toLowerCase().includes("inter"));
      if (width <= 430)
        assert(
          metrics.width >= width - 2,
          "Mobile posts should fill the feed width",
        );
      for (const selector of [
        ".post-actions button",
        ".post-actions a",
        ".post-options>.icon-button",
        ".follow-button",
      ]) {
        const box = await first.locator(selector).first().boundingBox();
        assert(
          box.width >= 44 && box.height >= 44,
          `${selector}: ${JSON.stringify(box)}`,
        );
      }
      const like = first.getByRole("button", { name: "Like reflection" });
      await like.click();
      assert.equal(await like.getAttribute("aria-pressed"), "true");
      const animation = await like
        .locator("svg")
        .evaluate((el) => getComputedStyle(el).animationName);
      assert.equal(animation, "none");
      await like.click();
      assert.equal(await like.getAttribute("aria-pressed"), "false");
      await first
        .getByRole("button", { name: "Save reflection", exact: true })
        .click();
      await page.getByRole("tab", { name: "Saved", exact: true }).click();
      assert.equal(await page.locator(".premium-post").count(), 1);
      await page.getByRole("tab", { name: "For You", exact: true }).click();
      // Arrow navigation and viewed rings must continue to use the session model.
      const trigger = page.locator(".stories button").first();
      await trigger.click();
      const viewer = page.getByRole("dialog", { name: "Story viewer" });
      assert.equal(
        await viewer.getByRole("progressbar").getAttribute("aria-valuenow"),
        "1",
      );
      await page.keyboard.press("ArrowRight");
      assert.equal(
        await viewer.getByRole("progressbar").getAttribute("aria-valuenow"),
        "2",
      );
      await viewer.getByRole("button", { name: "Next", exact: true }).click();
      assert.equal(
        await viewer.getByRole("progressbar").getAttribute("aria-valuenow"),
        "1",
      );
      await page.keyboard.press("ArrowLeft");
      assert.equal(
        await viewer.getByRole("progressbar").getAttribute("aria-valuenow"),
        "2",
      );
      assert.equal(
        await viewer
          .locator(".story-progress .current")
          .evaluate((el) => getComputedStyle(el, "::after").animationName),
        "none",
      );
      const storyMetrics = await viewer.evaluate((el) => ({
        width: el.clientWidth,
        scrollWidth: el.scrollWidth,
        height: el.getBoundingClientRect().height,
        stageHeight: el.querySelector(".story-stage").getBoundingClientRect()
          .height,
        artworkHeight: el
          .querySelector(".story-stage .social-art")
          .getBoundingClientRect().height,
      }));
      assert(storyMetrics.scrollWidth <= storyMetrics.width + 1);
      assert(
        Math.abs(storyMetrics.stageHeight - storyMetrics.artworkHeight) <= 1,
        "Story artwork must fill the immersive stage",
      );
      const violations = [];
      if (width === 390) {
        const storyAxe = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        violations.push(
          ...storyAxe.violations.map((v) => ({
            screen: "story",
            id: v.id,
            nodes: v.nodes.map((n) => n.target),
          })),
        );
        await viewer
          .getByLabel("Story reply preview")
          .fill("A little local hello");
        await viewer
          .getByRole("button", { name: "Preview reply", exact: true })
          .click();
        assert(
          (await viewer.getByRole("status").textContent()).includes(
            "No private DM",
          ),
        );
      }
      await page.keyboard.press("Escape");
      assert.equal(await page.getByRole("dialog").count(), 0);
      assert(await trigger.evaluate((el) => el === document.activeElement));
      assert(
        await trigger
          .locator(".story-ring")
          .evaluate((el) => el.classList.contains("viewed")),
      );
      if (width === 390) {
        const feedAxe = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        violations.push(
          ...feedAxe.violations.map((v) => ({
            screen: "feed",
            id: v.id,
            nodes: v.nodes.map((n) => n.target),
          })),
        );
        await first.getByRole("button", { name: /Options for/ }).click();
        await first
          .getByRole("button", { name: "Hide content", exact: true })
          .click();
        await page
          .getByRole("button", { name: "Undo hide", exact: true })
          .click();
        assert.equal(await page.locator(".premium-post").count(), 6);
        await first
          .locator(".person-name")
          .evaluate(
            (el) =>
              (el.textContent =
                "A very long display name that should wrap without colliding with controls"),
          );
        assert(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 1,
          ),
        );
      }
      assert.deepEqual(violations, []);
      assert.deepEqual(errors, []);
      results.push({
        engine,
        theme,
        width,
        height,
        metrics,
        storyMetrics,
        violations,
        errors,
        status: "PASS",
      });
      await context.close();
      console.log("PASS UI02", engine, theme, width);
    }
  // Actual motion feedback must exist when reduced motion is not requested.
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await page.goto(origin);
  const first = page.locator(".premium-post").first();
  await first.getByRole("button", { name: "Like reflection" }).click();
  assert.equal(
    await first
      .locator(".like-action svg")
      .evaluate((el) => getComputedStyle(el).animationName),
    "like-pop",
  );
  await page.locator(".stories button").first().click();
  assert.equal(
    await page
      .locator(".story-progress .current")
      .evaluate((el) => getComputedStyle(el, "::after").animationName),
    "story-step",
  );
  await context.close();
} finally {
  await browser.close();
  fs.writeFileSync(
    `${out}/ui02.json`,
    JSON.stringify({ engine, results }, null, 2) + "\n",
  );
}
assert.equal(results.length, 14);
