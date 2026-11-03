# W12.1 verification - 2026-11-02 to 2026-11-03

> Automated verification completed on 2026-11-03. Manual sign-off remains OPEN; see the verdict and checklist below.


## Verdict

**B. AUTOMATED FRONTEND QA PASS — MANUAL SIGN-OFF OPEN.** The executed Windows Chromium, Firefox and WebKit regression scenarios pass after stabilization. Physical iOS/Android, manual assistive-technology use, native browser zoom and exhaustive human visual review remain open. This is not complete accessibility certification, final manual frontend approval or production/backend readiness. W13 and mobile development have not started.

## Audit and environment

Work began on November 2, paused at the user's request, and resumed on November 3. Started from clean `master` HEAD `e8bbd7c6230d6bc9a3e9475419fb2aabf9fcad04`. Origin was already `https://github.com/Sanjaypalthaniya/Youverse.git`; fetched and confirmed the local branch matched remote history before editing. W01–W12 history and QA evidence are preserved. Reviewed prior reports, roadmap, scripts, navigation, dialogs, consent boundaries and source. No applicable AGENTS.md was found. Used the Sites local workflow without hosting or publication.

Host: Windows 10 Pro 10.0.19045 x64. Reused isolated Playwright **1.64.1** and axe-core/@axe-core/playwright **4.14.0** under ignored `.tools/qa`. Browser binaries remain ignored under `.tools/browsers`:

| Engine | Actual version | Scope |
|---|---|---|
| Chromium | 156.0.8078.4 | Headless Windows Chromium |
| Firefox | 157.0 | Headless Windows Firefox |
| WebKit | 27.2 | Playwright Windows WebKit, not physical Safari/iOS |

Firefox/WebKit installations succeeded without adding an application dependency or changing its lockfile. Firefox does not support Playwright `isMobile`; its touch cases retain `hasTouch` and responsive viewports with a desktop user agent. None of these contexts is a physical phone or a real mobile keyboard.

Production build served on local port 3112 for browser runs. A separately owned temporary server on 3113 ran HTTP checks. PowerShell's policy was left intact; commands used `npm.cmd`. Shell operations required approved escalation because the sandbox setup-refresh error prevented process startup. Application execution does not require elevation.

## Reproduced defects and stabilization

| Finding | Evidence before fix | Change and regression |
|---|---|---|
| WebKit pointer activation did not consistently establish keyboard focus, affecting Escape and return focus | Four retained WebKit groups failed: Story restoration, dialog restoration, Dating settings dismissal and quota-composer dismissal; Chrome/Firefox retained groups passed | Shared activation tracker records the clicked control and focuses activated buttons. Existing dialog Escape/Tab behavior then receives keyboard events. All retained groups pass in all three engines |
| Closing an inner local-post editor lost focus outside the surviving profile-preview dialog | Newly executed nested-preview case reproduced in all three engines | Modal captures the prior control and enclosing dialog; if the removed trigger cannot regain focus, a remaining parent-dialog control receives it. Nested Escape, surviving focus trap and final restoration pass |
| Closed mobile sidebar links could receive focus offscreen | Hydrated Chromium at 320px focused the closed Home link at x=-214 | Hidden sidebar now uses `visibility:hidden` and disables pointer events while closed at the existing mobile breakpoint. Regression verifies closed links cannot receive focus and open menu links remain usable |

Changes are limited to `components/ui.jsx`, `app/layout.jsx` and `app/qa.scss`. Existing dialog scroll locking, native controls, focus trap and brand styles remain shared. No domain model, consent helper, quota, pricing or persistence rule changed.

Driver corrections are separate from application defects. Route heading counts initially sampled before rendering; drivers now wait for a visible semantic h1 and fail incorrect route/status/heading/overflow/accessibility/runtime outcomes. Hidden Next streaming markup is excluded through semantic locators. An intermediate Windows WebKit audit recorded 14 `_rsc` prefetch/access-control diagnostics around `/help`. Navigation cancellation during hard reloads was suspected; small settled-navigation and reload/button comparison probes did not reproduce the errors, so the exact browser-internal cause is not asserted. Those prior diagnostics are retained in the structured evidence. The final WebKit audit uses ordinary appearance buttons instead of hard theme reloads, client links where available, and allows pending navigation to settle before hard navigation. No production CORS/networking workaround or console suppression was added. Intermediate failures stay in ignored raw logs, not final passing evidence.

## Separate verification layers

| Layer | Final result and limits |
|---|---|
| `npm.cmd run lint` | PASS, including QA drivers |
| `npm.cmd test` | PASS, all 73 existing helper tests; none removed |
| `npm.cmd run build` | PASS, Next.js 16.4.3; 62 generated entries including framework/icon |
| Production HTTP | PASS, 99/99: 59 user pages, 11 queries, 21 expected 404s, seven honest local-unavailable responses, icon |
| Retained browser interactions | PASS, 14 groups per engine, 42/42 across three engines |
| Added browser regressions | PASS, five functional groups per engine, 15/15; three additional native-zoom capability probes executed but did not change zoom |
| Direct browser routes | PASS, 59 per engine, 177 route loads; HTTP 200 and one visible semantic h1 each |
| Main responsive matrix | PASS, 20 routes × seven viewports × two themes × three engines = 840 measurements, no document-level horizontal overflow |
| Additional viewport/input matrix | PASS, eight routes × seven viewports × two themes × three engines = 336 measurements; 288 use `hasTouch:true`, 48 use desktop input |
| CSS reflow equivalents | PASS, 12 routes × three factors × two themes × three engines = 216 measurements; distinct from native zoom |
| Automated accessibility | PASS, 64 route/dialog scans per engine, 192 total; zero violations under selected wcag2a/wcag2aa/wcag21aa tags |
| Runtime | Final monitored browser runs record no page/console errors or detected hydration/key warnings; extended runs record no failed requests |
| Visual inspection | Twelve captured frames reviewed; a limited frame review, not every scroll/state/device |
| Native browser zoom | NOT RUN successfully: headless Ctrl+= probes left viewport/DPR unchanged |
| Physical devices, actual IME and manual screen reader | NOT RUN; required manual gates remain OPEN |

Source tests/build, independent HTTP checks and most engine runs executed on November 2; the unchanged product source and corrected final WebKit audit were verified through the November 3 continuation. Product source checksums are included in the structured evidence.

Helper tests, HTTP responses, axe scans, viewport measurements and workflow groups are different evidence and are not combined into one pass count. Geometry checks cannot prove all elements, scroll positions or overlays are visually correct. Axe results do not establish complete accessibility or screen-reader usability.

### Executed workflows

The retained 14-group suite ran unchanged in scope for each engine: Feed Following/Saved/follow/like/comment/hide/history; local reflection/Story/Reel publication and search; identity highlights/milestones/featured work/save/cancel; local project creation, roadmap, field notes and deletion; collaboration submit/cancel/owner review/removal without DM access; Circle join/discussion/reply/reaction/edit/delete/leave; Connect OFF/ON, requests, mutual acceptance, rapid duplicate message attempts, read reminders/search, unmatch/block/history/unblock; independent Dating choices; Plus/Pro/Free switching, templates and downgrade controls; settings/onboarding/help/theme persistence; keyboard/dialog/mobile navigation; touch dialog bounds; visible Free exhaustion with no cancellation refund; negative privacy/filter/username/route states; India-midnight usage reset.

Additional regressions verify nested profile preview → local reflection editor → single-layer Escape and return focus; clicking dialog text before Escape; closed sidebar focus exclusion; CSS reflow and focused dialog controls; and a long unbroken local message with literal markup punctuation/emoji. Long-message cases safely render text, reduce the CSS viewport height from 568 to 320, send again, scan the composer and refresh to verify session reset/locked consent. That height change simulates available space only; it is not an actual OS virtual-keyboard test.

Plus 15/Pro 40 full exhaustion remains helper-tested. Browser cases verify visible limits/capabilities and Free exhaustion through normal UI actions. No other person's message, remote acceptance, delivered notification, moderation submission or payment was fabricated.

### Viewports, reflow and appearance

Tested CSS dimensions: **320×568, 360×800, 390×844, 430×932, 768×1024, 1024×768, 1440×900**, in light and dark. Separate contexts carry touch flags for the six mobile/tablet sizes; desktop 1440 cases are counted separately. System appearance and existing theme reload behavior are exercised by the retained suite.

Reflow equivalents start from 1280×960 at 100%, use 640×480 for 200%, and 320×240 for 400%. Measurements and selected Story-dialog focus/bounds assertions pass. These are CSS viewport reductions, not native browser zoom. Four Ctrl+= accelerators in each headless engine left `innerWidth`, `innerHeight` and DPR unchanged. The probe's PASS means it completed and recorded that limitation, not that zoom succeeded. Actual browser-UI 200%/400% zoom remains on the manual checklist.

### Accessibility and visual evidence

Each engine ran 24 primary route/theme scans, 38 extended route/dialog scans, and two new nested-preview/long-message scans. Keyboard assertions separately check Tab/Shift+Tab containment, Story arrows, Feed tabs, Escape and restored focus. AX snapshots are retained for the nested editor and matched conversation in each engine. They show accessible dialog/control structure but are not NVDA/VoiceOver sessions.

NVDA, `adb` and iOS device tools were not available through the checked commands/locations. Windows Narrator exists, but no supported desktop/audio feedback channel was available to perform and assess manual Narrator use. No screen-reader experience is claimed. Physical Safari/iOS, Android IME, safe areas/rotation and browser-engine support beyond the exact Windows builds above remain unverified.

Reviewed frames cover desktop/mobile Feed, dark mobile Connect, Premium, own tablet identity, dark project detail, Circle discussion, appearance settings, nested local editor and matched-message narrow layouts from all three engines. No obvious overlap outside the expected fixed navigation or escaped-text rendering defect was observed in those frames. Inherited small secondary text and the narrow attachment-preview label remain legibility risks for manual review; no typography redesign was performed.

## Evidence and reproduction

- [Structured final results](qa/w12-1/results.json): per-engine workflow outcomes, route/status/heading rows, viewport measurements, reflow/probes, axe outcomes and runtime diagnostics; independent HTTP results included separately.
- [Open manual checklist](qa/w12-1/MANUAL_CHECKLIST.md).
- Screenshots: [desktop Feed](qa/w12-1/chromium-desktop-feed.png), [320px Feed](qa/w12-1/chromium-mobile-feed.png), [dark Connect](qa/w12-1/chromium-dark-connect.png), [nested editor](qa/w12-1/chromium-nested-dialog.png), [Firefox narrow composer](qa/w12-1/firefox-matched-message.png), [WebKit narrow composer](qa/w12-1/webkit-matched-message.png). All twelve frames and six `*-aria.yml` snapshots are under `docs/qa/w12-1/`.
- Original W12 evidence is retained under `docs/qa/w12/`.

Reusable drivers: existing `scripts/w12-browser.mjs`, `scripts/w12-audit.mjs`, `scripts/w12-accessibility.mjs` now accept engine/output options while keeping original Chromium defaults. New `scripts/w12-1-browser.mjs` adds targeted regressions/matrices, `scripts/w12-1-run.mjs` runs all four suites, and `scripts/w12-1-screenshots.mjs` captures static frames. Logs/dependencies/browser binaries stay ignored.

```powershell
npm.cmd install --prefix .tools/qa --no-audit --no-fund playwright@1.64.1 @axe-core/playwright@4.14.0
$env:PLAYWRIGHT_BROWSERS_PATH = Join-Path (Get-Location) '.tools/browsers'
node .tools/qa/node_modules/playwright/cli.js install chromium firefox webkit
npm.cmd run lint
npm.cmd test
npm.cmd run build
node node_modules/next/dist/bin/next start --port 3112
```

In a second shell, run serially for each engine:

```powershell
$env:QA_BROWSER = 'chromium' # repeat firefox, webkit
node scripts/w12-1-run.mjs
node scripts/w12-1-screenshots.mjs
```

`QA_ORIGIN` overrides the default http://localhost:3112 and `QA_OUTPUT` overrides ignored output paths. WebKit settling makes its audit slower. Stop the owned local production server after verification. The HTTP harness was temporary under ignored `.tools`; every final path/status is retained in results.json.

## Remaining manual gates and boundaries

No known critical/high application defect remains in the executed scenarios. Physical-device/AT/native-zoom verification gaps remain material open coverage gates. The earlier WebKit prefetch diagnostics have no confirmed root cause; retain their evidence and reopen investigation if they recur during ordinary browsing or refresh. Passing the final tested navigation path does not prove they can never recur. Complete the linked checklist with tester, actual device/OS/browser/AT version, input method and observed results. Review nested safety/preview combinations beyond the tested profile case, every scroll position, transient/disabled/error states, legibility and actual mobile keyboards. Do not replace those records with viewport flags or axe output.

Follow, project collaboration and Circle membership remain separate from Connect. Only valid mutual acceptance enables local messaging; Premium never buys consent; block/unmatch revokes sending and unblock does not restore it. Free social features, free incoming acceptance/matched conversation, original Free 3/day, Plus INR199/month 15/day, Pro INR399/month 40/day, optional discovery and independent Dating/18+ choices remain unchanged. All content/requests/messages reset on refresh; only existing theme persistence remains. No backend, database, real authentication, uploads, checkout, real-time delivery or mobile code was added. **W13 has not started. Final manual sign-off remains OPEN.**

## Git handoff

Only W12.1 fixes, drivers, evidence and documentation are included. Implementation hash and verified push are recorded after committing. Origin remains `https://github.com/Sanjaypalthaniya/Youverse.git`; ordinary master push only, no force/reset/clean/history rewrite. Prior W01–W12 commits and evidence remain intact. Browser binaries, dependencies, generated builds and secrets remain ignored.
