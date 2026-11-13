import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
process.env.PLAYWRIGHT_BROWSERS_PATH = path.resolve(".tools/browsers");
const require = createRequire(path.resolve(".tools/qa/package.json"));
const { chromium, expect } = require("playwright/test");
const origin = process.env.QA_ORIGIN || "http://localhost:3113",
  out = process.env.QA_OUTPUT || ".tools/ui05/touch";
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: "chromium" }),
  results = [];
try {
  for (const theme of ["light", "dark"]) {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      reducedMotion: "reduce",
    });
    await context.addInitScript(
      (t) => localStorage.setItem("youverse-theme", t),
      theme,
    );
    const page = await context.newPage();
    page.setDefaultTimeout(15000);
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(origin + "/projects");
    await page.waitForLoadState("networkidle");
    const star = page.locator(".project-star").first();
    await star.tap();
    await expect(star).toHaveAttribute("aria-pressed", "true");
    await page.goto(origin + "/circles/builders-and-dreamers");
    await page.waitForLoadState("networkidle");
    await page
      .getByRole("button", { name: "Join Circle", exact: true })
      .first()
      .tap();
    await page
      .getByRole("dialog")
      .getByRole("button", { name: "Confirm demo membership" })
      .tap();
    await page.locator('.topbar a[href="/messages"]').tap();
    await expect(
      page.getByText("No mutual conversations yet.", { exact: true }),
    ).toBeVisible();
    await page.locator('.bottom-nav a[href="/connect"]').tap();
    await page.getByRole("button", { name: "Incoming", exact: true }).tap();
    await page
      .locator(".connect-request-card")
      .first()
      .getByRole("button", { name: "Accept demo request" })
      .tap();
    await page
      .getByRole("dialog")
      .getByRole("button", { name: "See mutual matches" })
      .tap();
    await page
      .getByRole("link", { name: "Message your match", exact: true })
      .tap();
    await page.getByLabel("Your message").fill("A local touch-screen hello.");
    await page.getByRole("button", { name: "Send locally", exact: true }).tap();
    await expect(page.locator(".message-bubble")).toHaveCount(1);
    const scrollBefore = await page.evaluate(() => scrollY);
    await page
      .getByLabel("Your message")
      .fill("A long but respectful thought. ".repeat(40));
    await page.getByRole("button", { name: "Send locally", exact: true }).tap();
    await expect(page.locator(".message-bubble")).toHaveCount(2);
    const history = await page
      .locator(".message-history")
      .evaluate((e) => ({
        height: e.clientHeight,
        scrollHeight: e.scrollHeight,
        scrollTop: e.scrollTop,
      }));
    assert(history.scrollHeight > history.height);
    assert(history.scrollTop > 0);
    const documentScroll = await page.evaluate(() => scrollY);
    assert(
      Math.abs(documentScroll - scrollBefore) < 2,
      "Sending should scroll history without jumping the document",
    );
    await page.getByRole("button", { name: "Unmatch", exact: true }).tap();
    await page
      .getByRole("dialog")
      .getByRole("button", { name: "Confirm unmatch" })
      .tap();
    await expect(page.getByLabel("Your message")).toHaveCount(0);
    await expect(page.locator(".message-bubble")).toHaveCount(2);
    assert.deepEqual(errors, []);
    results.push({ theme, status: "PASS", history, documentScroll, errors });
    console.log("PASS UI05 physical-touch emulation", theme);
    await context.close();
  }
} finally {
  await browser.close();
  fs.writeFileSync(
    `${out}/touch.json`,
    JSON.stringify({ results }, null, 2) + "\n",
  );
}
assert.equal(results.length, 2);
