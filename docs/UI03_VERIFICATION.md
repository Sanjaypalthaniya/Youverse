# UI03 — app-like navigation and layout

Date: 2026-11-04 (Asia/Calcutta). Baseline: 8289f4fc686afb3ea1bf626db4fbd52c00950d1b (verified UI02).

## Scope

UI03 changes the shared shell/navigation only. UI01 typography/tokens and UI02 Feed, post and Story components remain intact. Explore, Profiles, Projects, Circles and Messages keep their existing page components. Existing session state, publishing, reactions, Connect consent, permissions and pricing are unchanged. UI04 has not started.

## Navigation and layout

- Mobile: 56px sticky header plus top safe area, original wordmark, 44px menu/search/notification/message controls, and an explicit search disclosure. Search still submits the existing encoded query to Explore; Escape closes it and restores focus. The previous always-visible 122px header is replaced, reclaiming 66px when search is closed.
- Bottom navigation: fixed 64px base plus bottom safe area, 22px icons, visible labels, 44px minimum targets, a compact active-icon pill and press feedback. Current-page semantics include post/profile detail routes.
- Mobile drawer: named modal navigation, a distinct Close navigation button, backdrop dismissal, Escape, Tab/Shift+Tab trapping, focus restoration, scroll locking and explicit restoration of the opening scroll position when the URL is unchanged. Closed drawers are inert and hidden from the accessibility tree. Background content is inert and aria-hidden while open. Crossing to a larger breakpoint releases the drawer lock.
- Tablet: 76px icon rail at 701–899px with accessible labels/tooltips; 200px labelled sidebar at 900–1199px. Single-column content uses available width without the old narrow tablet feed.
- Desktop: 224px sidebar, 64px header, balanced 640px Feed and 264px discovery rail above 1199px. Sidebar navigation scrolls independently on shorter screens so account/settings controls remain reachable. Focus rings sit inside the scrolling link bounds. The existing wider conversation-layout exception is preserved.
- Safe areas: viewport-fit=cover plus top/bottom/side inset padding. Zoom is not restricted. Smooth scrolling, drawer/search transitions and navigation feedback respect reduced motion. The existing short-height header exception is preserved so keyboard/landscape layouts remain usable.

## Exact code and CSS cleanup

Added one component owner, components/AppShell.jsx, and one style owner, app/shell.scss. Youverse retains the same route/content dispatch and delegates only its wrapper to AppShell. No state provider or domain helper changed.

Removed/transferred obsolete shell rules from app/globals.scss, app/redesign.scss, app/social.scss and app/qa.scss: sidebar and nested navigation, main-shell, topbar/greeting, search-box, mobile-brand/menu, bottom-nav, notification-dot, content-grid, right-rail, create-button, sidebar-bottom, little-note, signed-user and shell card styles, including theme-independent responsive variants. Removed the old shell-width declarations from redesign.scss and placed shell dimensions together in shell.scss. The Reel scroll-margin offset now uses the header token; Reel presentation/navigation is otherwise retained.

The [CSS audit manifest](qa/ui03/results/css-cleanup.json) records 83 removal/transfer audit entries, including nested branches and token/offset declarations; this is not a count of unique top-level rules. Removing a parent rule also removes its obsolete nested declarations. Mixed selectors retain non-shell branches, such as rail-title typography. Generic brand styling remains because Welcome uses it; shared avatars, content artwork, UI01 controls, UI02 Feed and later-phase page styling remain. No new override layer was left over the old shell component rules.

Removed confirmed dead Youverse code: the never-opened W01 preview modal and its state/Escape listener, the unreferenced PageTitle component, the unused makers/profile helpers, unused UI/icon imports and appearance variable. Repeated active-route expressions were replaced by one mapping shared by desktop and bottom navigation. The obsolete hidden NEW label markup was removed. All live route components remain. No assets or runtime dependencies were added or removed.

The existing UI01 browser check now opens/closes the search disclosure before measuring its textbox. The extended browser suite uses the explicit Close navigation control to dismiss the new modal drawer; its visibility/focus assertions remain.

## Visual review and observed fixes

Baseline production screenshots were captured before editing, at 320, 360, 390, 430, 768, 1024 and 1440px in both themes. After captures use the UI03 production build, including open drawers and scrolled content, plus focused navigation and expanded search. Actual mobile, tablet and desktop images were opened and reviewed.

Review/testing found and corrected ambiguous open/close button labels, the Settings aria-current omission and potentially clipped keyboard focus rings in the scrolling sidebar. The scroll probe showed that Playwright's locator click repositioned the page before the menu event; the physical-touch scroll check now taps viewport coordinates. The shell also explicitly retains the opening scroll position. Firefox measured one CSS 44px target as 43.99998px, so geometric assertions allow a 0.01px rounding tolerance; CSS minimums remain 44px.

| State | Before | After |
| --- | --- | --- |
| 320px mobile | [Before](qa/ui03/before/320-light-feed.png) | [After](qa/ui03/after/320-light-feed.png) |
| 390px mobile | [Before](qa/ui03/before/390-light-feed.png) | [After](qa/ui03/after/390-light-feed.png) |
| Mobile dark | [Before](qa/ui03/before/390-dark-feed.png) | [After](qa/ui03/after/390-dark-feed.png) |
| Mobile drawer | [Before](qa/ui03/before/390-light-drawer.png) | [After](qa/ui03/after/390-light-drawer.png) |
| Dark drawer | [Before](qa/ui03/before/390-dark-drawer.png) | [After](qa/ui03/after/390-dark-drawer.png) |
| 768px tablet | [Before](qa/ui03/before/768-light-feed.png) | [After](qa/ui03/after/768-light-feed.png) |
| 1024px tablet | [Before](qa/ui03/before/1024-light-feed.png) | [After](qa/ui03/after/1024-light-feed.png) |
| Desktop | [Before](qa/ui03/before/1440-light-feed.png) | [After](qa/ui03/after/1440-light-feed.png) |
| Desktop dark | [Before](qa/ui03/before/1440-dark-feed.png) | [After](qa/ui03/after/1440-dark-feed.png) |
| Sticky scrolled mobile | [Before](qa/ui03/before/390-light-scrolled.png) | [After](qa/ui03/after/390-light-scrolled.png) |

Additional evidence includes [mobile search](qa/ui03/after/390-light-search.png), [mobile keyboard focus](qa/ui03/after/390-light-keyboard.png) and [tablet keyboard focus](qa/ui03/after/768-light-keyboard.png).

## Reproduction

Use the existing ignored .tools/qa Playwright/axe installation and .tools/browsers cache. Set QA_ORIGIN to the production server origin (default http://localhost:3113).

- npm run lint; npm test; npm run build
- QA_PHASE=after node scripts/ui03-visual.mjs
- QA_BROWSER=chromium (or firefox/webkit) node scripts/ui03-browser.mjs
- node scripts/ui01-design.mjs; node scripts/ui02-browser.mjs
- node scripts/w12-browser.mjs; node scripts/w12-1-browser.mjs
- node scripts/w12-audit.mjs; node scripts/w12-accessibility.mjs

Set QA_OUTPUT for existing suites to ignored tool storage and QA_EVIDENCE=docs/qa/ui03/after for legacy screenshots. Raw final results are archived under qa/ui03/results/. Browser emulation and automated accessibility checks do not replace physical iOS/Android testing, screen-reader testing or native browser zoom sign-off.

## Final results

- Lint, 73/73 existing tests and production build passed (62 static outputs).
- UI03: 42 cases passed across Chromium, Firefox and WebKit at all seven requested widths in light/dark, plus 21 nested-route active-state checks and three motion-enabled checks.
- Existing workflows: 14/14 passed; extended keyboard/touch scenarios: 6/6 passed.
- UI01 foundation checks: 14/14 passed. UI02 social-component checks: 14/14 passed.
- Routes: 59/59 returned HTTP 200 with one h1. Responsive route checks: 200; touch checks: 112; reflow records: 73. No document overflow.
- Automated WCAG A/AA scans: 24 route, 38 additional route/dialog, 24 UI03 shell/drawer, 2 extended and four UI02 feed/Story scans (92 total); zero violations. Final suites recorded no runtime errors.
- Evidence: 36 before and 48 after screenshots, with metadata and machine-readable results archived in qa/ui03/.

One initial WebKit history/search run stalled while running concurrently. The complete isolated suite passed without further product changes. The route audit used an ignored copy with progress logging and unchanged assertions. Preliminary failed runs remain only in ignored tool storage. Final evidence is summarized in [summary.json](qa/ui03/results/summary.json).
