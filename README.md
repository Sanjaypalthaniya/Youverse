# YOUVERSE - W12.3 premium social UI

Identity-first social website using Next.js 16 App Router, JavaScript/JSX, Bootstrap 5, SCSS and Lucide. Static-first, centralized mock data, lightweight session state.

## Run

Use a supported Node.js version and npm:

```sh
npm install
npm run lint
npm test
npm run build
npm run dev
```

Open http://localhost:3000. Production: npm run build, then npm start.

## Implemented

W01 supplies the shared shell, desktop sidebar, mobile bottom navigation, theme and UI primitives. W02 supplies the Feed, Stories, illustrated Reels, PostCard and six /post/[id] pages. W03 upgrades /explore with search, suggestions, recent searches, categories and filters; /create with seven content formats, validation and preview; /notifications with grouped/filterable activity and session read actions.

W04 adds a Living Identity dashboard at `/profile`, session-only profile editing at `/profile/edit`, and canonical public maker profiles at `/profile/ananyacreates`, `/profile/kabir.builds` and `/profile/meerawanders`. Profiles include skills, curiosities, intentions, highlights, milestones, existing projects and Circle memberships. Shared-curiosity explanations use actual interest intersections. Follow uses the existing W02 session state; Message only explains the mutual-Connect requirement.

W05 upgrades Projects discovery, four canonical detail pages, project creation previews, an owned-project session editor, milestone progress, field notes, stars and collaboration introductions. The three original projects retain their owners. A fourth, Small Beginnings, is an Aarav-owned demo for editing and incoming accept/decline workflows. Accepting project collaboration never creates a Connect match or unlocks private DMs.

W06 adds Circle discovery, three community detail pages, five discussion pages, per-Circle discussion composers, join/leave confirmations, session replies/reactions, named member lists, guidelines and clearly labeled moderation previews. Joining a Circle never creates a Connect match or unlocks DMs.

W07 upgrades `/connect` with Discover/Signals/Incoming/Matches, five intentions, explicit Dating opt-in and 18+ demo attestation, request/duplicate/quota validation, match celebration, block/unblock/unmatch, safety/preferences and plan comparison previews. Discovery starts paused; two clearly seeded incoming introductions let you explore free acceptance and mutual matches. Public profiles, Explore People and suggested makers use the same Connect state. W07 was safely recovered as `e7f5e9d`, with documentation checkpoint `baa0d7e`.

W08 adds `/premium` with original pricing, comparison, quota usage and confirmed demo switching; a consent-gated `/messages` inbox and `/messages/[makerSlug]` conversations; ten Settings sections; Safety, Help, welcome/login refinement and demo onboarding. Only valid mutual matches expose a local message composer. No accessible conversations are seeded; accept an existing incoming Connect introduction first. Unmatch/block disables sending while existing local history can remain read-only.

W09 adds actual session-only social publishing: reflection/image/question/milestone/project/Circle posts enter the Feed, Stories enter the tray, and Reels enter the vertical view. Preview and explicit confirmation precede publication. Shared likes/comments/bookmarks, hide/undo, own-content text edits/deletion, local detail routes, profile reflections, search and own-action notifications stay synchronized during client navigation. W10 session identity/project/Circle workflows are implemented below.

Routes: /, /welcome, /login, /explore (supports ?q=...), /reels, /create, /connect, /messages, /notifications, /profile, /profile/edit, the three maker profiles above, /projects, /circles, /settings, /post/1 through /post/6. Invalid sections/posts/maker slugs return 404. Creator links resolve to the matching maker; Project, Circle and Connect workflows remain previews. `/profile` always shows the signed-in demo identity, including when old maker query parameters are present. Public URLs use the canonical slugs, not internal maker IDs.

Project routes: `/projects/create`, `/projects/the-little-library`, `/projects/everyday-illustrated`, `/projects/slow-sunday-club`, `/projects/small-beginnings`. Add `/edit` for the editor route: Small Beginnings exposes the demo owner form; other existing projects show a UI ownership explanation. Unknown project slugs return 404. No secure authorization is claimed.

Circle routes: `/circles/the-creative-corner`, `/circles/mindful-moments`, `/circles/builders-and-dreamers`. Each supports `/discussion/create` and fixture discussions at `/discussion/[discussionId]`. Unknown Circle/discussion slugs and cross-Circle discussion IDs return 404. Details include Members and Guidelines views. Creative Corner and Mindful Moments are joined initially; Builders & Dreamers demonstrates joining from outside a Circle.

## Source

- app/layout.jsx, app/globals.scss: shared layout, Bootstrap and theme tokens.
- app/social.scss, components/Social.jsx, data/social.js: W02 social UI and mock entities.
- app/discovery.scss: W03 responsive/theme styling.
- components/Discovery.jsx: Explore/search, discovery cards and shared category controls.
- components/Composer.jsx, components/Notifications.jsx: W03 composer and notification center.
- components/SocialProvider.jsx: preserved social state plus draft/history/notification read state.
- data/discovery.js: shared discovery metadata/index, filtering, validation and notification fixtures.
- tests/discovery.test.mjs: search, validation and fixture-link tests.
- data/identity.js: one structured identity source for makers and Aarav, lookup, shared interests, completion and validation.
- components/Identity.jsx, components/IdentityEditor.jsx, app/identity.scss: W04 dashboard/public profiles, editor and responsive styling.
- app/profile/: own profile, explicit edit route, canonical maker route and maker not-found page.
- tests/identity.test.mjs: profile data, validation, lookup, links, completion and shared-curiosity tests.
- data/projects.js: canonical project fixtures, references, filtering, validation, progress and project-request lifecycle helpers.
- components/Projects.jsx, components/ProjectUI.jsx, components/ProjectEditor.jsx, components/useProjects.js: discovery/detail, reusable project visuals, session editor and shared state adapter.
- app/projects/, app/projects.scss, tests/projects.test.mjs: project routes, styling and six project tests.
- data/circles.js: canonical Circle/discussion/reply fixtures, membership, validation, filtering and interaction helpers.
- components/Circles.jsx, components/CircleUI.jsx, components/CircleDiscussion.jsx, components/CircleComposer.jsx, components/useCircles.js: W06 screens, shared visuals and root-session adapter.
- app/circles/, app/circles.scss, tests/circles.test.mjs: Circle routes, responsive styling and seven Circle tests.
- data/connect.js: canonical Connect preferences, intentions, plans, request lifecycle, quotas, discovery and messaging-eligibility helpers; maker identities are references to the existing source.
- components/Connect.jsx, components/ConnectUI.jsx, components/ConnectMessages.jsx, components/useConnect.js, app/connect.scss: W07 screens, shared consent controls and session adapter.
- tests/connect.test.mjs: eight Connect/consent tests.
- data/account.js, components/Premium.jsx, components/Messages.jsx, components/Account.jsx: W08 plan availability, message/settings helpers and screens, onboarding, safety and support.
- app/premium/, app/messages/[makerSlug]/, app/settings/[section]/, app/onboarding/, app/help/, app/account.scss: W08 routes and styling.
- tests/account.test.mjs: five W08 plan, consent, message, preference and onboarding tests.
- data/sessionSocial.js, components/useSocialContent.js: immutable publication/interaction helpers, selectors and root session-content adapter.
- components/SocialContent.jsx, components/SessionComposer.jsx, app/session-social.scss: W09 social screens and confirmed local publication, retaining the original design primitives.
- tests/social-session.test.mjs: eleven social-session regression tests.
- docs/: canonical product plan, roadmap and phase verification reports.

## Demo boundaries and verification

Theme preference persists locally. Drafts, recent searches, notification reads and social demos last within the current tab's client navigation and reset on refresh. Public social comments and Circle replies live in the root session state. Story replies/reports remain previews; W09/W10 publication creates local session records. No real upload, publication, search service, notification delivery, authentication, payment or private messaging exists. Reels use clearly simulated playback/audio controls and CSS artwork. Visibility is preview metadata. Flutter/Dart mobile follows completion of the website.

Profile Save updates the shared session identity used by the dashboard, shell, composer and local comments. Refresh restores the fixture. Editor links, Cancel and header search warn before discarding unsaved changes; refresh/close uses the browser's unload warning where supported. Client back/forward retains the edit draft in the root provider. Profile/cover images are illustrated placeholders only. Aarav starts without fixture reflections; his Reflections tab displays his own W09 local posts when published. Own-profile sharing copies a local-demo route; it does not publish session edits to other tabs or people.

Project editing updates the existing owned fixture across project/profile/Explore cards in this tab; refresh resets it. W10 project creation previews/confirms a local record and detail URL, synchronized with discovery/profile/social selectors. New records reset on refresh. Request submit/cancel/accept/decline and accepted team membership are session-only demos. No request, notification or message is sent. Stars are separate from Feed bookmarks. Milestone completion determines project progress. Cover artwork is an illustration, not an upload; visibility is unenforced preview metadata. Editor links/Cancel/header search warn about unsaved changes, refresh uses a browser unload prompt where supported, and client back/forward retains drafts.

Circle membership, member-count deltas, replies, appreciation and discussion drafts last for the current tab session and reset on refresh. My Circles, profile memberships and member lists use the same state. W10 discussion creation previews/confirms a local discussion and URL inside a joined Circle. Own local discussions/replies can be edited or deleted; records reset on refresh. Replies are appended locally to fixture or local discussions. Joining is a UI requirement for composer/reply/reaction controls, not server-enforced access control. Member totals are fixture aggregates; named member lists are labeled samples. Reports and blocks are explanatory previews only.

Connect is a session demo, not real discovery or messaging. Sending creates only outgoing-pending state. Only accepting a valid seeded incoming Connect request creates a mutual match. Blocking/unmatching revokes conversation eligibility; unblocking does not restore a match. Follow, Circle membership, project acceptance and paid-plan simulation never grant DM eligibility. Connect OFF preserves existing requests and matches. Dating requires selecting Dating plus explicit opt-in and a separate 18+ demo attestation; no real age verification exists.

Free/Plus/Pro simulate 3/15/40 outgoing requests per India-time day, priced at INR 0/199/399 per month. Cancellation does not refund a sent request; changing the demo plan does not reset usage. Plan comparison creates no subscription or payment. Incoming acceptance stays free. All Connect state resets on refresh. Query-selected tabs (`/connect?tab=Incoming`, `Signals`, `Matches`, `Discover`) and maker selection (`/messages?maker=maker-0`) apply after client hydration; the server still renders a paused discovery/consent preview.

W08 messages are outbound, session-only local records. No delivery, read receipt, automated reply, real-time service or attachment upload is simulated. Inbox “New match” means an unvisited valid demo match, not a received message. Old `/messages?maker=...` entry links navigate to canonical conversations after hydration; direct unmatched URLs are locked. Appearance has one root light/dark/system preference using the existing `youverse-theme` storage key. Only appearance persists; messages, plans, preferences and onboarding reset on refresh. Notification/visibility controls are previews, not delivery services or access enforcement. Support forms never send a note or claim delivery.

Local IDs combine a monotonic sequence and tab scope. `/post/local-[sequence]-[scope]` opens a record only in the originating session. A fresh tab/refresh/deleted record shows an honest unavailable presentation, not a fabricated post. Media remains illustrated; Story progress is manual, while Reels playback/audio controls are explicitly simulated. Arrow/Escape controls, comments and next/previous navigation are implemented, and are covered by the W12/W12.1 browser regressions. Comment counts use the actual visible sample comment records plus session comments, rather than the original aggregate mock counts. Saved Feed contains posts; Reel bookmarks are shared state displayed on Reels.

Project Updates require a valid owned/collaborating project. Circle-related posts require joined membership; neither action changes a roadmap, creates a discussion, consumes Connect quota or unlocks messages. Drafts and local records reset on refresh; only the pre-existing appearance preference persists. Publication activity describes only your own local action. Reports and Story replies remain clearly labeled previews.

W10 adds ordered highlights, categorized milestones, featured work, local projects/discussions, owner goals/roadmap/field notes, filled-role collaboration and confirmed collaborator removal. Lint, 58 automated tests, production build and 98 HTTP checks pass; see [W10 verification](docs/W10_VERIFICATION.md) for exact scope, routes, limitations and Git checkpoint. Browser/device/visual/keyboard/hydration checks were NOT RUN because no browser-control tool is exposed. W11 is implemented; W12 automated stabilization is verified in Chromium; final manual sign-off remains open.

W10 adds data/communitySession.js, components/CommunityManagement.jsx, app/community-session.scss and tests/community-session.test.mjs around the existing provider and models. No new runtime dependency or persistence.

W11 makes Plus/Pro skill/shared-interest filters, Pro location/available-maker preferences, editable introduction templates and expanded seeded-incoming summaries functional. Priority is local outgoing-list presentation only; Pro badges describe the current session plan. Original prices/caps and mutual-message consent remain unchanged. Settings, requests, usage and messages use the existing canonical root state. The inbox defaults to valid matches and separates read-only histories; read/unread is a personal local reminder, never another person's read receipt. Own Connect action activity uses consent-aware destinations. No backend, payment, delivery or new persistence.

Historical W12 verification: lint, **73 helper tests**, production build, **99 HTTP checks**, **14 real Chromium interaction groups**, **200 viewport/theme measurements**, and **62 axe scans** pass. Final valid-route/interaction runs report no console/hydration errors. Five screenshots were reviewed. See [W12 verification](docs/W12_VERIFICATION.md) and its tracked evidence for exact coverage, fixes and limitations. Physical devices, other engines, screen readers and exhaustive zoom/visual checks remain open; the website is not claimed fully verified. W12 final manual sign-off remains open; W13 has not started.

## Backup

Origin is configured as `https://github.com/Sanjaypalthaniya/Youverse.git`. Preserve history and use a normal push after checking remote state:

```powershell
.tools/git/cmd/git.exe fetch origin
.tools/git/cmd/git.exe push -u origin master
```

Do not overwrite an existing remote or force-push.

W12 fixes include contrast, Feed tab keyboard navigation, repeated Connect tab navigation, Story/notification ARIA, page headings and corrupted shell punctuation. Reusable browser drivers and setup are documented in docs/W12_VERIFICATION.md. No app runtime dependency or backend was added.


## W12.1 verification checkpoint

**B. AUTOMATED FRONTEND QA PASS — MANUAL SIGN-OFF OPEN.** Chromium 156, Firefox 157 and Windows Playwright WebKit 27.2 run the retained session workflow suite and added nested-dialog/mobile-focus/long-message regressions. The production build and all 73 helper tests pass. Final evidence includes 42 retained workflow groups, 15 added functional groups, 192 axe scans and 99 HTTP checks. Engine-specific limitations, screenshots and open gates are recorded in [W12.1 verification](docs/W12_1_VERIFICATION.md) and [evidence](docs/qa/w12-1/results.json).

Fixed reproduced WebKit button activation/focus restoration, nested-dialog focus loss and focusable offscreen mobile sidebar links. Seven viewport sizes, light/dark, touch flags, CSS reflow equivalents and selected WCAG axe rules are covered. Windows WebKit is not physical Safari/iOS; Firefox touch contexts use a desktop user agent. Native zoom probes did not change zoom. Physical iOS/Android, actual mobile keyboards, manual screen-reader use, native 200%/400% zoom and exhaustive visual review remain OPEN; see the [manual checklist](docs/qa/w12-1/MANUAL_CHECKLIST.md). No full accessibility certification or production/backend readiness is claimed. W13 and Flutter have not started.


## W12.3 interface redesign

Plus Jakarta Sans is bundled locally through Next.js font loading with its open-font license and system fallbacks. A shared semantic presentation layer refines light/dark typography, controls, surfaces, grouped desktop navigation, branded mobile header/search, touch navigation, editorial Feed and post variants, Stories/Reels/Explore, Living Identity, projects/Circles, Connect/messages/Premium, composers, activity and Settings. Existing domain state and consent rules are unchanged.

See [W12.3 redesign verification](docs/W12_3_UI_REDESIGN_VERIFICATION.md) for before/after captures, exact verification layers, iteration findings and remaining manual gates. Physical-device, manual screen-reader, native-zoom and exhaustive visual sign-off remain OPEN. No W13/backend, real payments/delivery, new persistence or Flutter work was started.

W12.3 final automated evidence: lint, 73 helper tests and production build pass; 99 HTTP checks, 42 retained workflow groups, 15 additional functional groups, 192 axe scans and 42 local-font/touch/reduced-motion design cases pass across the three available Windows engines. Exact 177-route and viewport/reflow matrices, before/after captures and intermediate observations are in the W12.3 report. Manual physical-device/AT/native-zoom sign-off remains OPEN.

## UI design progress

Inter UI typography, selected Jakarta headings and compact shared cards/controls.
See [UI01 roadmap, cleanup and verification](docs/UI01_REDESIGN.md) for scope,
before/after screenshots and reproducible browser checks.

UI02 adds the compact social Feed, redesigned posts and immersive Stories.
See [UI02 verification and cleanup](docs/UI02_VERIFICATION.md). UI03 is not started.
