# YOUVERSE - W05

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

W05 upgrades Projects discovery, four canonical detail pages, project creation previews, an owned-project session editor, milestone progress, field notes, stars and collaboration introductions. The three original projects retain their owners. A fourth, Small Beginnings, is an Aarav-owned demo for editing and incoming accept/decline workflows. Accepting project collaboration never creates a Connect match or unlocks private DMs. W06 has not started.

Routes: /, /welcome, /login, /explore (supports ?q=...), /reels, /create, /connect, /messages, /notifications, /profile, /profile/edit, the three maker profiles above, /projects, /circles, /settings, /post/1 through /post/6. Invalid sections/posts/maker slugs return 404. Creator links resolve to the matching maker; Project, Circle and Connect workflows remain previews. `/profile` always shows the signed-in demo identity, including when old maker query parameters are present. Public URLs use the canonical slugs, not internal maker IDs.

Project routes: `/projects/create`, `/projects/the-little-library`, `/projects/everyday-illustrated`, `/projects/slow-sunday-club`, `/projects/small-beginnings`. Add `/edit` for the editor route: Small Beginnings exposes the demo owner form; other existing projects show a UI ownership explanation. Unknown project slugs return 404. No secure authorization is claimed.

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
- docs/: canonical product plan, roadmap and phase verification reports.

## Demo boundaries and verification

Theme preference persists locally. Drafts, recent searches, notification reads and social demos last within the current tab's client navigation and reset on refresh. Comments last while their view is mounted. Story replies/reports and Publish display explicit demo feedback. No real upload, publication, search service, notification delivery, authentication, payment or private messaging exists. Reels use clearly simulated playback/audio controls and CSS artwork. Visibility is preview metadata. Flutter/Dart mobile follows completion of the website.

Profile Save updates the shared session identity used by the dashboard, shell, composer and local comments. Refresh restores the fixture. Editor links, Cancel and header search warn before discarding unsaved changes; refresh/close uses the browser's unload warning where supported. Client back/forward retains the edit draft in the root provider. Profile/cover images are illustrated placeholders only. Aarav has no published reflections in the existing dataset, so his Reflections tab shows an empty state. Own-profile sharing copies a local-demo route; it does not publish session edits to other tabs or people.

Project editing updates the existing owned fixture across project/profile/Explore cards in this tab; refresh resets it. Project creation keeps a session draft and validates a publishing preview; it does not add a project to discovery or create a public URL. Request submit/cancel/accept/decline and accepted team membership are session-only demos. No request, notification or message is sent. Stars are separate from Feed bookmarks. Milestone completion determines project progress. Cover artwork is an illustration, not an upload; visibility is unenforced preview metadata. Editor links/Cancel/header search warn about unsaved changes, refresh uses a browser unload prompt where supported, and client back/forward retains drafts.

Lint, fifteen automated tests, production build and 42 HTTP checks pass; see docs/W05_VERIFICATION.md for exact evidence, file inventory, limits and Git checkpoint. Browser/device/visual/keyboard interaction checks were NOT RUN because no browser-control tool is available. W06 has not started.

## Backup

No Git remote is configured. After creating your repository, use your actual URL:

```powershell
.tools/git/cmd/git.exe remote add origin <YOUR_REPOSITORY_URL>
.tools/git/cmd/git.exe push -u origin HEAD
```

Do not overwrite an existing remote or force-push.
