import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
process.env.PLAYWRIGHT_BROWSERS_PATH = path.resolve(".tools/browsers");
const require = createRequire(path.resolve(".tools/qa/package.json"));
const pw = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;
const engine = process.env.QA_BROWSER || "chromium",
  origin = process.env.QA_ORIGIN || "http://localhost:3113",
  out = process.env.QA_OUTPUT || `.tools/ui04/${engine}`;
fs.mkdirSync(out, { recursive: true });
const browser = await pw[engine].launch({
  headless: true,
  ...(engine === "chromium" ? { channel: "chromium" } : {}),
});
const results = [];
let currentPage;
async function audit(page, screen, scans) {
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  scans.push({
    screen,
    violations: result.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  });
}
async function navigate(page, url) {
  if (engine === "webkit") await page.waitForLoadState("networkidle");
  await page.goto(url);
  if (engine === "webkit") await page.waitForLoadState("networkidle");
}
async function dimensions(page) {
  return page.evaluate(() => ({
    width: innerWidth,
    documentWidth: document.documentElement.scrollWidth,
  }));
}
try {
  for (const theme of ["light", "dark"])
    for (const [width, height] of [
      [320, 700],
      [360, 800],
      [390, 844],
      [430, 932],
      [768, 1024],
      [1024, 900],
      [1440, 1000],
    ]) {
      const context = await browser.newContext({
        viewport: { width, height },
        hasTouch: width <= 1024,
        reducedMotion: "reduce",
      });
      await context.addInitScript(
        (t) => localStorage.setItem("youverse-theme", t),
        theme,
      );
      const page = await context.newPage();
      currentPage = page;
      page.setDefaultTimeout(15000);
      const errors = [],
        scans = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => {
        if (m.type() === "error") errors.push(m.text());
      });
      await navigate(page, origin + "/explore");
      await page.locator(".explore-screen").waitFor();
      await page.waitForFunction(
        (t) => document.documentElement.dataset.theme === t,
        theme,
      );
      await page.evaluate(() => document.fonts.ready);
      const targets = [];
      for (const selector of [
        ".discovery-search-form button",
        ".explore-screen .choice-tabs button",
        ".explore-screen>.interest-filters button",
      ]) {
        for (const control of await page.locator(selector).all()) {
          const box = await control.boundingBox();
          assert(
            box.width >= 43.99 && box.height >= 43.99,
            selector + " target " + JSON.stringify(box),
          );
          targets.push({ selector, width: box.width, height: box.height });
        }
      }
      const exploreMetrics = await dimensions(page);
      assert(exploreMetrics.documentWidth <= width + 1);
      if (width <= 430) {
        const rail = await page
          .locator(".discovery-section .discovery-grid[data-category=People]")
          .evaluate((el) => ({
            visible: el.clientWidth,
            scroll: el.scrollWidth,
          }));
        assert(rail.scroll > rail.visible);
        await page
          .locator(".discovery-section .discovery-grid[data-category=People]")
          .evaluate((el) => (el.scrollLeft = 120));
        assert(
          await page
            .locator(".discovery-section .discovery-grid[data-category=People]")
            .evaluate((el) => el.scrollLeft > 0),
        );
      }
      if (width === 390 || width === 1440) await audit(page, "Explore", scans);
      const input = page.getByRole("textbox", {
        name: "Search people, posts, Reels, Circles and projects",
      });
      await input.fill("Ananya");
      await page.locator("#search-suggestions").waitFor();
      await page.keyboard.press("Escape");
      assert(await input.evaluate((el) => el === document.activeElement));
      assert.equal(await page.locator("#search-suggestions").count(), 0);
      await input.press("Enter");
      await page.waitForURL(/\/explore\?q=Ananya/);
      assert(
        await page
          .getByRole("region", { name: "Recent searches" })
          .getByRole("button", { name: "Ananya", exact: true })
          .count(),
      );
      const categories = page.getByRole("group", {
        name: "Discovery categories",
      });
      await categories
        .getByRole("button", { name: "People", exact: true })
        .click();
      const person = page.locator(".person-card-result").first();
      await person.waitFor();
      assert.equal(await page.locator(".person-card-result").count(), 1);
      const following = person.locator(".follow-button");
      const before = await following.getAttribute("aria-pressed");
      await following.click();
      const next = before === "true" ? "false" : "true";
      assert.equal(await following.getAttribute("aria-pressed"), next);
      await person
        .getByRole("link", { name: "View Living Identity", exact: true })
        .click();
      await page.waitForURL(origin + "/profile/ananyacreates");
      await page
        .getByRole("heading", { name: "Ananya Sharma", level: 1 })
        .waitFor();
      assert.equal(
        await page
          .locator(".identity-kicker .follow-button")
          .getAttribute("aria-pressed"),
        next,
      );
      const publicMetrics = await page
        .locator(".identity-hero")
        .evaluate((el) => ({
          h1: parseFloat(getComputedStyle(el.querySelector("h1")).fontSize),
          bio: parseFloat(
            getComputedStyle(el.querySelector(".identity-bio")).fontSize,
          ),
          cover: el.querySelector(".identity-cover").className,
        }));
      assert(publicMetrics.h1 >= 20 && publicMetrics.h1 <= 30);
      assert(publicMetrics.bio >= 13 && publicMetrics.bio <= 16);
      await page
        .getByRole("button", { name: /Message.*mutual match required/ })
        .click();
      await page
        .getByRole("dialog", {
          name: "Private conversations need mutual acceptance",
        })
        .waitFor();
      assert.equal(
        await page
          .getByRole("link", { name: "Message your match", exact: true })
          .count(),
        0,
      );
      await page.keyboard.press("Escape");
      if (width === 390) await audit(page, "Public profile", scans);
      await navigate(page, origin + "/profile");
      await page
        .getByRole("heading", { name: "Aarav Shah", level: 1 })
        .waitFor();
      const stats = page.getByRole("group", { name: "Identity at a glance" });
      await stats.getByRole("button", { name: /following/i }).click();
      await page
        .getByRole("dialog", { name: "Following", exact: true })
        .waitFor();
      await page.keyboard.press("Escape");
      const overview = page.getByRole("tab", { name: "Overview", exact: true });
      await overview.focus();
      await page.keyboard.press("End");
      assert.equal(
        await page
          .getByRole("tab", { name: "Milestones", exact: true })
          .getAttribute("aria-selected"),
        "true",
      );
      await page.keyboard.press("Home");
      assert.equal(await overview.getAttribute("aria-selected"), "true");
      assert(await page.locator(".identity-highlights li").count());
      const panel = page.getByRole("tabpanel", {
        name: "Overview",
        exact: true,
      });
      assert.equal(
        await panel.evaluate((el) => getComputedStyle(el).animationName),
        "none",
      );
      const ownMetrics = await dimensions(page);
      assert(ownMetrics.documentWidth <= width + 1);
      if (width === 390 || width === 1440)
        await audit(page, "Own profile", scans);
      if (width === 390) {
        const interest = page
          .locator('.identity-two-column a[href^="/explore?q="]')
          .first();
        await interest.click();
        await page.waitForURL(/\/explore\?q=/);
        // Existing collection actions must still work from the new Explore tiles.
        await navigate(page, origin + "/explore");
        await page
          .getByRole("group", { name: "Discovery categories" })
          .getByRole("button", { name: "Projects", exact: true })
          .click();
        const star = page.locator(".discovery-project .project-star").first();
        await star.click();
        assert.equal(await star.getAttribute("aria-pressed"), "true");
        await page
          .getByRole("group", { name: "Discovery categories" })
          .getByRole("button", { name: "Circles", exact: true })
          .click();
        const join = page
          .locator(".discovery-circle")
          .filter({
            has: page.getByRole("heading", {
              name: "Builders & Dreamers",
              exact: true,
            }),
          })
          .getByRole("button", { name: "Join Circle", exact: true });
        await join.click();
        await page
          .getByRole("dialog")
          .getByRole("button", { name: "Confirm demo membership", exact: true })
          .click();
        assert.equal(
          await page
            .locator(".discovery-circle")
            .filter({
              has: page.getByRole("heading", {
                name: "Builders & Dreamers",
                exact: true,
              }),
            })
            .locator(".circle-join")
            .getAttribute("aria-pressed"),
          "true",
        );
        await page.locator('.topbar a[aria-label="Messages"]').click();
        await page
          .getByText("No mutual conversations yet.", { exact: true })
          .waitFor();
      }
      await navigate(page, origin + "/explore?q=zzzz-no-results-unique");
      await page
        .getByRole("heading", {
          name: "A little more room to explore",
          exact: true,
        })
        .waitFor();
      await page
        .getByRole("button", { name: "Explore all possibilities", exact: true })
        .click();
      await page.waitForURL(origin + "/explore");
      assert.equal(
        await page
          .getByRole("group", { name: "Discovery categories" })
          .getByRole("button", { name: "All", exact: true })
          .getAttribute("aria-pressed"),
        "true",
      );
      assert((await dimensions(page)).documentWidth <= width + 1);
      assert.deepEqual(errors, []);
      assert(scans.every((s) => !s.violations.length));
      results.push({
        engine,
        theme,
        width,
        height,
        exploreMetrics,
        publicMetrics,
        ownMetrics,
        scans,
        errors,
        status: "PASS",
      });
      console.log("PASS UI04", engine, theme, width);
      await context.close();
    }
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  currentPage = page;
  await navigate(page, origin + "/explore");
  const motionCard = page.locator('.person-card[data-person-id="maker-1"]');
  await motionCard
    .getByRole("button", { name: "Connect", exact: true })
    .click();
  const motionDialog = page.getByRole("dialog");
  const bounds = await motionDialog.boundingBox();
  assert(bounds.x >= 0 && bounds.x + bounds.width <= 391);
  await motionDialog
    .getByRole("button", { name: "Close dialog", exact: true })
    .click();
  for (const [route, color] of [
    ["ananyacreates", "coral"],
    ["kabir.builds", "green"],
    ["meerawanders", "violet"],
  ]) {
    await navigate(page, origin + "/profile/" + route);
    await page.getByRole("heading", { level: 1 }).first().waitFor();
    assert(
      await page
        .locator(".identity-cover")
        .evaluate((el, c) => el.classList.contains("cover-" + c), color),
    );
  }
  await page.getByRole("tab", { name: "Milestones", exact: true }).click();
  assert.equal(
    await page
      .getByRole("tabpanel", { name: "Milestones", exact: true })
      .evaluate((el) => getComputedStyle(el).animationName),
    "identity-reveal",
  );
  await context.close();
} catch (error) {
  if (currentPage && !currentPage.isClosed()) {
    console.log("Failure URL", currentPage.url());
    await currentPage.screenshot({ path: out + "/failure.png" });
  }
  throw error;
} finally {
  await browser.close();
  fs.writeFileSync(
    `${out}/ui04.json`,
    JSON.stringify({ engine, results }, null, 2) + "\n",
  );
}
assert.equal(results.length, 14);
