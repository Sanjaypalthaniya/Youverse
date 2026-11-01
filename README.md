# YOUVERSE - W03

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

Routes: /, /welcome, /login, /explore (supports ?q=...), /reels, /create, /connect, /messages, /notifications, /profile, /projects, /circles, /settings, /post/1 through /post/6. Invalid sections/posts return 404. Creator, Project, Circle and Connect links open existing previews; their later phases remain unstarted.

## Source

- app/layout.jsx, app/globals.scss: shared layout, Bootstrap and theme tokens.
- app/social.scss, components/Social.jsx, data/social.js: W02 social UI and mock entities.
- app/discovery.scss: W03 responsive/theme styling.
- components/Discovery.jsx: Explore/search, discovery cards and shared category controls.
- components/Composer.jsx, components/Notifications.jsx: W03 composer and notification center.
- components/SocialProvider.jsx: preserved social state plus draft/history/notification read state.
- data/discovery.js: shared discovery metadata/index, filtering, validation and notification fixtures.
- tests/discovery.test.mjs: search, validation and fixture-link tests.
- docs/: canonical product plan, roadmap and phase verification reports.

## Demo boundaries and verification

Theme preference persists locally. Drafts, recent searches, notification reads and social demos last within the current tab's client navigation and reset on refresh. Comments last while their view is mounted. Story replies/reports and Publish display explicit demo feedback. No real upload, publication, search service, notification delivery, authentication, payment or private messaging exists. Reels use clearly simulated playback/audio controls and CSS artwork. Visibility is preview metadata. Flutter/Dart mobile follows completion of the website.

Lint, four automated tests, production build and HTTP routes are verified; see docs/W03_VERIFICATION.md for the exact evidence, file inventory, limits and Git checkpoint. Browser/device/visual/keyboard interaction checks were NOT RUN because no browser-control tool is available. W04 has not started.

## Backup

No Git remote is configured. After creating your repository, use your actual URL:

```powershell
.tools/git/cmd/git.exe remote add origin <YOUR_REPOSITORY_URL>
.tools/git/cmd/git.exe push -u origin HEAD
```

Do not overwrite an existing remote or force-push.
