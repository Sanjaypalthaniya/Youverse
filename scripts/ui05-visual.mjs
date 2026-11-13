import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
process.env.PLAYWRIGHT_BROWSERS_PATH = path.resolve(".tools/browsers");
const require = createRequire(path.resolve(".tools/qa/package.json"));
const { chromium } = require("playwright");
const phase = process.env.QA_PHASE || "after",
  origin = process.env.QA_ORIGIN || "http://localhost:3113",
  out = `docs/qa/ui05/${phase}`;
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const frames = [];
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
        ...(width <= 430 ? { isMobile: true } : {}),
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
      async function capture(name) {
        await page.screenshot({ path: `${out}/${width}-${theme}-${name}.png` });
      }
      const routes = [
        ["projects", "/projects"],
        ["circles", "/circles"],
        ["connect", "/connect"],
        ["inbox", "/messages"],
      ];
      if ([390, 1440].includes(width))
        routes.push(
          ["project-detail", "/projects/the-little-library"],
          ["circle-detail", "/circles/builders-and-dreamers"],
          [
            "discussion",
            "/circles/the-creative-corner/discussion/creative-noticing",
          ],
          ["locked-chat", "/messages/kabir.builds"],
        );
      for (const [name, route] of routes) {
        await page.goto(origin + route);
        await page.getByRole("heading", { level: 1 }).first().waitFor();
        await page.evaluate(() => document.fonts.ready);
        await capture(name);
        if (phase === "after" && [390, 1440].includes(width)) {
          const sections =
            name === "project-detail"
              ? [
                  ["project-roadmap", ".project-roadmap"],
                  ["project-field-notes", ".project-activity"],
                  ["project-collaboration", ".project-collaboration"],
                ]
              : name === "projects"
                ? [["project-cards", ".project-grid"]]
                : name === "circles"
                  ? [["circle-cards", ".circle-grid"]]
                  : name === "discussion"
                    ? [["replies", ".circle-replies"]]
                    : [];
          for (const [label, selector] of sections) {
            const target = page.locator(selector).first();
            if (await target.count()) {
              await target.evaluate((e) =>
                scrollTo({
                  top: e.getBoundingClientRect().top + scrollY - 80,
                  behavior: "instant",
                }),
              );
              await capture(label);
            }
          }
        }
      }
      if ([390, 1440].includes(width)) {
        await page.goto(origin + "/connect");
        await page.getByRole("switch").click();
        await page.locator(".connect-maker-card").first().waitFor();
        await capture("connect-discover");
        await page
          .getByRole("button", { name: "Incoming", exact: true })
          .click();
        await page.locator(".connect-request-card").first().waitFor();
        await capture("connect-incoming");
        await page
          .locator(".connect-request-card")
          .first()
          .getByRole("button", { name: "Accept demo request", exact: true })
          .click();
        const dialog = page.getByRole("dialog");
        await dialog
          .getByRole("button", { name: "See mutual matches" })
          .click();
        await page
          .getByRole("link", { name: "Message your match", exact: true })
          .click();
        for (const text of [
          "Hello! I loved your perspective on making room for creative work.",
          "A little idea for our next creative conversation.",
        ]) {
          await page.getByLabel("Your message").fill(text);
          await page
            .getByRole("button", { name: "Send locally", exact: true })
            .click();
        }
        await capture("chat");
        await page
          .getByLabel("Your message")
          .fill("A thoughtful hello, still in draft.");
        await page.getByLabel("Your message").focus();
        await capture("chat-composer");
      }
      assert.deepEqual(errors, []);
      frames.push({ width, height, theme, errors });
      await context.close();
      console.log("CAPTURE", phase, width, theme);
    }
} finally {
  await browser.close();
  fs.writeFileSync(
    `${out}/frames.json`,
    JSON.stringify(frames, null, 2) + "\n",
  );
}
