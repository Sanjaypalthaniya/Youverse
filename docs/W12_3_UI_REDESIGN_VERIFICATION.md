# W12.3 premium social UI redesign — 2026-11-03

> UI redesign implemented; automated regression verification PASS. Final manual frontend sign-off remains OPEN.

## Scope and audit

W12.3 is a presentation redesign of the existing Next.js 16 App Router website. W01–W12.1 history, original fixtures, root session stores, ownership checks, publishing, Connect consent, plans and messaging rules are preserved. No W13, backend, database, production authentication, payments, delivery, uploads, persistence or mobile application work was started.

Started on clean `master` at `21a46996b0877214e43b92c4285c6b6075e06d5b`. Origin was inspected and fetched: `https://github.com/Sanjaypalthaniya/Youverse.git`; histories matched. No applicable AGENTS.md was found. Used the Sites local workflow, without hosting/deployment. Inspected all feature SCSS, the shell/primitives, Feed/cards/Stories/Reels, discovery/search, composers, identity, projects/Circles, Connect/messages/Premium, preferences/activity and previous QA drivers/evidence.

Before editing, served the existing production build and opened actual Chromium pages. Fourteen baseline captures are retained in [before](qa/w12-3/before/frames.json). Visual review of the Feed and Explore exposed these main issues:

- Tiny secondary labels competed with content rather than supporting it; several inherited labels were 8–10px.
- Arial UI and unrelated serif headings produced inconsistent hierarchy across otherwise shared screens.
- Repeated outlined cards and gradient heroes made the product feel like a dashboard. Text, media, author and social actions lacked distinct visual levels.
- Desktop navigation was a long undifferentiated list; the mobile header lacked a strong wordmark and the search field was cramped.
- Profile, project, community, conversation and plan surfaces needed a shared visual language with more expressive content treatments.

## Design system and implementation

The direction is a creative social journal: quiet neutral canvas, expressive violet identity, rounded but restrained surfaces, substantial type, original illustration and clear social actions. Coral is reserved for existing accents/Story rings and lime for milestone/creative-work moments. No platform layout or branding was copied.

### A. Typography, tokens and primitives

Bundled normal variable **Plus Jakarta Sans, weights 200–800**, with its SIL Open Font License. Source and license attribution are in [app/fonts/README.md](../app/fonts/README.md). `next/font/local` provides preload, swap rendering, font fallback metrics and Arial/Helvetica/sans-serif fallbacks. There is no runtime Google Fonts dependency or build-time font fetch.

The shared typography uses 400–500 body/captions, 600 navigation, 600–700 controls/section headings, and 700–800 display headings. `clamp()` scales display/page type; body is 15px, primary mobile post copy 14px, most functional captions 11–13px. Small artwork edition text remains decorative. Long authored content retains wrapping and preformatted line breaks.

`app/redesign.scss` is the ordered final presentation layer over the retained feature styles. It defines semantic canvas/surface/raised/subtle/text/muted/border/focus/danger/success/shadow/radius tokens for light and dark. Original violet `#7555E8`, deep `#5133C9`, soft `#F1EDFF`, coral `#FF7285` and lime `#C8F169` remain. Dark text accents are light enough for the retained accessibility requirements. Buttons, badges, forms, progress bars, tabs, menus, dialogs, empty and loading surfaces share those tokens.

The prior feature SCSS is preserved; this phase does not migrate every historical declaration. Future style consolidation should preserve the tested cascade rather than remove old styles blindly.

### B. Shared shell

Desktop navigation has compact identity, grouped “Your world” / “Make & belong” labels, clear selected rows and a rounded Create entry. The header/search, optional discovery rail and reading width are balanced around social content. The rail keeps genuine common ground, Follow and Connect actions, with readable copy rather than narrow columns.

Mobile has a wordmark and reachable first-row controls, full-width second-row search, a safe-area-aware header/drawer and comfortable selected bottom navigation. At very short mobile viewport heights the header scrolls with content so fixed chrome cannot make content unreachable. Tablet retains an adaptive sidebar and drops the optional discovery rail. Messages use the available content width instead of a competing right rail.

### C. Feed, Stories, Reels and Explore

Feed uses segmented For You/Following/Saved controls, richer Story rings, a compact composer entry, clear author/body/media hierarchy, quieter metadata, pill tags, refined action states and readable comment previews. Post-kind presentation uses a `data-kind` attribute: text reflections have larger editorial copy, questions have stronger type, and milestones receive a deliberate lime rule. No author, count, comment, save or Follow behavior changed.

Story viewer progress, identity, artwork, reactions and forms use the shared typography/surfaces. Reels retain illustrated simulations but improve captions/action rails, media hierarchy and mobile viewport height/scroll offset. Explore has a quieter editorial hero, larger search, modern category segments, curiosity chips and consistent discovery cards.

### D/E. Living Identity, Projects and Circles

Profiles retain their original personalized cover artwork and avatar choices while gaining a stronger introduction, readable statement/bio, identity segments, intentions/highlights, timeline and featured-work hierarchy. Owner editing and public read-only behavior remain intact.

Projects/Circles share refreshed cover typography, card spacing, derived progress bars, milestones/field notes, member actions and collaboration controls. Discussion titles/body/topics and replies have stronger hierarchy. Original project owners, Circle membership and all permission/ownership helpers are untouched.

### F. Connect, Messages and Premium

Connect gets refined intention/discovery/request/common-ground surfaces and clearer optional-discovery states. Dating attestation and request confirmations remain explicit. Match celebrations reuse the improved dialog treatment.

Conversations have a dedicated inbox/content layout, readable previews/timestamps, rounded local bubbles and a wrapping composer that keeps attachment/send labels intact. Locked and historical states remain explicit. Only valid mutual acceptance allows sending; paid plans, Follow, projects and Circles cannot grant it. Block/unmatch still revoke it and unblock does not restore it.

Premium has stronger price/benefit/current-plan hierarchy, consistent plan surfaces and a readable comparison table. Exact products remain Free 3/day, Plus ₹199/month 15/day, Pro ₹399/month 40/day. All switching is demo-only; there is no checkout or guarantee of matches.

### G/H. Remaining screens and restrained polish

Create/editor forms, previews, notification groups/cards, Settings navigation, preference rows, appearance samples, onboarding, Help and Welcome use the same type/control/surface system. The inherited phase-number footer was replaced with “Session demo”. Hover/press feedback is limited to short color/shadow/one-pixel movement; no heavy animation, glass layer or runtime UI dependency was introduced. Reduced motion disables transitions/animation and smooth scrolling.

## Iteration findings

| Finding | Correction and evidence |
|---|---|
| Initial composer icon stretched into a wide pill because an inherited flex rule applied to both links | Constrained the action to 44px; actual bounds are asserted by the new design driver |
| Initial discovery rail squeezed maker copy beside Follow | Changed the rail item to a two-column identity/copy grid with separate readable actions; desktop copy width is asserted |
| New mobile header reduced the space available to immersive Reels | Corrected Reel height and section scroll offset for the new shell; active Reel capture retained |
| Actual 320×240 CSS reflow regression: header/bottom navigation intercepted Story activation in Chromium/Firefox | Short-height mobile header now uses normal flow. Original Story activation/dialog bounds/focus assertions remain; focused rerun passed and full three-engine reruns verify it |
| Initial font probe assumed Next's generated family would contain `localfont` | Driver was corrected to inspect the actual emitted Jakarta family, a loaded matching FontFace and a successful local font response; product font was already loading correctly |

Visual review also found light artwork behind white Reel identity text and a decorative rail flower competing with its heading. A stronger lower-media scrim and solid control backing improve readability; the rail ornament now occupies its own line. The font probe is a driver assumption, not a product font failure. A second probe sampled theme state before the existing appearance effect applied; it now waits for the actual theme attribute. An immediate WebKit focus-coordinate assertion failed once; a direct probe and a complete targeted rerun showed the focused control inside the viewport on the same source. The driver now waits for loaded typography and up to 1.5 seconds for native focus scrolling, with the same visibility/containment condition. One intermediate targeted WebKit run recorded a prefetch/access-control diagnostic; its browser-internal attribution remains unconfirmed. Normal appearance UI and pre-navigation settling replace artificial theme reloads; no runtime errors are filtered. A Firefox comment-button locator timed out in one concurrent run despite the captured form being present; the isolated workflow passed without product changes and the full suite was repeated. This is retained as an intermediate execution observation, not silently attributed to application logic. Intermediate results are not counted as final passes.

## Verification

| Layer | Final result and limit |
|---|---|
| Lint / helper tests / production build | PASS; 73 unchanged helper tests, 62 generated entries including framework/icon |
| Independent production HTTP | PASS 99/99: 59 pages, 11 queries, 21 expected 404s, seven local-unavailable responses, icon; consent/ownership markup retained |
| Retained functional suite | PASS 14 groups per engine, 42/42; current final source in Chromium, Firefox and WebKit |
| Additional regressions | PASS five functional groups per engine, 15/15; three separate native-zoom probes executed without proving native zoom |
| Direct route audit | PASS 177 loads, 59 per engine, HTTP 200 and one visible semantic h1 each |
| Primary responsive matrix | PASS 840 rows: 20 routes x seven viewports x two themes x three engines; no document-level horizontal overflow |
| Additional input/viewport matrix | PASS 336 rows; 288 carry hasTouch, 48 desktop; no document overflow |
| CSS reflow equivalents | PASS 216 measurements, plus Story activation/dialog/focused-control assertions; not native browser zoom |
| Axe | PASS 192 route/dialog scans, zero selected wcag2a/wcag2aa/wcag21aa violations |
| New design checks | PASS 42 homepage viewport/theme cases: actual local font faces/responses, no external requests, reduced-motion computed styles, selected touch/control/layout bounds |
| Runtime | Final monitored workflow/matrix/design logs have no page/console errors, hydration/key warnings or extended failed requests; intermediate observations retained separately |
| Visual evidence | 14 before + 21 after + four interactive screenshots; representative visual review completed, not exhaustive manual QA |
| Offline comparison artifact | PASS 14 page selections, 28 paired images loaded |
| Git whitespace/artifact checks | PASS; previous evidence, domain helpers/tests and package files unchanged |
| Physical device / manual AT / actual native zoom | NOT RUN or not successfully demonstrated; final manual sign-off OPEN |

Automated redesign verification passed. No known critical/high application defect remains in the executed scenarios. This does not complete the outstanding manual gates or establish production/backend readiness.

Existing assertions are retained; no helper test was removed or domain rule relaxed.

The reused suites exercise social publishing/comments/likes/saves/search, identity and featured work, project/collaboration ownership, Circle discussion/reply management, Connect/Dating/quotas/plans, mutual-match messages and safety, preferences/theme/onboarding, keyboard/mobile controls, local-unavailable routes, nested focus and CSS reflow. New design checks assert actual loaded local font faces/resources, no external runtime requests, seven light/dark viewport sizes, pointer targets, search width, composer action width and rail copy width.

Browser versions/environment remain Windows 10 Pro x64, Playwright 1.64.1, Chromium 156.0.8078.4, Firefox 157.0, WebKit 27.2, axe-core 4.14.0. Firefox touch flags use a desktop UA because `isMobile` is unsupported. Windows Playwright WebKit is not physical Safari/iOS.

Viewports: 320×568, 360×800, 390×844, 430×932, 768×1024, 1024×768 and 1440×900. Light/dark matrices and the existing system-theme workflow are distinct checks. CSS 100%/200%/400% equivalents use 1280×960, 640×480, 320×240; native zoom probes do not count as successful native zoom if viewport/DPR remain unchanged.

## Evidence and reproduction

- [Interactive before/after comparison](qa/w12-3/index.html) opens the paired actual captures.
- Before/after screenshots: [before Feed](qa/w12-3/before/feed.png), [after Feed](qa/w12-3/after/feed.png), [mobile Feed](qa/w12-3/after/feed-mobile.png), [Explore](qa/w12-3/after/explore.png), [profile](qa/w12-3/after/profile.png), [Projects](qa/w12-3/after/projects.png), [dark Connect](qa/w12-3/after/connect.png), [Premium](qa/w12-3/after/premium.png), [Settings](qa/w12-3/after/settings.png).
- [Final structured results](qa/w12-3/results.json), six accessible-tree snapshots and additional content/state captures are under `docs/qa/w12-3/`.
- Historical W12/W12.1 evidence stays unchanged. `QA_EVIDENCE` was added to the reused nested/reflow driver so W12.3 runs cannot overwrite earlier screenshots.

Use the existing isolated QA setup from W12.1, then:

```powershell
npm.cmd run lint
npm.cmd test
npm.cmd run build
node node_modules/next/dist/bin/next start --port 3112
```

In a second shell, repeat for each of chromium/firefox/webkit:

```powershell
$env:QA_BROWSER = 'chromium'
$env:QA_OUTPUT = '.tools/w12-3/signoff/chromium'
$env:QA_EVIDENCE = 'docs/qa/w12-3/interactive'
node scripts/w12-1-run.mjs
node scripts/w12-3-design.mjs
```

Capture visuals with `$env:QA_PHASE='after'` and `node scripts/w12-3-visual.mjs`; `before` captures the current served build before a future edit. Keep QA binaries/dependencies/logs ignored. Stop the owned production server after use. Commands use `npm.cmd` without changing PowerShell policy; shell operations used approved escalation because sandbox startup fails.

## Boundaries and remaining manual QA

This phase preserves the session-only website. Refresh resets content, requests, plans and messages; only existing appearance persistence remains. No remote replies, notifications, age verification, subscriptions, reports or delivery are fabricated.

Physical iOS/Android, actual IME/keyboard/safe-area behavior, manual NVDA/VoiceOver/Narrator, actual browser-UI 200%/400% zoom and exhaustive human review of every scroll/dialog/loading state remain OPEN. Automated touch flags, CSS reflow, selected screenshots and zero axe violations do not complete those gates or certify accessibility. The [W12.1 manual checklist](qa/w12-1/MANUAL_CHECKLIST.md) still applies to the redesigned UI. Revisit small secondary/illustration text and transient states with users/devices. No final manual frontend sign-off or production/backend readiness is claimed. W13 and Flutter remain unstarted.

## File inventory

Application: new `app/redesign.scss`, local variable font/OFL/attribution under `app/fonts/`; modified `app/layout.jsx`, `components/Youverse.jsx` and presentation-only attributes in `components/SocialContent.jsx`. Shared primitive/Modal logic is unchanged.

QA: new `scripts/w12-3-design.mjs`, `scripts/w12-3-visual.mjs`; reused `scripts/w12-1-browser.mjs` and `scripts/w12-audit.mjs` with the documented evidence/navigation/font/focus sequencing refinements. Original 14-group driver, helper tests, pricing/consent models and application dependencies are unchanged.

Documentation/evidence: this report; `docs/qa/w12-3/` comparison viewer, results, before/after/interactive captures and AX snapshots; README, master plan and roadmap checkpoint updates. Tool binaries, intermediate logs and temporary HTTP/aggregation drivers remain ignored.

## Git handoff

Implementation checkpoint: **`98b10b55cfbcca28a34ffe54b25b45b32d7ba8ee`** (`W12.3: premium social interface with local Jakarta typography`). It records the source independently of the final QA/evidence checkpoint. Actual verified normal push and final branch HEAD are reported in the completion handoff. Preserve original history; no force-push, reset, clean or history rewrite. Origin remains `https://github.com/Sanjaypalthaniya/Youverse.git`. The font is an intentional licensed application asset; browser binaries, tool dependencies, generated builds, secrets and logs remain ignored.
