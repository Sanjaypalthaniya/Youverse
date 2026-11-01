# YOUVERSE ? W02

Identity-first social website. Next.js 16 App Router, JavaScript/JSX, Bootstrap 5, SCSS and Lucide; local mock data only.

Run with Node/npm:

```sh
npm install
npm run lint
npm run build
npm run dev
```

Production: npm run build, then npm start. Open http://localhost:3000.

W02 extends the existing shell with a premium feed, six reusable post variants, Following/Saved filters, full-screen manual story viewer, illustrated Reels and six /post/[id] detail pages. Original routes remain available. Reels offer clearly simulated controls; no video/audio streams. The unavailable Reel is intentional. Maker links open the shared W01 profile preview; individual public profiles belong to W04.

Source: app/social.scss (W02 responsive/theme styling), components/Social.jsx (Feed, PostCard, StoryTray, Reels, Comments, PostDetail, DiscoveryRail, Artwork), components/SocialProvider.jsx (session state), data/social.js (stable shared mock entities). Existing app/globals.scss, components/ui.jsx and components/Youverse.jsx provide the W01 shell/design system. app/post/[id]/page.jsx validates post routes; app/loading.jsx provides navigation loading UI.

Theme preference persists locally. Social demos last for the current browser session and reset on refresh. Comments last while their view is mounted. Reports, story replies and reactions display demo feedback; nothing is sent. No backend, upload, authentication, payment, private messaging or Flutter code. All future product requirements remain in docs/YOUVERSE_MASTER_PRODUCT_PLAN.md.

Verification: lint and build pass; 19 page routes return HTTP 200; invalid post/section return 404. Browser, device, visual and keyboard interaction testing were not performed. Full evidence, file inventory and backup instructions: docs/W02_VERIFICATION.md. Stop at W02; W03 is not started.
