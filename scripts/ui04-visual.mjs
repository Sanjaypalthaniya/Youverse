import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
process.env.PLAYWRIGHT_BROWSERS_PATH = path.resolve(".tools/browsers");
const require = createRequire(path.resolve(".tools/qa/package.json"));
const { chromium } = require("playwright");
const phase = process.env.QA_PHASE || "after",
  origin = process.env.QA_ORIGIN || "http://localhost:3113",
  out = `docs/qa/ui04/${phase}`;
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const results = [];
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
      const prefix = `${width}-${theme}`;
      const routes = [
        ["explore", "/explore"],
        ["own-profile", "/profile"],
        ...([390, 1440].includes(width)
          ? [
              ["search", "/explore?q=Creativity"],
              ["public-profile", "/profile/ananyacreates"],
            ]
          : []),
      ];
      for (const [name, route] of routes) {
        await page.goto(origin + route);
        await page.getByRole("heading", { level: 1 }).first().waitFor();
        await page.evaluate(() => document.fonts.ready);
        await page.screenshot({ path: `${out}/${prefix}-${name}.png` });
        if ([390, 1440].includes(width) && name === "explore") {
          await reveal(page.locator(".discovery-section").first());
          await page.screenshot({
            path: `${out}/${prefix}-explore-content.png`,
          });
        }
        if ([390, 1440].includes(width) && name === "own-profile") {
          if (phase === "after") {
            await reveal(page.locator(".identity-two-column"));
            await page.screenshot({
              path: out + "/" + prefix + "-identity-overview.png",
            });
          }
          await reveal(
            phase === "after"
              ? page.locator(".identity-highlights").locator("xpath=..")
              : page.locator(".identity-highlights"),
          );
          await page.screenshot({
            path: `${out}/${prefix}-identity-highlights.png`,
          });
          await page
            .getByRole("tab", { name: "Milestones", exact: true })
            .click();
          await reveal(page.locator(".identity-tabs"));
          await page.screenshot({ path: `${out}/${prefix}-milestones.png` });
        }
        if ([390, 1440].includes(width) && name === "search") {
          await page
            .getByRole("group", { name: "Discovery categories" })
            .getByRole("button", { name: "People", exact: true })
            .click();
          await page.screenshot({
            path: `${out}/${prefix}-people-results.png`,
          });
          await page.goto(origin + "/explore?q=zzzz-no-results-unique");
          await page
            .getByRole("heading", {
              name: "A little more room to explore",
              exact: true,
            })
            .waitFor();
          await page.screenshot({ path: `${out}/${prefix}-empty-search.png` });
        }
      }
      assert.deepEqual(errors, []);
      results.push({
        width,
        height,
        theme,
        routes: routes.map((r) => r[1]),
        errors,
      });
      console.log(phase, prefix);
      await context.close();
    }
} finally {
  await browser.close();
  fs.writeFileSync(
    `${out}/frames.json`,
    JSON.stringify(results, null, 2) + "\n",
  );
}
assert.equal(results.length, 14);
