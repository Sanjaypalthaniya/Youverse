import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
process.env.PLAYWRIGHT_BROWSERS_PATH = path.resolve(".tools/browsers");
const require = createRequire(path.resolve(".tools/qa/package.json"));
const { chromium } = require("playwright");
const origin = process.env.QA_ORIGIN || "http://localhost:3113";
const phase = process.env.QA_PHASE || "after";
const out = `docs/qa/ui03/${phase}`;
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const results = [];
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
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(origin);
      await page.getByRole("tab", { name: "For You", exact: true }).waitFor();
      await page.evaluate(() => document.fonts.ready);
      const prefix = `${width}-${theme}`;
      await page.screenshot({ path: `${out}/${prefix}-feed.png` });
      if (width <= 430) {
        await page
          .getByRole("button", { name: "Toggle navigation", exact: true })
          .click();
        await page.screenshot({ path: `${out}/${prefix}-drawer.png` });
        await page
          .getByRole("button", {
            name: phase === "before" ? "Toggle navigation" : "Close navigation",
            exact: true,
          })
          .click();
      }
      if (phase === "after" && width === 390) {
        await page
          .getByRole("button", { name: "Toggle search", exact: true })
          .click();
        await page.screenshot({ path: out + "/" + prefix + "-search.png" });
        await page.keyboard.press("Escape");
        await page.locator(".bottom-nav a").first().focus();
        await page.screenshot({ path: out + "/" + prefix + "-keyboard.png" });
      }
      if (phase === "after" && width >= 768) {
        await page.locator(".sidebar nav a").first().focus();
        await page.screenshot({ path: out + "/" + prefix + "-keyboard.png" });
      }
      await page.evaluate(() => scrollTo({ top: 650, behavior: "instant" }));
      await page.screenshot({ path: `${out}/${prefix}-scrolled.png` });
      results.push({ width, height, theme, errors });
      assert.deepEqual(errors, []);
      await context.close();
      console.log(phase, prefix);
    }
} finally {
  await browser.close();
  fs.writeFileSync(
    `${out}/frames.json`,
    JSON.stringify(results, null, 2) + "\n",
  );
}
assert.equal(results.length, 14);
