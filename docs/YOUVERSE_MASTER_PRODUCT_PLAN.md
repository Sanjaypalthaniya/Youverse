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
