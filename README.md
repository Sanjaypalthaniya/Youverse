# YOUVERSE - W09

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

W09 adds actual session-only social publishing: reflection/image/question/milestone/project/Circle posts enter the Feed, Stories enter the tray, and Reels enter the vertical view. Preview and explicit confirmation precede publication. Shared likes/comments/bookmarks, hide/undo, own-content text edits/deletion, local detail routes, profile reflections, search and own-action notifications stay synchronized during client navigation. W10 has not started.

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

Theme preference persists locally. Drafts, recent searches, notification reads and social demos last within the current tab's client navigation and reset on refresh. Comments last while their view is mounted. Story replies/reports and Publish display explicit demo feedback. No real upload, publication, search service, notification delivery, authentication, payment or private messaging exists. Reels use clearly simulated playback/audio controls and CSS artwork. Visibility is preview metadata. Flutter/Dart mobile follows completion of the website.

Profile Save updates the shared session identity used by the dashboard, shell, composer and local comments. Refresh restores the fixture. Editor links, Cancel and header search warn before discarding unsaved changes; refresh/close uses the browser's unload warning where supported. Client back/forward retains the edit draft in the root provider. Profile/cover images are illustrated placeholders only. Aarav has no published reflections in the existing dataset, so his Reflections tab shows an empty state. Own-profile sharing copies a local-demo route; it does not publish session edits to other tabs or people.

Project editing updates the existing owned fixture across project/profile/Explore cards in this tab; refresh resets it. Project creation keeps a session draft and validates a publishing preview; it does not add a project to discovery or create a public URL. Request submit/cancel/accept/decline and accepted team membership are session-only demos. No request, notification or message is sent. Stars are separate from Feed bookmarks. Milestone completion determines project progress. Cover artwork is an illustration, not an upload; visibility is unenforced preview metadata. Editor links/Cancel/header search warn about unsaved changes, refresh uses a browser unload prompt where supported, and client back/forward retains drafts.

Circle membership, member-count deltas, replies, appreciation and discussion drafts last for the current tab session and reset on refresh. My Circles, profile memberships and member lists use the same state. Discussion creation validates a publishing preview and keeps a draft without adding a real discussion or URL. Replies are appended locally to existing discussions. Joining is a UI requirement for composer/reply/reaction controls, not server-enforced access control. Member totals are fixture aggregates; named member lists are labeled samples. Reports and blocks are explanatory previews only.

Connect is a session demo, not real discovery or messaging. Sending creates only outgoing-pending state. Only accepting a valid seeded incoming Connect request creates a mutual match. Blocking/unmatching revokes conversation eligibility; unblocking does not restore a match. Follow, Circle membership, project acceptance and paid-plan simulation never grant DM eligibility. Connect OFF preserves existing requests and matches. Dating requires selecting Dating plus explicit opt-in and a separate 18+ demo attestation; no real age verification exists.

Free/Plus/Pro simulate 3/15/40 outgoing requests per India-time day, priced at INR 0/199/399 per month. Cancellation does not refund a sent request; changing the demo plan does not reset usage. Plan comparison creates no subscription or payment. Incoming acceptance stays free. All Connect state resets on refresh. Query-selected tabs (`/connect?tab=Incoming`, `Signals`, `Matches`, `Discover`) and maker selection (`/messages?maker=maker-0`) apply after client hydration; the server still renders a paused discovery/consent preview.

W08 messages are outbound, session-only local records. No delivery, read receipt, automated reply, real-time service or attachment upload is simulated. Inbox “New match” means an unvisited valid demo match, not a received message. Old `/messages?maker=...` entry links navigate to canonical conversations after hydration; direct unmatched URLs are locked. Appearance has one root light/dark/system preference using the existing `youverse-theme` storage key. Only appearance persists; messages, plans, preferences and onboarding reset on refresh. Notification/visibility controls are previews, not delivery services or access enforcement. Support forms never send a note or claim delivery.

Local IDs combine a monotonic sequence and tab scope. `/post/local-[sequence]-[scope]` opens a record only in the originating session. A fresh tab/refresh/deleted record shows an honest unavailable presentation, not a fabricated post. Media remains illustrated; Story progress is manual, while Reels playback/audio controls are explicitly simulated. Arrow/Escape controls, comments and next/previous navigation are implemented, but browser interaction testing has not been performed. Comment counts use the actual visible sample comment records plus session comments, rather than the original aggregate mock counts. Saved Feed contains posts; Reel bookmarks are shared state displayed on Reels.

Project Updates require a valid owned/collaborating project. Circle-related posts require joined membership; neither action changes a roadmap, creates a discussion, consumes Connect quota or unlocks messages. Drafts and local records reset on refresh; only the pre-existing appearance preference persists. Publication activity describes only your own local action. Reports and Story replies remain clearly labeled previews.

Lint, forty-six automated tests, production build and 90 HTTP checks pass; see docs/W09_VERIFICATION.md for exact scope, file inventory, checks, limitations and Git checkpoint. Browser/device/visual/keyboard interaction checks were NOT RUN because no browser-control tool is available. W10 has not started.

## Backup

No Git remote is configured. After creating your repository, use your actual URL:

```powershell
.tools/git/cmd/git.exe remote add origin <YOUR_REPOSITORY_URL>
.tools/git/cmd/git.exe push -u origin HEAD
```

Do not overwrite an existing remote or force-push.
