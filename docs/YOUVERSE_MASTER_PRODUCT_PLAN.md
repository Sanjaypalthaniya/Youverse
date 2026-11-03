# Canonical product specification

The following original brief preserves the complete product scope. W01 implementation status is tracked separately in YOUVERSE_WEB_REBUILD_ROADMAP.md. Website first; Flutter/Dart mobile only after web finalization. No backend, real authentication or payments in W01.

# YOUVERSE — COMPLETE WEBSITE REBUILD
## Phase W01: Fresh Next.js Foundation, Original Design System & Master Product Roadmap

We are rebuilding the original YOUVERSE project from scratch because the previous project files were lost.

**Important change in development order:**

1. Build the COMPLETE YOUVERSE website first.
2. Finalize its UI, UX and frontend functionality.
3. Build the Android/iOS application afterward using Flutter and Dart.
4. Integrate a shared production backend in later phases.

**Do not create a Flutter or mobile application during the website rebuild.**

## 1. Original Product Vision

YOUVERSE is an identity-first social platform that combines familiar social networking features with meaningful self-expression, Living Identity, communities, projects and intentional connections.

We are rebuilding the SAME original product, not inventing a different application.

The website must be premium, expressive, modern, accessible and visually consistent.

### Preserve the Complete Feature Scope

**Core Social**
- Home Feed
- For You, Following and Saved filters
- Reflections and posts
- Image/media posts
- Stories
- Full-screen Story Viewer
- Reels
- Explore
- Search
- Post creation
- Likes, comments, bookmarks, sharing
- Follow/unfollow
- Notifications
- Public profiles
- Reporting, hiding and blocking

**Living Identity**
- Profile overview
- Profile editing
- Bio and craft
- Skills
- Interests and curiosities
- Intentions
- Identity highlights
- Milestones
- Personal growth journey
- Reflections
- Projects
- Public creator profiles

**Projects**
- Project discovery
- Project creation and editing
- Project details
- Project status
- Roadmap and milestones
- Progress field notes
- Stars
- Collaboration requests
- Collaboration roles
- Owner request management

**Circles**
- Circle discovery
- Circle details
- Membership
- Member lists
- Discussions
- Replies and reactions
- Circle guidelines
- Topic discovery

**YOUVERSE Connect**

Five intentions:
- Friendship
- Dating (18+)
- Collaboration
- Mentorship
- Networking

Features:
- Optional Connect discovery
- Shared curiosities
- Intent filters
- Discovery preferences
- Incoming requests
- Outgoing requests
- Accept/decline/cancel
- Mutual matches
- Interested in You
- Unmatch
- Block/report
- Connect ON/OFF
- Dating opt-in with 18+ attestation
- Anti-spam introductions
- Private messaging after mutual acceptance only

**Premium Plans**

Free:
- ₹0
- 3 outgoing Connect requests/day

Plus:
- ₹199/month
- 15 outgoing Connect requests/day
- Advanced filters
- Expanded Interested in You
- Personalized introductions

Pro:
- ₹399/month
- 40 outgoing Connect requests/day
- Additional discovery preferences
- Priority introductions
- Pro badge

Important rules:
- Normal social features remain free.
- Follow and Connect are separate.
- Private DMs require mutual Connect acceptance.
- Premium cannot bypass consent.
- Accepting incoming requests and chatting with matches are free.
- Connect OFF pauses new discovery without deleting matches.
- Dating requires explicit 18+ opt-in.
- No guaranteed matches.

**Account & Settings**
- Welcome
- Demo login
- Onboarding
- Notifications
- Messages
- Appearance
- Privacy
- Safety
- Help
- Account settings

Document all of these requirements for future phases.

## 2. Technology Stack

Use:

- Next.js 16 App Router
- JavaScript and JSX
- React
- Bootstrap 5
- SCSS
- Lucide icons or an equivalent consistent icon system
- Local mock data initially
- Local frontend state initially

Do not use TypeScript unless absolutely necessary.

Do not add a backend, database, payment gateway or real authentication in W01.

Do not create React Native, Expo or Flutter code.

## 3. Original YOUVERSE Branding

Use the established design tokens:

- Primary Violet: #7555E8
- Deep Violet: #5133C9
- Soft Violet: #F1EDFF
- Coral Accent: #FF7285
- Lime Accent: #C8F169

Design requirements:
- Premium, clean social interface
- Elegant typography
- Rounded cards
- Soft gradients
- Beautiful spacing
- Modern icons
- Light/dark mode architecture
- Responsive desktop, tablet and mobile layouts
- Consistent navigation
- Smooth hover and focus states
- Accessible controls

Do not create a generic Bootstrap-looking dashboard.

## 4. W01 — Implement Now

Create a clean, working Next.js project.

Build:

1. Global SCSS design tokens and theme architecture.
2. Shared website layout.
3. Responsive desktop sidebar navigation.
4. Responsive mobile bottom navigation.
5. Top navigation/header with search, notifications and messages entry points.
6. Reusable UI components:
   - Buttons
   - Cards
   - Avatars
   - Badges
   - Inputs
   - Tabs
   - Modals
   - Empty states
   - Loading states
   - Post card foundation
7. Branded welcome page.
8. Static demo login page.
9. Main Home Feed layout with realistic sample posts.
10. Initial static route shells for:
    - Explore
    - Reels
    - Create
    - Connect
    - Messages
    - Notifications
    - Profile
    - Projects
    - Circles
    - Settings
11. Navigation between the routes.
12. Working light/dark theme toggle.

All route shells must have visually meaningful layouts, not empty pages.

Use realistic, consistent mock users and content.

## 5. Master Documentation

Create:

`docs/YOUVERSE_MASTER_PRODUCT_PLAN.md`

Record the complete product vision and every feature listed in this prompt.

Create:

`docs/YOUVERSE_WEB_REBUILD_ROADMAP.md`

Include these phases:

W01 — Foundation, Design System, Navigation
W02 — Static Feed, Stories, Reels
W03 — Static Explore, Search, Create, Notifications
W04 — Static Living Identity & Profiles
W05 — Static Projects & Collaboration
W06 — Static Circles & Communities
W07 — Static Connect Discovery & Matching
W08 — Static Premium, Messages & Settings
W09 — Social Frontend Functionality
W10 — Identity, Projects & Circles Functionality
W11 — Connect, Premium & Messaging Functionality
W12 — Responsive QA, Accessibility & Final Web Verification
W13 onward — Backend & Production Features

For every feature, track:
- Not started
- Static UI complete
- Local functionality complete
- Backend integrated
- Tested

Do not mark unfinished functionality as complete.

Also document that the future mobile application MUST use Flutter/Dart, after the website is finalized.

## 6. Project Quality

Run:

- `npm install`
- `npm run lint` (if configured)
- `npm run build`

Fix all actual errors.

Ensure the website runs locally.

Set up Git if necessary and commit the W01 checkpoint.

Add a `.gitignore` excluding dependencies, build artifacts, environment secrets and generated files.

If a Git remote is already configured, inspect it before changing anything. Never overwrite an existing remote or force-push.

## 7. Final Report

Provide:
- Project structure
- Implemented routes
- Shared components
- Design system
- Commands executed
- Actual PASS/FAIL results
- Remaining limitations
- Git commit hash
- Next phase readiness

**Strict Instructions:**

- This is the original YOUVERSE product rebuild.
- Website first, Flutter later.
- Static-first implementation.
- Preserve the entire original feature scope.
- No unnecessary rewrites.
- No fake test results.
- No missing features silently ignored.
- Do not begin W02 automatically.

**START W01 NOW AND STOP AFTER W01.**


## Current implementation checkpoint ? W02, 2026-11-01

The original specification above remains the canonical future product scope. W02 adds static Feed, Stories, Reels and Post Detail using the W01 shell, Next.js 16, JSX, Bootstrap 5 and SCSS. Session interactions are demos, not persistent social functionality or production moderation. Reels are original CSS illustrations with explicitly simulated playback/audio. Individual creator profiles remain W04. No backend, database, payment, authentication, real private messaging or mobile application was added. Mutual acceptance for private messages, Dating 18+ opt-in, all Premium rules and the Flutter-after-web sequence remain unchanged. See the roadmap and W02_VERIFICATION.md for current verification. W03 has not begun.


## W03 implementation checkpoint - 2026-11-01

Static Explore/Search, multi-format Create and Notifications are implemented. Discovery reuses existing makers, posts, Reels, projects and Circles. Search is client-side over fixtures; drafts, history and notification reads are session demos; preview and Publish feedback do not upload or publish content. Visibility has no production access enforcement. Existing W01/W02 remain in place. Full public profiles remain W04; all W04-W13 work remains unstarted. The complete original feature scope above remains authoritative.

Product rules remain unchanged: Follow and Connect are separate; Free 3 outgoing/day, Plus 15/day at INR 199/month, Pro 40/day at INR 399/month; private DMs require mutual Connect acceptance; incoming acceptance and matched conversations are free; Connect discovery is optional; Dating requires explicit 18+ opt-in. Normal social features remain free and Premium cannot bypass consent. No real authentication, database, payments or backend were added. Flutter/Dart mobile begins only after the website is finalized. Consult W03_VERIFICATION.md and the roadmap for actual tests and limitations.


## W04 implementation checkpoint - 2026-11-01

Static Living Identity, profile editing and canonical public maker profiles are implemented. Structured identities reuse existing stable maker IDs, reflections, interests, projects and Circles. Profiles show skills, intentions, highlights, milestones, memberships and explainable shared interests. The existing Follow system is preserved. The editor applies validated session-only changes and provides preview/cancel/unsaved-change UI; no refresh persistence, uploads or real authentication exists. Public maker links resolve to their actual creators. The own dashboard does not attribute another maker's posts to Aarav.

Follow remains free and separate from Connect; Message explains the mutual-acceptance gate without opening a conversation. No Connect request, match, moderation report, block, subscription or payment is created. The original Free 3/day, Plus 15/day at INR 199/month, Pro 40/day at INR 399/month rules remain unchanged; incoming acceptance and matched conversations are free; Dating remains optional and 18+; no guaranteed matches. Flutter/Dart follows website finalization. W05 is not started. Full identity persistence belongs to later frontend/backend phases, and browser/device/accessibility QA remains open. Consult W04_VERIFICATION.md for file inventory, actual checks, limitations and Git checkpoint.


## W05 implementation checkpoint - 2026-11-01

Static Projects and Collaboration UI is implemented: discovery and filters, four canonical project details, roadmap/milestone progress, field notes, contributors, stars/sharing, creation previews, owned-session editing and project request submit/preview/pending/cancel/accept/decline. Existing maker identities and the original three projects are retained; Small Beginnings is an additional Aarav-owned demo fixture. Profiles, Explore, Feed, Stories and project notifications use canonical project references. The existing root provider stores session project data without replacing prior state.

Creation keeps a draft and validates a publishing preview without creating a public project. Edits/stars/requests are session-only and reset on refresh. Ownership and visibility are UI metadata, not secure authorization or enforcement. No uploads, backend, real authentication, payments, messaging, notifications or moderation service was added. Project collaboration is separate from Connect: acceptance does not create a match or unlock private DMs. Follow/Connect separation, mutual acceptance, free incoming acceptance and matched conversations, optional discovery, Dating 18+ opt-in, no guaranteed matches, Free 3/day, Plus 15/day at INR 199/month and Pro 40/day at INR 399/month remain unchanged. Flutter/Dart begins after website completion.

W06 has not started. Full project persistence/functionality remains in later frontend/backend phases. Consult W05_VERIFICATION.md and the roadmap for actual tests, file inventory, limits and Git checkpoint. Browser/device/interaction testing was not available and remains open.


## W06 implementation checkpoint - 2026-11-01

Static Circles and Communities UI is implemented: discovery/search/category/curiosity filters, My Circles, three canonical detail pages, five discussion pages, per-Circle composers, confirmed join/leave, member lists, guidelines, moderator information and moderation explanations. Existing Creative Corner/Mindful Moments IDs and member totals are preserved; Builders & Dreamers replaces the earlier shell with a consistent community fixture. Profiles, Explore, Feed, project recommendations and notifications use canonical Circle links and shared data.

The existing root provider owns session membership, reply, reaction and draft state. New discussion creation validates a publishing preview without creating a persistent discussion. Public fixture discussions can be read without joining; composer/reply/reaction membership gating is UI-only, not secure access control. Counts are fixture aggregates and named member lists are labeled samples. No backend, database, authentication, payment, real message, notification, report, block or moderation service is introduced. Joining a Circle does not create a Connect match, change Follow or project collaboration, consume quotas or unlock private DMs.

Normal social features remain free; Follow and Connect are separate; private DMs require mutual Connect acceptance; incoming acceptance and matched conversations are free. Free 3/day, Plus 15/day at INR 199/month, Pro 40/day at INR 399/month, optional discovery, Dating 18+ opt-in and no guaranteed matches remain unchanged. Flutter/Dart starts only after website completion. W07 has not started. See W06_VERIFICATION.md for actual tests, file inventory, limitations and Git checkpoint; browser/device/interactive accessibility QA remains open.


## W07 recovery checkpoint - 2026-11-01

Connect static discovery, four views, five intentions, explicit Dating opt-in and independent 18+ demo attestation, session requests/matching, original plan quotas and safety controls are implemented. Existing identities are reused. Only valid incoming Connect acceptance creates a match; Follow, project collaboration and Circle membership remain separate. Premium never grants messaging consent. Settings, quotas, requests, blocks and eligibility remain session demos without production enforcement, real messages, payments, authentication or age verification. W07 recovery reran lint, 30 tests, production build and route serving successfully before commit. See W07_VERIFICATION.md. Flutter follows website completion.


## W08 recovery and implementation checkpoint - 2026-11-01

Stage A recovered W07 as e7f5e9dbe6a3609de63fda25dfa28e04a6208feb, followed by hash documentation commit baa0d7e, after fresh lint, 30 tests, build, diff and 43-page production HTTP verification. No work or history was discarded. Stage B then implemented Premium pricing/feature/usage previews, canonical consent-gated conversations and session message history, ten Settings sections, shared light/dark/system appearance, notification/visibility preferences, shared Connect/Dating preferences, safety/unblock confirmation, welcome/login refinement, onboarding and Help.

The existing Connect plan/quota/canMessage model remains authoritative. Only valid mutual acceptance permits local sending. Follow, outgoing/incoming pending, project acceptance, Circles and Premium never grant access. Block/unmatch closes sending; Connect OFF preserves matches/histories. No accessible private conversation is seeded, no incoming message fabricated, and no payment, authentication, backend, upload, delivery, read receipt, moderation or real-time service added. Profile visibility, notifications, age attestation and quotas are previews. Only appearance persists; other new data resets on refresh. Incoming acceptance and matched conversations stay free; original prices/limits and Flutter-after-web sequence are unchanged. W09 has not started. See W08_VERIFICATION.md for exact checks, limitations, files and both-stage Git backup status.


## W09 session-social checkpoint - 2026-11-01

W08 HEAD ca653ab and implementation 95d177fdc57b8c2ce01d23d769549c446966f445 were inspected before a clean W09 start. Seven-format local publication now inserts into Feed, Stories or Reels with tab-scoped IDs, root comments, shared reactions/bookmarks/Follow selection, hide/undo and own local text edit/delete. Local detail routes explain unavailable sessions instead of fabricating a record. Explore, own profile reflections and local own-publication activity consume the same data. Existing fixtures and W01-W08 identity/project/Circle/Connect/message/preferences state are preserved.

Project Updates require valid ownership/collaboration; Circle references require joined membership. Feed publication does not change roadmaps, create discussions or bypass consent. No backend, database, remote media, real authentication, payment, messaging service or new persistent storage is added. All social publications are visible only in this tab and reset on refresh. Follow is separate from Connect; original quotas/prices, private mutual-match-only messaging, optional Dating with explicit 18+ attestation and Flutter-after-web rules remain unchanged. Lint, 46 tests, build and 90 HTTP checks pass; browser/device/hydration/interaction QA NOT RUN. W10 is unstarted. See W09_VERIFICATION.md for exact scope, limits and Git checkpoint.

## W10 identity and community checkpoint - 2026-11-01

Implemented session-based identity highlight ordering/editing, categorized personal milestones and confirmed removal, featured projects/local reflections with safe references, local project creation/detail/edit/selectors, owner goals/roadmap/progress/field notes, filled-role collaboration and confirmed accepted-collaborator removal. Circle membership remains centralized; joined members publish local discussions, edit/delete own discussions/replies and use live reactions/counts/sorting. Canonical fixture routes remain intact; missing local records explain their session limitation.

Existing SocialProvider state is extended with deleted local project IDs and local discussions; project records use existing overrides. W09 content, current identity, project/Circle selectors, Explore and profiles remain synchronized. All data resets on refresh except the existing appearance preference. No backend, database, authentication, payments, remote media, production security or new persistence. Project/Circle actions never create Connect matches, alter quotas or unlock DMs.

Lint, all 58 tests, build and 98 HTTP checks pass. Browser/device/theme/focus/hydration/end-to-end QA NOT RUN. W11 has not started; existing consent-aware plans/messages/settings remain its handoff. Prices/limits, free social features/incoming acceptance/matched conversations, explicit Dating plus independent 18+ attestation and Flutter-after-web remain unchanged. See W10_VERIFICATION.md for complete verification, route semantics, limitations, files and actual Git checkpoint. Earlier checkpoint statements are historical.

## W11 Connect, Premium and Messages checkpoint - 2026-11-01

W10 was verified committed before a clean W11 start. Connect remains opt-in with all five intentions and independent explicit Dating/18+ flags. Requests validate shared intentions, duplicates and original quotas; only valid incoming acceptance creates a send-eligible match. Paid filters, expanded actual seeded-incoming summaries, editable templates, local priority presentation and own session Pro badges now provide meaningful plan capabilities. They never create interest, buy consent or guarantee matches. Original Free 3/day, Plus 15/day at INR 199/month and Pro 40/day at INR 399/month are unchanged; switching retains usage and incoming acceptance/matched chat remain free.

The existing root state/model is reused with current-state command writers. Match-only inbox, separate read-only history, local message validation/timestamps, personal read/unread reminders, and consent-aware profile/notification destinations use canMessage. Block/unmatch immediately close sending, OFF preserves valid conversations and unblock never restores consent. W09/W10 social/project/Circle workflows remain separate and their tests pass.

No production backend, database, authentication, payments, WebSockets, uploads, message delivery or new persistence. All new state resets on refresh except the pre-existing appearance preference. Lint, 73 tests, build and 98 HTTP checks pass; browser/device/hydration/interactions NOT RUN. W12 has not started. See W11_VERIFICATION.md for limits, actual evidence, inventory and Git checkpoint. Flutter/Dart follows website finalization. Earlier checkpoint statements are historical.

## W12 QA and stabilization checkpoint - 2026-11-02

Confirmed clean committed W11, reviewed prior verification gates, and enabled actual Chromium 156 browser QA through isolated Playwright/axe under ignored .tools. This is stabilization only: corrected contrast, Feed keyboard tabs/semantics, repeated Connect URL/tab navigation, Story/notification ARIA, primary headings, shell encoding and icon metadata. Original domain rules, pricing, consent, fixtures and session state remain unchanged.

Verified independently: lint, 73 existing helper tests, production build, 99 HTTP checks; 14 real browser workflow groups; 200 route/viewport/theme measurements; 62 axe route/dialog scans; clean final observed runtime logs; five screenshot frames visually reviewed. Physical-device/other-engine/screen-reader/zoom and exhaustive visual QA are not claimed. W12 final manual sign-off remains OPEN, with evidence and checklist in W12_VERIFICATION.md. No W13/backend work started, no production readiness declared, and Flutter/Dart stays after web finalization.


## W12.1 cross-browser stabilization checkpoint - 2026-11-02 to 2026-11-03

Verdict B: AUTOMATED FRONTEND QA PASS — MANUAL SIGN-OFF OPEN. Reused isolated Playwright/axe and added actual Windows Chromium, Firefox and WebKit workflow/route/accessibility runs. Fixed reproduced button activation/focus restoration in WebKit, surviving nested-dialog focus and closed mobile sidebar focus exposure. Seven viewports, light/dark, touch contexts, long local messages and CSS reflow equivalents extend W12 evidence without redesign or domain changes.

Physical Safari/iOS and Android, actual OS keyboards, manual NVDA/VoiceOver/Narrator, native browser zoom and exhaustive visual/scroll review remain open. Windows WebKit and touch emulation do not complete those gates. See W12_1_VERIFICATION.md and qa/w12-1/results.json for final separate verification layers and the manual checklist. Existing W01–W12 history/evidence, consent, original prices/quotas and refresh-reset session boundaries remain intact. No backend, production authentication, payments, uploads, real-time delivery, new persistence or mobile code was added. W13 remains unstarted. Earlier checkpoint coverage statements remain historical.

W12.1 final evidence: 73 helper tests; 99 HTTP checks; 42 retained browser workflow groups plus 15 added functional groups; 177 direct route loads; 840 primary layout, 336 additional input/viewport and 216 CSS-reflow measurements; 192 selected-rule axe scans. Final monitored runs are clean. Earlier WebKit prefetch diagnostics remain documented with unconfirmed attribution. These counts do not complete physical-device, native-zoom or manual AT gates.


## W12.3 premium social UI redesign - 2026-11-03

Frontend presentation redesign: locally bundled Plus Jakarta Sans, semantic theme/surface/control tokens, grouped social navigation and branded mobile shell, editorial Feed/Stories/Reels/Explore, personal profile hierarchy, creative project/community cards, optional Connect, conversations and plan presentation, creation/preferences/activity and remaining screens. Original framework, fixtures, session stores, pricing, ownership and mutual messaging consent remain intact.

See W12_3_UI_REDESIGN_VERIFICATION.md and qa/w12-3 for exact final browser/helper/HTTP/accessibility results, before/after evidence and iteration findings. Physical-device, actual keyboard/safe-area, manual AT, native zoom and exhaustive human sign-off remain open. No backend, database, authentication, checkout, message delivery, new persistence or mobile application phase was started. W13 is not started. Earlier phase evidence remains historical.

W12.3 final automated evidence: lint, 73 helper tests and production build pass; 99 HTTP checks, 42 retained workflow groups, 15 additional functional groups, 192 axe scans and 42 local-font/touch/reduced-motion design cases pass across the three available Windows engines. Exact 177-route and viewport/reflow matrices, before/after captures and intermediate observations are in the W12.3 report. Manual physical-device/AT/native-zoom sign-off remains OPEN.
