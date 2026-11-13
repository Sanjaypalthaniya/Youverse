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
  out = process.env.QA_OUTPUT || `.tools/ui05/${engine}`;
fs.mkdirSync(out, { recursive: true });
const browser = await pw[engine].launch({
  headless: true,
  ...(engine === "chromium" ? { channel: "chromium" } : {}),
});
const results = [];
let current;
let motion = null;
async function goto(page, route) {
  if (engine === "webkit") {
    // Next schedules visible-link prefetch after rendering; let it start before waiting.
    await page.waitForTimeout(500);
    await page.waitForLoadState("networkidle");
  }
  await page.goto(origin + route);
  await page.getByRole("heading", { level: 1 }).first().waitFor();
  if (engine === "webkit") await page.waitForLoadState("networkidle");
}
async function audit(page, name, scans) {
  const r = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  const violations = r.violations.map((v) => ({
    id: v.id,
    nodes: v.nodes.map((n) => ({
      target: n.target,
      summary: n.failureSummary,
    })),
  }));
  scans.push({ name, violations });
  assert.deepEqual(violations, [], name);
}
async function geometry(page, selectors) {
  const metrics = await page.evaluate(
    (selectors) => ({
      width: innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      targets: selectors.flatMap((s) =>
        [...document.querySelectorAll(s)]
          .filter((e) => e.getClientRects().length)
          .map((e) => ({
            selector: s,
            width: e.getBoundingClientRect().width,
            height: e.getBoundingClientRect().height,
          })),
      ),
    }),
    selectors,
  );
  assert(metrics.documentWidth <= metrics.width + 1, JSON.stringify(metrics));
  for (const t of metrics.targets)
    assert(t.width >= 43.99 && t.height >= 43.99, JSON.stringify(t));
  return metrics;
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
        ...(engine !== "firefox" && width <= 430 ? { isMobile: true } : {}),
        reducedMotion: "reduce",
      });
      await context.addInitScript(
        (t) => localStorage.setItem("youverse-theme", t),
        theme,
      );
      const page = await context.newPage();
      current = page;
      page.setDefaultTimeout(15000);
      const errors = [],
        scans = [],
        metrics = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => {
        if (m.type() === "error") errors.push(m.text());
      });
      for (const route of ["/projects", "/circles", "/connect", "/messages"]) {
        await goto(page, route);
        metrics.push({
          route,
          ...(await geometry(page, [
            ".feature-screen select",
            ".project-star",
            ".circle-join",
            ".connect-toggle",
            ".connect-intention",
            ".message-list-tabs button",
          ])),
        });
        if ([390, 1440].includes(width)) await audit(page, route, scans);
      }
      await goto(page, "/projects/the-little-library");
      await geometry(page, [".project-star", ".project-detail-actions>button"]);
      if (width === 390) await audit(page, "project-detail", scans);
      const star = page.getByRole("button", {
        name: "Star The Little Library",
        exact: true,
      });
      await star.click();
      assert.equal(
        await page
          .getByRole("button", {
            name: "Unstar The Little Library",
            exact: true,
          })
          .getAttribute("aria-pressed"),
        "true",
      );
      await page
        .getByRole("button", { name: "Collaborate on this project" })
        .click();
      const dialog = page.getByRole("dialog");
      await dialog
        .getByLabel("A short introduction")
        .fill(
          "A careful introduction through shared creativity and small beginnings.",
        );
      await dialog
        .getByRole("button", { name: "Preview introduction" })
        .click();
      assert.equal(
        await dialog
          .getByRole("button", { name: "Submit demo request" })
          .isEnabled(),
        true,
      );
      await page.keyboard.press("Escape");
      assert.equal(
        await page
          .getByRole("button", { name: "Collaborate on this project" })
          .evaluate((e) => e === document.activeElement),
        true,
      );
      await goto(page, "/circles/builders-and-dreamers");
      await page
        .getByRole("button", { name: "Join Circle", exact: true })
        .first()
        .click();
      if (width === 390) await audit(page, "membership-dialog", scans);
      await page
        .getByRole("dialog")
        .getByRole("button", { name: "Confirm demo membership" })
        .click();
      await page
        .getByRole("link", { name: "Start a discussion", exact: true })
        .waitFor();
      await goto(page, "/messages/kabir.builds");
      assert.equal(await page.getByLabel("Your message").count(), 0);
      if (width === 390) await audit(page, "locked-conversation", scans);
      await goto(page, "/connect");
      await page.getByRole("switch").click();
      await page.locator(".connect-maker-card").first().waitFor();
      await geometry(page, [
        ".feature-screen .connect-person-actions .yv-button",
        ".connect-maker-card .follow-button",
      ]);
      if (width === 390) await audit(page, "enabled-discovery", scans);
      const tray = page.locator(".connect-intention-grid");
      assert(await tray.evaluate((e) => e.scrollWidth >= e.clientWidth));
      await page.getByRole("button", { name: "Incoming", exact: true }).click();
      await page
        .locator(".connect-request-card")
        .first()
        .getByRole("button", { name: "Accept demo request" })
        .click();
      await page
        .getByRole("dialog")
        .getByRole("button", { name: "See mutual matches" })
        .click();
      await page
        .getByRole("link", { name: "Message your match", exact: true })
        .click();
      await page.getByLabel("Your message").fill("A respectful local hello.");
      await page
        .getByRole("button", { name: "Send locally", exact: true })
        .click();
      assert.equal(await page.locator(".message-bubble").count(), 1);
      await geometry(page, [
        ".message-toolbar .yv-button",
        ".mobile-inbox-back",
      ]);
      const bubble = await page
        .locator(".message-bubble p")
        .evaluate((e) => parseFloat(getComputedStyle(e).fontSize));
      assert(bubble >= 14 && bubble <= 16);
      assert.equal(
        await page
          .locator(".message-bubble")
          .evaluate((e) => getComputedStyle(e).animationName),
        "none",
      );
      await page.getByLabel("Your message").fill("x".repeat(1501));
      assert(
        await page
          .getByRole("button", { name: "Send locally", exact: true })
          .isDisabled(),
      );
      await page.getByLabel("Your message").fill("");
      await page
        .getByRole("button", { name: "Attachment preview", exact: true })
        .click();
      await page.keyboard.press("Escape");
      assert.equal(
        await page
          .getByRole("button", { name: "Attachment preview", exact: true })
          .evaluate((e) => e === document.activeElement),
        true,
      );
      if ([390, 1440].includes(width)) await audit(page, "mutual-chat", scans);
      if (width === 390) {
        await page.setViewportSize({ width, height: 500 });
        await page.getByLabel("Your message").focus();
        await geometry(page, [".message-toolbar .yv-button"]);
        await page.setViewportSize({ width, height });
      }
      await page.getByRole("button", { name: "Unmatch", exact: true }).click();
      await page
        .getByRole("dialog")
        .getByRole("button", { name: "Confirm unmatch" })
        .click();
      assert.equal(await page.getByLabel("Your message").count(), 0);
      assert.equal(await page.locator(".message-bubble").count(), 1);
      assert.deepEqual(errors, []);
      results.push({
        engine,
        theme,
        width,
        height,
        status: "PASS",
        metrics,
        scans,
        errors,
      });
      await context.close();
      console.log("PASS UI05", engine, theme, width);
    }
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  current = page;
  await goto(page, "/projects");
  await page.waitForLoadState("networkidle");
  await page.locator(".project-star").first().click();
  await page.waitForFunction(
    () =>
      document.querySelector(".project-star").getAttribute("aria-pressed") ===
      "true",
  );
  assert.equal(
    await page
      .locator(".project-star svg")
      .first()
      .evaluate((e) => getComputedStyle(e).animationName),
    "project-star-pop",
  );
  motion = { status: "PASS", starAnimation: "project-star-pop" };
  console.log("PASS UI05 motion", engine);
  await context.close();
} catch (e) {
  if (current && !current.isClosed())
    await current.screenshot({ path: `${out}/failure.png` });
  throw e;
} finally {
  await browser.close();
  fs.writeFileSync(
    `${out}/ui05.json`,
    JSON.stringify({ engine, results, motion }, null, 2) + "\n",
  );
}
assert.equal(results.length, 14);
