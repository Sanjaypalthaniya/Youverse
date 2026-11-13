# UI05 — Projects, Circles, Connect and Messages

Date: 2026-11-13 (Asia/Calcutta). Baseline: b34a76e033a22db82e0dc457e56f23519ef7ba09 (verified UI04).

## Scope

UI05 changes presentation for Projects, Circles, Connect and Messages. No backend, database, product feature, price, quota, permission or session-persistence change was made. Domain data, providers and transition helpers remain unchanged. Follow, Circle membership and project collaboration remain independent of Connect. Only valid mutual acceptance enables messages. Dating still requires explicit opt-in and separate 18+ self-attestation. UI06 has not started.

## Visual improvements

- Shared feature-screen presentation reuses Inter, Plus Jakarta Sans, the existing theme tokens, buttons, avatars and cards. Compact 25–28px headings replace promotional panels; filter controls, tabs and relevant actions retain 44px targets. UI01–UI04 page components and app-shell styling remain intact.
- Projects: two-column desktop cards and full-width phone cards, integrated illustrated covers, compact author/category/status rows, 17px titles, readable descriptions and 6px progress bars. Filters use four columns on desktop and two on mobile. Details use shorter covers, 24–27px titles, compact Star/Share/edit/safety actions, clearer roadmap dots, field-note typography, roles and collaboration states. Existing editor and ownership controls remain.
- Circles: compact community cards, member/discussion counts, Join/Leave actions, horizontally scrolling topic chips and familiar discussion action rows. Details, members and guidelines use natural text sizes. Replies use quieter inset bubbles and maintain existing appreciation/edit/delete controls.
- Connect: compact discovery switch and obvious Intentions & safety action; the unchanged allowance stays visible in a smaller summary. Intentions form a horizontal tray instead of a tall stack. Maker cards use prominent avatars, craft/bio, shared-curiosity explanations, intention badges, Follow and Connect controls. Incoming, outgoing, matched and safety states keep their existing actions and copy.
- Messages: compact Messages heading, smaller conversation rows and tabs, clear consent-locked state, 14px message text, readable date/time labels and compact composer with 16px textarea text. Attachment preview becomes an explicitly labelled icon on mobile. The history pane scrolls independently; adding a message no longer scrolls the whole document past the conversation header. Mobile chat extends to the content edges and adapts to dynamic viewport height, with normal page scrolling available in short/keyboard layouts. Desktop keeps an inbox beside the conversation; narrower screens use Inbox navigation.
- Lightweight star/appreciation feedback, switch/tab changes, card borders and opacity-only message arrival preserve positioning of embedded dialogs. The existing global reduced-motion rule disables animations and transitions.

## CSS ownership and exact cleanup

Replaced the original projects.scss, circles.scss and connect.scss component rules instead of leaving their legacy designs underneath new overrides. Added feature-ui.scss for shared feature-screen patterns and messages.scss as the sole message presentation owner. Removed obsolete feature branches from redesign.scss and moved message rules out of account.scss. Removed connect-functionality.scss and its import after consolidating its live capability/template rules into connect.scss and its message rules into messages.scss. qa.scss no longer owns the old Dating badge override; Connect uses the existing accessible theme danger token.

Mixed selectors retain Account/Premium and identity-editor branches. Shared shell circle-mini/circle-symbol styles remain. Generic Account text-action styling remains; feature-screen supplies only its 44px sizing. Shared ProjectCover, ProjectCard, ProjectProgress, ProjectStar, CircleCover and MembershipButton continue to serve Explore/profile references. No assets or runtime dependencies were added.

The [cleanup manifest](qa/ui05/results/css-cleanup.json) lists removal/transfer/replacement entries, including nested and responsive rules (185 audit entries); it is not a unique-selector count. Legacy huge hero flower markup and its styles were removed. Confirmed unused W01 .message-preview (including its mobile branch) and .connect-intro rules were removed from globals.scss after checking all component references. The unused .connect-plan-grid preview styling was also removed after confirming no component references. The unreferenced W07 ConnectMessages.jsx preview was removed: all live message routes already use Messages.jsx. One existing test had read the obsolete preview's source; its assertion now inspects the live Messages conversationGate integration instead. The suite still contains 73 tests. UI05 components were formatted for maintainability; their state/validation/transition handlers remain unchanged apart from presentation-only history scrolling.

## Visual review and corrections

Before images were captured from verified UI04 production output before redesigning. Actual mobile and desktop images were opened and reviewed. Review caught shrinkable Circle topic chips that overlapped and the pre-existing document jump after sending a message; both were corrected. Mobile chat uses a bounded flex history area so the composer and identity header remain closer together. All screenshots use actual app state; mutual-chat captures accept an existing seeded incoming request through the normal UI rather than injecting a match.

## Before/after evidence

| Screen | Before | After |
| --- | --- | --- |
| Mobile Projects | [Before](qa/ui05/before/390-light-projects.png) | [After](qa/ui05/after/390-light-projects.png) |
| Desktop Projects | [Before](qa/ui05/before/1440-light-projects.png) | [After](qa/ui05/after/1440-light-projects.png) |
| Project detail | [Before](qa/ui05/before/390-light-project-detail.png) | [After](qa/ui05/after/390-light-project-detail.png) |
| Mobile Circles | [Before](qa/ui05/before/390-light-circles.png) | [After](qa/ui05/after/390-light-circles.png) |
| Circle detail | [Before](qa/ui05/before/390-light-circle-detail.png) | [After](qa/ui05/after/390-light-circle-detail.png) |
| Discussion | [Before](qa/ui05/before/390-light-discussion.png) | [After](qa/ui05/after/390-light-discussion.png) |
| Connect discovery | [Before](qa/ui05/before/390-light-connect-discover.png) | [After](qa/ui05/after/390-light-connect-discover.png) |
| Incoming requests | [Before](qa/ui05/before/390-light-connect-incoming.png) | [After](qa/ui05/after/390-light-connect-incoming.png) |
| Locked chat | [Before](qa/ui05/before/390-light-locked-chat.png) | [After](qa/ui05/after/390-light-locked-chat.png) |
| Mobile mutual chat | [Before](qa/ui05/before/390-light-chat.png) | [After](qa/ui05/after/390-light-chat.png) |
| Desktop dark chat | [Before](qa/ui05/before/1440-dark-chat.png) | [After](qa/ui05/after/1440-dark-chat.png) |

Additional after evidence includes [project cards](qa/ui05/after/390-light-project-cards.png), [roadmap](qa/ui05/after/390-light-project-roadmap.png), [field notes](qa/ui05/after/390-light-project-field-notes.png), [collaboration](qa/ui05/after/390-light-project-collaboration.png), [community cards](qa/ui05/after/390-light-circle-cards.png) and [replies](qa/ui05/after/390-light-replies.png). Matrices cover 320, 360, 390, 430, 768, 1024 and 1440px in both themes; frame metadata is included.

## Reproduction

Use the existing ignored .tools/qa Playwright/axe tooling and .tools/browsers cache. Set QA_ORIGIN=http://localhost:3113 for legacy suites. Run against the production server.

- npm run lint; npm test; npm run build
- QA_PHASE=after node scripts/ui05-visual.mjs
- QA_BROWSER=chromium (or firefox/webkit) node scripts/ui05-browser.mjs
- node scripts/ui05-touch.mjs
- node scripts/w12-browser.mjs; node scripts/w12-1-browser.mjs
- node scripts/w12-audit.mjs; node scripts/w12-accessibility.mjs
- node scripts/ui01-design.mjs; node scripts/ui02-browser.mjs; node scripts/ui03-browser.mjs; node scripts/ui04-browser.mjs

QA_OUTPUT selects ignored result storage; QA_EVIDENCE=docs/qa/ui05/after redirects legacy screenshots. Final passing evidence is archived in qa/ui05/results/. Browser emulation, reduced-height keyboard proxies and automated scans do not constitute physical iOS/Android, native virtual-keyboard/zoom or full screen-reader sign-off.

Preliminary QA runs exposed harness issues: an exact label query included the existing message counter, a target query included unchanged desktop shell controls, and a motion probe read state before hydration. Those checks now target the live feature controls and await the pressed state. One retained run stalled while a production rebuild replaced server output; the server was restarted before the final retained checks. WebKit also reported a canceled Next.js visible-link prefetch during hard navigation. Its harness now lets scheduled prefetch start before waiting for network idle; errors are not filtered. Preliminary failures remain only in ignored tool storage; archived results contain passing runs.

## Final results

- Lint, all 73 existing tests and production build passed (62 static outputs).
- UI05: 42 responsive/theme cases passed across Chromium, Firefox and WebKit, plus three motion-enabled checks. All seven requested widths were covered in both themes.
- Existing workflows: 14/14; extended keyboard/touch/reflow scenarios: 6/6; UI01, UI02, UI03 and UI04 regressions: 14/14 each. Two additional light/dark touchscreen-tap scenarios passed Star, Join, independent consent, accept, send, long-message internal scrolling and Unmatch.
- Routes: 59/59 HTTP 200 with one h1; 200 responsive records, 112 legacy touch checks and 73 reflow records; no document overflow.
- Automated WCAG A/AA scans: 84 UI05, 24 route, 38 additional route/dialog, 2 extended, 4 UI02, 8 UI03 and 10 UI04 (170 total); zero violations. Final suites recorded no runtime errors.
- Evidence: 88 before and 114 after screenshots; 185 CSS cleanup audit entries. Final passing results are indexed in [summary.json](qa/ui05/results/summary.json).

UI06 has not started.
