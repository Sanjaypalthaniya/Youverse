import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
process.env.PLAYWRIGHT_BROWSERS_PATH = path.resolve(".tools/browsers");
const require = createRequire(path.resolve(".tools/qa/package.json"));
const { chromium } = require("playwright");
const phase = process.env.QA_PHASE || "after";
const origin = process.env.QA_ORIGIN || "http://localhost:3113";
const out = `docs/qa/ui02/${phase}`;
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const frames = [];
async function reveal(locator) {
  await locator.evaluate((el) =>
    scrollTo({
      top:
        el.getBoundingClientRect().top +
        scrollY -
        document.querySelector(".topbar").getBoundingClientRect().height -
        8,
      behavior: "instant",
    }),
  );
}
try {
  for (const theme of ["light", "dark"])
    for (const [width, height] of [
      [1440, 1000],
      [390, 844],
      [320, 700],
      [430, 932],
    ]) {
      const context = await browser.newContext({
        viewport: { width, height },
        hasTouch: width < 700,
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
      await reveal(page.locator(".premium-post").first());
      await page.screenshot({ path: `${out}/${prefix}-post.png` });
      for (const kind of [
        "Question",
        "Milestone",
        "Text reflection",
        "Project update",
      ]) {
        await reveal(
          page.locator(`.premium-post[data-kind="${kind}"]`).first(),
        );
        if (width === 390)
          await page.screenshot({
            path: `${out}/${prefix}-${kind.toLowerCase().replaceAll(" ", "-")}.png`,
          });
      }
      await page.locator(".stories button").first().click();
      await page.getByRole("dialog", { name: "Story viewer" }).waitFor();
      await page.screenshot({ path: `${out}/${prefix}-story.png` });
      await page.getByRole("button", { name: "Next", exact: true }).click();
      await page.screenshot({ path: `${out}/${prefix}-story-next.png` });
      await page.keyboard.press("Escape");
      await page.goto(origin + "/post/1");
      await page.getByRole("heading", { level: 1 }).first().waitFor();
      if (width === 1440 || width === 390)
        await page.screenshot({
          path: `${out}/${prefix}-detail.png`,
          fullPage: true,
        });
      assert.equal(errors.length, 0);
      frames.push({ width, height, theme, errors });
      await context.close();
      console.log(phase, prefix);
    }
} finally {
  await browser.close();
  fs.writeFileSync(
    `${out}/frames.json`,
    JSON.stringify(frames, null, 2) + "\n",
  );
}
assert.equal(frames.length, 8);
