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
const out = process.env.QA_OUTPUT || `.tools/ui03/${engine}`;
fs.mkdirSync(out, { recursive: true });
const browser = await playwright[engine].launch({
  headless: true,
  ...(engine === "chromium" ? { channel: "chromium" } : {}),
});
const results = [];
let currentPage;
try {
  for (const theme of ["light", "dark"])
    for (const [width, height] of [
      [320, 568],
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
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => {
        if (m.type() === "error") errors.push(m.text());
      });
      await page.goto(origin);
      await page.getByRole("tab", { name: "For You", exact: true }).waitFor();
      await page.waitForFunction(
        (t) => document.documentElement.dataset.theme === t,
        theme,
      );
      const metrics = await page.evaluate(() => ({
        width: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        headerHeight: document.querySelector(".topbar").getBoundingClientRect()
          .height,
        feedWidth: document
          .querySelector(".premium-post")
          .getBoundingClientRect().width,
        sidebarWidth: document.querySelector(".sidebar").getBoundingClientRect()
          .width,
        viewport: document.querySelector("meta[name=viewport]").content,
        scrollBehavior: getComputedStyle(document.documentElement)
          .scrollBehavior,
      }));
      assert(metrics.documentWidth <= width + 1);
      assert(metrics.viewport.includes("viewport-fit=cover"));
      assert.equal(metrics.scrollBehavior, "auto");
      if (width === 1440)
        assert(
          Math.abs(metrics.feedWidth - 640) <= 1,
          "Desktop feed must remain 640px",
        );
      if (width === 768) assert.equal(metrics.sidebarWidth, 76);
      if (width === 1024) assert.equal(metrics.sidebarWidth, 200);
      const violations = [];
      if (width <= 430) {
        assert(metrics.headerHeight <= 58);
        assert(metrics.feedWidth >= width - 2);
        const bottom = page.getByRole("navigation", {
          name: "Mobile navigation",
        });
        assert.equal(
          await bottom.locator("[aria-current=page]").getAttribute("href"),
          "/",
        );
        for (const control of [
          page.getByRole("button", { name: "Toggle navigation", exact: true }),
          page.getByRole("button", { name: "Toggle search", exact: true }),
          page.locator('.topbar a[aria-label="Notifications"]'),
          page.locator('.topbar a[aria-label="Messages"]'),
          ...(await bottom.locator("a").all()),
        ]) {
          const box = await control.boundingBox();
          assert(box && box.width >= 43.99 && box.height >= 43.99);
        }
        const toggleSearch = page.getByRole("button", {
          name: "Toggle search",
          exact: true,
        });
        await toggleSearch.click();
        await page.getByRole("textbox", { name: "Search YOUVERSE" }).waitFor();
        assert(
          await page
            .getByRole("textbox", { name: "Search YOUVERSE" })
            .evaluate((el) => el === document.activeElement),
        );
        await page.keyboard.press("Escape");
        assert.equal(await toggleSearch.getAttribute("aria-expanded"), "false");
        assert(
          await toggleSearch.evaluate((el) => el === document.activeElement),
        );
        await page.evaluate(() => scrollTo({ top: 600, behavior: "instant" }));
        assert(await page.evaluate(() => scrollY > 300));
        const header = await page.locator(".topbar").boundingBox();
        assert(Math.abs(header.y) <= 1);
        const navBox = await bottom.boundingBox();
        assert(navBox.y + navBox.height <= height + 1);
        const beforeScroll = await page.evaluate(() => scrollY);
        const trigger = page.getByRole("button", {
          name: "Toggle navigation",
          exact: true,
        });
        const menuBox = await trigger.boundingBox();
        await page.touchscreen.tap(
          menuBox.x + menuBox.width / 2,
          menuBox.y + menuBox.height / 2,
        );
        const drawer = page.getByRole("dialog", {
          name: "Navigation",
          exact: true,
        });
        await drawer.waitFor();
        assert.equal(
          await page.evaluate(() => document.body.style.overflow),
          "hidden",
        );
        assert(await page.locator(".main-shell").evaluate((el) => el.inert));
        assert(
          await drawer
            .getByRole("button", { name: "Close navigation", exact: true })
            .evaluate((el) => el === document.activeElement),
        );
        const links = drawer.locator("a[href],button");
        await links.last().focus();
        await page.keyboard.press("Tab");
        assert(
          await links.first().evaluate((el) => el === document.activeElement),
        );
        await page.keyboard.press("Shift+Tab");
        assert(
          await links.last().evaluate((el) => el === document.activeElement),
        );
        await drawer.locator(".signed-user").scrollIntoViewIfNeeded();
        assert(
          (await drawer.evaluate((el) => el.scrollTop > 0)) || height >= 900,
        );
        if (width === 390) {
          const result = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze();
          violations.push(
            ...result.violations.map((v) => ({
              screen: "drawer",
              id: v.id,
              nodes: v.nodes.map((n) => n.target),
            })),
          );
        }
        await page.keyboard.press("Escape");
        assert.equal(await trigger.getAttribute("aria-expanded"), "false");
        assert(await trigger.evaluate((el) => el === document.activeElement));
        assert.equal(
          await page.evaluate(() => document.body.style.overflow),
          "",
        );
        assert.equal(await page.evaluate(() => scrollY), beforeScroll);
        await trigger.click();
        await page
          .locator(".nav-scrim")
          .click({ position: { x: width - 10, y: 100 } });
        assert.equal(await trigger.getAttribute("aria-expanded"), "false");
        // Drawer navigation must close it and keep provider/session state alive.
        const like = page
          .locator(".premium-post")
          .first()
          .getByRole("button", { name: "Like reflection" });
        await like.click();
        await trigger.click();
        await page
          .getByRole("dialog", { name: "Navigation" })
          .getByRole("link", { name: "Projects", exact: true })
          .click();
        await page.waitForURL(origin + "/projects");
        assert.equal(await page.locator(".sidebar.is-open").count(), 0);
        await page.goBack();
        await page.getByRole("tab", { name: "For You", exact: true }).waitFor();
        assert.equal(
          await page
            .locator(".premium-post")
            .first()
            .getByRole("button", { name: "Like reflection" })
            .getAttribute("aria-pressed"),
          "true",
        );
        await page.goForward();
        await page.waitForURL(origin + "/projects");
        await page.locator('.bottom-nav a[href="/"]').click();
        await page.getByRole("tab", { name: "For You", exact: true }).waitFor();
        // Search remains available, with native history and the existing Explore query.
        await page
          .getByRole("button", { name: "Toggle search", exact: true })
          .click();
        await page
          .getByRole("textbox", { name: "Search YOUVERSE" })
          .fill("Creativity");
        await page
          .getByRole("textbox", { name: "Search YOUVERSE" })
          .press("Enter");
        await page.waitForURL(/\/explore\?q=Creativity/);
        await page.locator('.bottom-nav a[href="/"]').click();
        await page.getByRole("tab", { name: "For You", exact: true }).waitFor();
        // Crossing the breakpoint must release the modal and never reopen it later.
        await page
          .getByRole("button", { name: "Toggle navigation", exact: true })
          .click();
        await page.setViewportSize({ width: 1024, height: 900 });
        await page.waitForFunction(() => document.body.style.overflow === "");
        assert.equal(
          await page.getByRole("dialog", { name: "Navigation" }).count(),
          0,
        );
        await page.setViewportSize({ width, height });
        assert.equal(await page.locator(".sidebar.is-open").count(), 0);
      } else {
        assert.equal(await page.locator(".bottom-nav:visible").count(), 0);
        assert.equal(
          await page
            .locator(".sidebar nav [aria-current=page]")
            .getAttribute("href"),
          "/",
        );
        if (width === 768) {
          for (const link of await page.locator(".sidebar nav a").all()) {
            assert(await link.getAttribute("aria-label"));
            const box = await link.boundingBox();
            assert(box.width >= 43.99 && box.height >= 43.99);
          }
        }
      }
      if (width === 390 || width === 768 || width === 1440) {
        const result = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        violations.push(
          ...result.violations.map((v) => ({
            screen: "shell",
            id: v.id,
            nodes: v.nodes.map((n) => n.target),
          })),
        );
      }
      assert.deepEqual(violations, []);
      assert.deepEqual(errors, []);
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      );
      results.push({
        engine,
        theme,
        width,
        height,
        metrics,
        violations,
        errors,
        status: "PASS",
      });
      console.log("PASS UI03", engine, theme, width);
      await context.close();
    }
  // Nested routes share one active-section mapping.
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  const activeRoutes = [
    ["/post/1", "/"],
    ["/profile/edit", "/profile"],
    ["/profile/ananyacreates", "/profile"],
    ["/projects/small-beginnings", "/projects"],
    ["/circles/the-creative-corner/discussion/creative-noticing", "/circles"],
    ["/messages/ananyacreates", "/messages"],
    ["/settings/appearance", "/settings"],
  ];
  for (const [route, href] of activeRoutes) {
    await page.goto(origin + route);
    await page.getByRole("heading", { level: 1 }).first().waitFor();
    assert.equal(
      await page.locator(".sidebar [aria-current=page]").getAttribute("href"),
      href,
    );
  }
  await context.close();
  // Keep motion subtle when enabled.
  const motion = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "no-preference",
  });
  const moving = await motion.newPage();
  await moving.goto(origin);
  assert.equal(
    await moving.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
    "smooth",
  );
  await moving
    .getByRole("button", { name: "Toggle navigation", exact: true })
    .click();
  assert.equal(
    await moving
      .locator(".sidebar")
      .evaluate((el) =>
        getComputedStyle(el).transitionDuration.split(",")[0].trim(),
      ),
    "0.22s",
  );
  await motion.close();
} catch (error) {
  if (currentPage && !currentPage.isClosed()) {
    console.log(
      "UI03 failure state",
      await currentPage.evaluate(() => ({
        url: location.href,
        scrollY,
        mainInert: document.querySelector(".main-shell")?.inert,
        menu: document.querySelector(".sidebar")?.className,
        search: document
          .querySelector(".mobile-search")
          ?.getBoundingClientRect()
          .toJSON(),
        header: document
          .querySelector(".topbar")
          ?.getBoundingClientRect()
          .toJSON(),
      })),
    );
    await currentPage.screenshot({ path: out + "/failure.png" });
  }
  throw error;
} finally {
  await browser.close();
  fs.writeFileSync(
    `${out}/ui03.json`,
    JSON.stringify({ engine, results }, null, 2) + "\n",
  );
}
assert.equal(results.length, 14);
