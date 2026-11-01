# YOUVERSE web rebuild roadmap

Website first. Finalize the complete website UI, UX and frontend functionality before starting the Android/iOS application in **Flutter and Dart**. Shared production backend integration begins in W13 onward. W01 contains no backend, database, real authentication or payments. W02–W06 static UI is implemented; see the phase verification reports. W07 has not begun.

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
| W07 | Static Connect Discovery & Matching | Not started; W01 shell only |
| W08 | Static Premium, Messages & Settings | Not started; W01 shells only |
| W09 | Social Frontend Functionality | Not started; like/bookmark/session filters are foundation demos |
| W10 | Identity, Projects & Circles Functionality | Not started |
| W11 | Connect, Premium & Messaging Functionality | Not started |
| W12 | Responsive QA, Accessibility & Final Web Verification | Not started |
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
| Home Feed | Static UI complete (foundation only) | W02/W09 |
| For You, Following, Saved filters | Session demo only; full functionality not started | W02/W09 |
| Reflections and posts; image/media posts | Static UI complete (sample cards); creation not started | W02/W09 |
| Stories; full-screen Story Viewer | Static UI complete; manual viewer, reactions and reply demos; no publishing | W02/W09 |
| Reels | Static UI complete; illustrated simulation, unavailable state, comment modal; no streaming | W02/W09 |
| Explore; search | Static UI complete; multi-category query/interest filtering and session history; unit-tested, no backend | W03/W09 |
| Post creation | Static UI complete; seven-format session draft, validation and preview; no uploads or real publishing | W03/W09 |
| Likes; comments; bookmarks; sharing | Session likes/bookmarks/comments and clipboard links; persistence not started | W09 |
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
| Connect friendship; dating (18+); collaboration; mentorship; networking | Not started (W01 intention copy/sample people) | W07/W11 |
| Optional discovery; shared curiosities; intent filters; discovery preferences | Not started | W07/W11 |
| Incoming and outgoing requests; accept/decline/cancel | Not started | W07/W11 |
| Mutual matches; Interested in You; unmatch | Not started | W07/W11 |
| Connect block/report; ON/OFF | Not started | W07/W11 |
| Dating opt-in with 18+ attestation; anti-spam introductions | Not started | W07/W11 |
| Private messaging after mutual acceptance only | Not started (W01 inbox explanation) | W08/W11 |
| Free plan: ₹0, 3 outgoing Connect requests/day | Not started | W08/W11 |
| Plus: ₹199/month, 15 outgoing/day, advanced filters, expanded Interested in You, personalized introductions | Not started | W08/W11 |
| Pro: ₹399/month, 40 outgoing/day, additional discovery preferences, priority introductions, Pro badge | Not started | W08/W11 |
| Welcome; demo login | Static UI complete (demo entry route) | W01 |
| Onboarding | Not started | W08 |
| Messages; account notifications | Messages remain W01 shell; notification static center complete in W03, no live account activity | W08/W11 |
| Appearance | Theme toggle source complete; remaining controls not started | W01/W08 |
| Privacy; safety; help; account settings | Not started (W01 explanatory shells only) | W08/W11 |

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
