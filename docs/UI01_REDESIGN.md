# UI01 — foundations

Date: 2026-11-04 (Asia/Calcutta). Baseline: aeaafe04b9fe8282eaec6c49fe59473951020509.

## UI01–UI06 roadmap

| Phase | Scope | Status |
| --- | --- | --- |
| UI01 | Local typography, tokens, shared buttons/cards, foundational spacing on representative screens | Implemented |
| UI02 | Feed, Stories and post presentation, including edge-to-edge mobile feed | Planned |
| UI03 | Compact mobile shell, desktop navigation, responsive sidebar refinements | Planned |
| UI04 | Explore and identity/profile presentation | Planned |
| UI05 | Projects, Circles, Connect and message presentation | Planned |
| UI06 | Cross-surface interaction, accessibility and visual polish | Planned |

UI02 has not started. No backend, native app or product features were added.

## What changed

- Bundled Inter variable font (100–900) locally via next/font/local; Plus Jakarta Sans remains on selected headings and existing artwork. Both licenses are included. Font loading makes no external requests.
- Main UI: 14px Inter, 1.55 line height; shared headings: 24–30px h1, 20px h2, 16px h3.
- Shared card radius: 24 → 16px; control radius: 14 → 10px; card padding: 26 → 20px desktop and 22 → 16px mobile. Shadows are quieter.
- Existing Button and Card components retain their API and variants. Shared controls retain 44px minimum targets, focus rings and reduced-motion behavior; disabled buttons have explicit feedback.
- Desktop header: 80 → 68px; maximum feed column: 720 → 640px. Feed cards, reflection text and question text use more compact spacing and sizes.
- Violet, coral, lime and both theme palettes are preserved. All domain/session behavior, Connect consent, pricing and permission rules remain untouched.

## Obsolete code removed

Removed nine complete, superseded top-level rules from app/globals.scss: :root, :root[data-theme=dark], body, h1, h2, h3, .yv-card, .yv-button and .icon-button. Their necessary properties now live in the existing app/redesign.scss design system. The existing presentation file was edited in place; no additional overriding stylesheet was introduced.

Responsive overrides, avatar color variants, pressed/selected states, active navigation, ownership controls, dialog rules and route-specific styles remain in use. No components, imports or assets were confirmed dead, so none were deleted speculatively. Jakarta remains a used asset. Stylesheet import order is preserved.

## Verification

- npm run lint: passed.
- npm test: 73/73 passed.
- npm run build: passed; 62 static outputs.
- Chromium production route audit: 59 application routes, one h1 per route, HTTP 200.
- 200 responsive route/theme checks: no document overflow.
- Chromium, Firefox and WebKit foundation checks: 14 states each (320, 360, 390, 430, 768, 1024 and 1440px, light/dark), local font loading, touch targets and reduced motion passed.
- 14 existing browser workflow scenarios passed: social publishing/state, ownership, project and Circle management, Connect lifecycle, messaging consent, Dating/paid capabilities, appearance, keyboard/mobile navigation, quota exhaustion and date rollover.
- Automated WCAG A/AA results and active dialog checks are archived alongside screenshots. Automated checks are not a substitute for a full assistive-technology audit or physical-device testing.

Production screenshots were visually reviewed for desktop feed, mobile feed and mobile dark feed. The desktop navigation visibility issue found during review was corrected and checked in the final production capture. Baseline screenshots use the existing development server; after screenshots use the production build (so the development indicator disappears).

## Screenshots and evidence

| Screen | Before | After |
| --- | --- | --- |
| Desktop feed | [Before](qa/ui01/before/feed.png) | [After](qa/ui01/after/feed.png) |
| Mobile feed | [Before](qa/ui01/before/feed-mobile.png) | [After](qa/ui01/after/feed-mobile.png) |
| Explore | [Before](qa/ui01/before/explore.png) | [After](qa/ui01/after/explore.png) |
| Profile | [Before](qa/ui01/before/profile.png) | [After](qa/ui01/after/profile.png) |
| Connect, dark | [Before](qa/ui01/before/connect.png) | [After](qa/ui01/after/connect.png) |
| Premium | [Before](qa/ui01/before/premium.png) | [After](qa/ui01/after/premium.png) |

Additional captures: [desktop dark feed](qa/ui01/after/feed-dark.png), [mobile dark feed](qa/ui01/after/feed-mobile-dark.png), [matched conversation](qa/ui01/after/messages-matched.png), [matched mobile conversation](qa/ui01/after/messages-matched-mobile.png). The before/after folders also cover projects, Circles, creation, notifications, Reels, welcome and appearance.

Reproduce with the app served locally and QA_ORIGIN set to its origin:

- node scripts/ui01-visual.mjs (writes after captures)
- node scripts/ui01-design.mjs (QA_BROWSER: chromium, firefox or webkit)
- node scripts/w12-browser.mjs
- node scripts/w12-audit.mjs
- node scripts/w12-accessibility.mjs

Browser tooling is the existing ignored .tools/qa Playwright/axe installation and .tools/browsers cache. No new runtime dependency was added. Raw verification JSON is under qa/ui01/results/.

Final evidence: 24 route accessibility scans plus 38 additional route/dialog scans passed with zero automated violations (62 total). Physical-device and full screen-reader audits were not performed.
