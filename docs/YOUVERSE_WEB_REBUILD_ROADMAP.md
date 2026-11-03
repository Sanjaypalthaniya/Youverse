# YOUVERSE web rebuild roadmap

Website first. Finalize the complete website UI, UX and frontend functionality before starting the Android/iOS application in **Flutter and Dart**. Shared production backend integration begins in W13 onward. W02–W08 static UI and W09 session-based social functionality are implemented; see the phase verification reports. W10 session identity/project/Circle functionality is implemented; W11 session Connect/Premium/Messages functionality is implemented; W12 Chromium stabilization and automated QA have run; final manual QA remains open. No backend, database, real authentication or payments are integrated.

## Status vocabulary

Each feature progresses through: Not started → Static UI complete → Local functionality complete → Backend integrated. Tested is tracked separately and requires actual verification. A shell preview does not complete the corresponding product feature. Historical W01 entries below record the original handoff. Current W02/W03 lint, tests, build and route results supersede runtime blockers; browser verification remains open. No backend feature is integrated.

## Phases

| Phase | Scope | Current status |
|---|---|---|
| W01 | Foundation, Design System, Navigation | Foundation preserved; lint/build/HTTP serving verified during W02; browser QA open |
| W02 | Static Feed, Stories, Reels | Static UI complete; session demos implemented; lint/build/HTTP verified; browser QA open |
| W03 | Static Explore, Search, Create, Notifications | Static UI complete; local filtering/composer/read-state demos; automated checks verified, browser QA open |
| W04 | Static Living Identity & Profiles | Static UI complete; session editor and existing follow-state integration; data/validation/link tests and build/HTTP verified; browser QA open |
| W05 | Static Projects & Collaboration | Static UI complete; session editing/stars/request demos; helper tests, build and HTTP verified; browser QA open |
| W06 | Static Circles & Communities | Static UI complete; session membership/replies/reactions/draft previews; helper tests, build and HTTP verified; browser QA open |
| W07 | Static Connect Discovery & Matching | Static UI complete; session discovery/requests/matches/safety/quota previews; helper tests, build and HTTP verified; browser QA open |
| W08 | Static Premium, Messages & Settings | Static UI complete; original plan/quota previews, consent-gated session messaging, settings/safety/help/onboarding; tests/build/HTTP pass, browser QA open |
| W09 | Social Frontend Functionality | Session publishing and shared social interactions complete; 46 tests/build/HTTP verified; browser QA open; no persistence/backend |
| W10 | Identity, Projects & Circles Functionality | Local functionality implemented; 58 tests/build/98 HTTP checks pass; browser QA open; no persistence/backend |
| W11 | Connect, Premium & Messaging Functionality | Session functionality implemented; 73 tests/build/98 HTTP checks pass; browser QA open; no production services |
| W12 | Responsive QA, Accessibility & Final Web Verification | Chromium stabilization verified: 14 interaction groups, 200 viewport/theme checks, 62 axe scans; final manual/device/AT gate OPEN |
| W13 onward | Backend & Production Features | Not started |

## W01 foundation inventory

| Feature | Source status | Tested |
|---|---|---|
| Next.js 16 App Router, JSX, React, Bootstrap 5, SCSS, Lucide | Source configured; dependencies not installed | No |
| Brand tokens, shared layout, responsive sidebar/bottom navigation/header | Static UI complete | No |
| Buttons, cards, avatars, badges, inputs, tabs, modal, empty/loading states, post foundation | Static UI complete | No |
| Route navigation | Local functionality complete in source | No |
| Light/dark toggle and localStorage preference | Local functionality complete in source | No |
| Home feed sample content | Static UI complete | No |
| Like, bookmark, For you/Following/Saved demos | Local functionality complete in source; session-only, Following uses fixed demo selection | No |
| Welcome and demo login | Static UI complete; demo entry only, no auth | No |
| Eleven requested route shells | Static UI complete; no full feature completion implied | No |
| npm installation, lint, build, local serving | Blocked: node/npm absent, runtime download rejected | No |
| Git checkpoint | Blocked: Git absent | No |

## Feature ledger

The canonical specification in YOUVERSE_MASTER_PRODUCT_PLAN.md governs scope. The entries below distinguish completed static UI and session demos from later product workflows. Backend integrated = No for every feature. W03 filtering and draft validation have automated coverage; HTTP/build checks cover route serving. Browser interaction and visual checks remain open. Historical W01 inventory above is retained as the original handoff.

| Area / feature | Product implementation status | Target |
|---|---|---|
| Home Feed | Session functionality complete; local publication, actual Follow/Saved selection and shared actions | W02/W09 |
| For You, Following, Saved filters | Session functionality complete using shared Follow/bookmark state; refresh resets | W02/W09 |
| Reflections and posts; image/media posts | Session functionality complete; fixtures plus local records/media placeholders and ownership controls | W02/W09 |
| Stories; full-screen Story Viewer | Static UI complete; manual viewer, reactions and reply demos; no publishing | W02/W09 |
| Reels | Static UI complete; illustrated simulation, unavailable state, comment modal; no streaming | W02/W09 |
| Explore; search | Static UI complete; multi-category query/interest filtering and session history; unit-tested, no backend | W03/W09 |
| Post creation | Session publication complete for seven formats, scoped IDs, reference checks, preview/confirmation and appropriate view insertion; no remote upload/publication | W03/W09 |
| Likes; comments; bookmarks; sharing | Shared session reactions/comments/bookmarks and copy links; local detail unavailable states; no remote persistence | W09 |
| Follow/unfollow | Session demo; persistence not started | W09 |
| Notifications | Static UI complete; local category/read-state demos; no live delivery | W03/W09 |
| Public profiles | Static UI complete; three canonical maker routes, per-maker content, explainable shared interests, existing follow state, gated Message explanation | W04/W10 |
| Reporting; hiding; blocking | Hide/undo and report menu demo; no moderation service or blocking | W09 |
| Profile overview | Static UI complete; personal dashboard, structured identity, completion, memberships, demo people lists | W04/W10 |
| Profile editing; bio and craft | Static UI complete; validated session save/cancel/preview, unsaved-change warnings; no persistence | W04/W10 |
| Skills; interests and curiosities; intentions | Static UI complete; editable chips, true shared-interest intersections; validation unit-tested | W04/W10 |
| Identity highlights; milestones; personal growth journey | Static UI complete; session-editable highlights/milestones and growth timeline | W04/W10 |
| Profile reflections; projects; public creator profiles | Static UI complete; existing maker posts/project references, own reflection empty state; Project workflows remain W05 | W04/W10 |
| Project discovery | Static UI complete; local query/category/status/availability filters, curated recommendations and starred view | W05/W10 |
| Project creation and editing; details; status | Static UI complete; four canonical detail pages, validated creation preview, owned-session editor; no persistent publishing | W05/W10 |
| Project roadmap and milestones; progress field notes | Static UI complete; reusable roadmap/activity visuals, milestone-derived progress, editable owned milestones | W05/W10 |
| Stars; collaboration requests; roles; owner request management | Static UI complete; separate project stars and session submit/preview/cancel/accept/decline helpers; no Connect match or DM access | W05/W10 |
| Circle discovery | Static UI complete; query/category/curiosity filters, My Circles, recommendations and curated discussions | W06/W10 |
| Circle details; membership; member lists | Static UI complete; three canonical routes, session join/leave, count/profile consistency and named demo member lists | W06/W10 |
| Discussions; replies; reactions; guidelines; topic discovery | Static UI complete; five discussion routes, per-Circle validated composer preview, session replies/reactions, guidelines and moderation explanations; no persistent publishing or enforcement | W06/W10 |
| Connect friendship; dating (18+); collaboration; mentorship; networking | Static UI complete; shared intentions, explicit Dating opt-in/attestation demo; no production age check | W07/W11 |
| Optional discovery; shared curiosities; intent filters; discovery preferences | Static UI complete; paused by default, genuine shared-interest filtering and session preferences | W07/W11 |
| Incoming and outgoing requests; accept/decline/cancel | Static UI complete; validated session lifecycle, duplicate prevention and outgoing quota accounting | W07/W11 |
| Mutual matches; Interested in You; unmatch | Static UI complete; valid incoming acceptance creates demo match, interest preview and unmatch; no service | W07/W11 |
| Connect block/report; ON/OFF | Static UI complete; session block/unblock and pause preserve consent rules; report explanatory only | W07/W11 |
| Dating opt-in with 18+ attestation; anti-spam introductions | Static UI complete; separate explicit choices and 20–500 character introductions; no backend enforcement | W07/W11 |
| Private messaging after mutual acceptance only | Static inbox/conversation UI complete; central eligibility checked before local send; direct unmatched routes locked, blocked/unmatched history read-only; no secure backend enforcement | W08/W11 |
| Free plan: ₹0, 3 outgoing Connect requests/day | Static comparison and session quota preview complete; incoming acceptance/matched conversations free; no billing | W08/W11 |
| Plus: ₹199/month, 15 outgoing/day, advanced filters, expanded Interested in You, personalized introductions | Static comparison/availability and session plan-switch preview complete; no subscription service | W08/W11 |
| Pro: ₹399/month, 40 outgoing/day, additional discovery preferences, priority introductions, Pro badge | Static comparison/availability and session plan-switch preview complete; no subscription service | W08/W11 |
| Welcome; demo login | Static UI complete (demo entry route) | W01 |
| Onboarding | Static/session demo complete; partial Living Identity update and optional shared Connect participation; no authentication | W08 |
| Messages; account notifications | Static inbox/canonical conversations complete with central consent gate and session-only outbound messages; eight preference controls; no live delivery | W08/W11 |
| Appearance | Shared root light/dark/system preference and preview; existing storage key retained; browser QA open | W01/W08 |
| Privacy; safety; help; account settings | Static sections and session notification/visibility preferences complete; shared Connect/Dating state, unblock confirmation, support preview; no real account/moderation service | W08/W11 |

## Non-negotiable product rules

- Normal social features remain free; Follow and Connect are separate.
- Private DMs require mutual Connect acceptance; premium cannot bypass consent.
- Accepting incoming requests and chatting with matches are free.
- Connect OFF pauses new discovery without deleting matches.
- Dating requires explicit 18+ opt-in and attestation.
- No guaranteed matches. Anti-spam introductions and blocking/reporting must be implemented before production discovery.
- Premium prices are product requirements, not a live checkout. Enforce plan quotas later without charging during the static frontend phases.

## Exit gates

W01 requires successful install, lint, build, route serving, responsive/theme/accessibility verification, and a Git checkpoint before claiming complete. Those checks remain open. W02 must be started only on explicit instruction. W12 must validate keyboard navigation, modal focus, contrast, reduced motion, screen reader semantics, mobile/tablet/desktop layouts, and every frontend workflow. W13 adds shared backend, durable storage, real authentication, moderation, rate limits, consent enforcement and production payment integration with real integration tests.

## W02 current checkpoint ? 2026-11-01

Static UI complete: premium feed, six post variants, story tray/full-screen overlay, segmented manual progress, reaction/reply demos, linked project/Reel CTA, immersive illustrated Reels, comment modal, post detail and related reflections, trending curiosities and suggested makers/Circles. Shared stable maker/post/story/Reel/comment/interest/Circle data. Root session provider shares follows, likes and bookmarks across routes.

Local demos only: following filters, like/save/follow/hide, story viewed status, comments, reply/reaction feedback, clipboard sharing and simulated playback/mute. No backend integrated. Persistent social behavior remains W09. Public creator links currently lead to the shared W01 profile preview with a maker query; individual profiles remain W04. Loading and unavailable UI exist. Build/lint and HTTP routes verified; visual/device/interaction/keyboard QA not performed. See W02_VERIFICATION.md for exact evidence and backup status. W03?W13 and Flutter remain unstarted.

## W03 checkpoint - 2026-11-01

Static UI complete: Explore hero and discovery grid, six categories, query suggestions/recent searches, trending filters, maker/post/Reel/Circle/project discovery cards; seven-format Create composer with illustrated media, tags/Circle/visibility, preview, draft status, validation and demo success; grouped Notifications with five categories, avatars/icons, individual/all-read actions, settings entry and empty states. Shared mock metadata reuses W02 identities/content and existing projects/Circles.

Local functionality complete only as demos: multi-word/category/interest filtering, session draft/history/read state, preview and validation. Automated tests verify search, draft validation and data links. Lint/build and HTTP route checks pass. Browser/device/keyboard/interaction QA NOT RUN. No uploads, persistent publishing, notification service or backend integrated. See W03_VERIFICATION.md for exact checks, file inventory, limits and checkpoint. W04 through W13 and Flutter remain unstarted.

## W04 checkpoint - 2026-11-01

Static UI complete: personal Living Identity dashboard, three canonical public maker profiles, four identity tabs, skill/interest/intention/highlight sections, personal timeline, project/Circle references, followers/following lists, profile sharing and editor. Local demos: session profile save/preview/cancel, chip and milestone editing, completion, unsaved-change notices and existing Follow integration. Shared-interest explanations use exact stated-interest intersections and respond to saved session edits. Connect/Message/safety actions explain their future behavior without creating relationships or messages.

Tested: profile data/validation/slug lookup/canonical links/shared-interest helpers and existing W03 tests; lint, production build and route serving. Browser/device/theme/keyboard/interactive editor checks NOT RUN. Backend integrated: No. Persistent identity functionality remains W10 and later backend integration. W05 and all subsequent phases remain unstarted. See W04_VERIFICATION.md. Historical W03 checkpoint statements above describe their original handoff, not current W04 status.

## W05 checkpoint - 2026-11-01

Static UI complete: branded Projects discovery; featured/recommended/curated trending cards; query/category/status/availability/star filters; four canonical project details; roadmap/milestone/activity/team/role visuals; creation preview; owned-project editor; collaboration request and owner inbox UI. Existing projects preserve their owners, and an additional owned demo enables editing/incoming request previews. Shared project cards and canonical references are integrated with Living Identity, public profiles, Explore, Feed and Stories.

Local demos: session project drafts/owned overrides/stars, validated request preview/submit, pending/cancel/accept/decline, accepted team/profile references and milestone-derived progress. No persistent publication or Connect/messaging access is created. No backend integrated. Fifteen automated tests, lint, production build and 42 HTTP checks pass. Browser/device/theme/keyboard/request-interaction checks NOT RUN. W06 and subsequent complete product phases remain unstarted. See W05_VERIFICATION.md. Prior phase checkpoint statements are historical handoffs.

## W06 checkpoint - 2026-11-01

Static UI complete: Circles discovery with query/category/curiosity/My Circles filters, featured/suggested communities and curated trending discussions; three canonical Circle details; five discussion routes; three membership-aware composer routes; members, guidelines, creator/moderator links and labeled safety previews. Shared Circle references are integrated with profiles, Explore, Feed, project interests, notifications and navigation.

Local demos: confirmed join/leave, synchronized membership/counts, reply append/validation, appreciation toggles, discussion draft/preview/validation and publish feedback. No persistent discussion publishing, server access enforcement, real moderation, Connect match or DM access. Backend integrated: No. Twenty-two tests, lint, production build and 58 HTTP checks pass. Browser/device/theme/keyboard/modal/interaction checks NOT RUN. W07 and subsequent complete product phases remain unstarted; W10 retains persistent Circle functionality and later phases retain production services. See W06_VERIFICATION.md. Prior checkpoint statements above are historical handoffs.

## W07 recovery checkpoint - 2026-11-01

Recovered the interrupted W07 implementation without discarding work. Static Connect UI and session helpers are complete; lint, 30 tests, build and production route serving pass. Browser QA remains NOT RUN. Existing W01-W06 sources and state are preserved. This checkpoint precedes W08 work. See W07_VERIFICATION.md for implementation and consent limitations.

## W08 checkpoint - 2026-11-01

W07 recovery was committed and verified first (e7f5e9d; documentation baa0d7e). W08 static UI complete: original plans/pricing/comparison/usage and confirmed demo switching; consent-aware inbox and three canonical conversation routes; ten Settings sections; light/dark/system appearance; notification/visibility preferences; shared Connect/Dating/safety state and unblock confirmation; welcome/login/onboarding and Help/support preview.

Local demos: valid-match-only message append, read-only history after unmatch/block, session preferences/onboarding/plan selection. Direct conversation URLs cannot create consent. No real authentication, subscription, delivery, moderation or backend. Lint, 35 tests, build and 86 production HTTP checks pass; browser/device/theme/modal/keyboard/hydration interactions NOT RUN. W09 and later complete functionality phases remain unstarted. See W08_VERIFICATION.md for both-stage evidence and limits. Prior phase checkpoint statements above are historical.

## W09 checkpoint - 2026-11-01

Session functionality complete: seven-format preview/confirmed publication, Feed/Stories/Reels insertion, scoped stable local IDs and unavailable-session detail state, shared likes/comments/bookmarks, actual Following/Saved selectors, hide/undo, own text edit/delete, local profile/discovery/activity integration and scoped keyboard media navigation. No remote media or server publication. Validation respects current project participation and Circle membership without mutating their workflows.

Tested: lint, 46 automated tests, build, 90 production HTTP checks and diff checks. Browser/device/theme/hydration/modal/interaction QA NOT RUN. No backend integrated. Existing consent, plans, messages, identity, project/Circle and preference state is retained. W10 and later complete phases remain unstarted. See W09_VERIFICATION.md; previous phase checkpoint statements are historical.

## W10 checkpoint - 2026-11-01

Session identity curation now supports ordered highlights, categorized/confirmed personal milestones and featured projects/local reflections. Local project publication feeds shared discovery/profile/W09 selectors and safe local detail/edit routes. Owner goals, roadmap/milestones, field notes, role availability and accepted collaborator removal use immutable helpers. Joined Circles publish local discussions with safe routes, own edit/delete, local replies/reactions and sorting. Original fixtures and W01-W09 state remain shared.

Lint, 58 tests, production build and 98 HTTP checks pass. Browser/device/keyboard/themes/hydration/interaction QA NOT RUN. No backend, persistence, production authorization or moderation. Connect/DM consent and original plan quotas remain separate. W11 is unstarted. See W10_VERIFICATION.md; earlier phase checkpoint statements are historical.

## W11 checkpoint - 2026-11-01

Canonical Connect now provides functional paid filters, editable personalized templates, expanded seeded-incoming summaries, local priority presentation and own Pro badges. Original opt-in/Dating/lifecycle/India-day quotas are retained and hardened. Root current-state commands protect request/message writes, with match-only inbox, read-only history, local read reminders and canonical consent-aware profile/notification links. No replies/interest/matches are fabricated.

Lint, 73 tests, production build and 98 HTTP checks pass. Browser/device/theme/keyboard/modal/hydration/end-to-end QA NOT RUN. W12 is unstarted; its handoff is detailed in W11_VERIFICATION.md. No backend, durable storage, payments, real-time delivery or production authorization. Earlier checkpoint statements remain historical.

## W12 stabilization checkpoint - 2026-11-02

Actual Chromium 156 interactions and axe were enabled through an isolated ignored QA tool install. Fixed repeated Connect URL/tab navigation, contrast, Feed keyboard tabs, invalid Story/notification ARIA, missing primary headings, corrupted shell characters and icon metadata. All 73 helper tests, lint/build, 99 HTTP checks, 14 browser interaction groups, 200 viewport/theme measurements and 62 axe scans pass; final tested runtime logs are clean. Five screenshots were manually inspected.

W12 final manual sign-off is OPEN for real devices, other browser engines, screen-reader/zoom/nested-dialog and exhaustive visual review. No known critical/high defect remains in executed scenarios, but no full website/production verification is claimed. W13 has not started. See W12_VERIFICATION.md and docs/qa/w12/results.json. Earlier NOT RUN statements remain historical phase evidence.


## W12.1 cross-browser stabilization checkpoint - 2026-11-02 to 2026-11-03

Verdict B: AUTOMATED FRONTEND QA PASS — MANUAL SIGN-OFF OPEN. Reused isolated Playwright/axe and added actual Windows Chromium, Firefox and WebKit workflow/route/accessibility runs. Fixed reproduced button activation/focus restoration in WebKit, surviving nested-dialog focus and closed mobile sidebar focus exposure. Seven viewports, light/dark, touch contexts, long local messages and CSS reflow equivalents extend W12 evidence without redesign or domain changes.

Physical Safari/iOS and Android, actual OS keyboards, manual NVDA/VoiceOver/Narrator, native browser zoom and exhaustive visual/scroll review remain open. Windows WebKit and touch emulation do not complete those gates. See W12_1_VERIFICATION.md and qa/w12-1/results.json for final separate verification layers and the manual checklist. Existing W01–W12 history/evidence, consent, original prices/quotas and refresh-reset session boundaries remain intact. No backend, production authentication, payments, uploads, real-time delivery, new persistence or mobile code was added. W13 remains unstarted. Earlier checkpoint coverage statements remain historical.

W12.1 final evidence: 73 helper tests; 99 HTTP checks; 42 retained browser workflow groups plus 15 added functional groups; 177 direct route loads; 840 primary layout, 336 additional input/viewport and 216 CSS-reflow measurements; 192 selected-rule axe scans. Final monitored runs are clean. Earlier WebKit prefetch diagnostics remain documented with unconfirmed attribution. These counts do not complete physical-device, native-zoom or manual AT gates.


## W12.3 premium social UI redesign - 2026-11-03

Frontend presentation redesign: locally bundled Plus Jakarta Sans, semantic theme/surface/control tokens, grouped social navigation and branded mobile shell, editorial Feed/Stories/Reels/Explore, personal profile hierarchy, creative project/community cards, optional Connect, conversations and plan presentation, creation/preferences/activity and remaining screens. Original framework, fixtures, session stores, pricing, ownership and mutual messaging consent remain intact.

See W12_3_UI_REDESIGN_VERIFICATION.md and qa/w12-3 for exact final browser/helper/HTTP/accessibility results, before/after evidence and iteration findings. Physical-device, actual keyboard/safe-area, manual AT, native zoom and exhaustive human sign-off remain open. No backend, database, authentication, checkout, message delivery, new persistence or mobile application phase was started. W13 is not started. Earlier phase evidence remains historical.

W12.3 final automated evidence: lint, 73 helper tests and production build pass; 99 HTTP checks, 42 retained workflow groups, 15 additional functional groups, 192 axe scans and 42 local-font/touch/reduced-motion design cases pass across the three available Windows engines. Exact 177-route and viewport/reflow matrices, before/after captures and intermediate observations are in the W12.3 report. Manual physical-device/AT/native-zoom sign-off remains OPEN.
