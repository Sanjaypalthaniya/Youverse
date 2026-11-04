# UI02 — premium social Feed

Date: 2026-11-04 (Asia/Calcutta). Baseline: 1686ab434df741b45bcaf3e3cd746bd6cbca90df (verified UI01).

## Scope and result

UI02 redesigns Feed, PostCard and Stories only. Inter, Jakarta headings, UI01 tokens and both theme palettes remain. Mobile posts fill the Feed width with compact author rows, 15px body text, larger media, 44px actions and two-line comment previews. Desktop keeps the existing balanced 640px feed column. The Feed introduction and composer are more compact; its tabs use animated underlines.

Post types share one card structure: reflections use a violet quote treatment, questions a soft violet panel with 16px text, milestones a lime marker, and project updates a compact linked project reference. Project/Circle references inside posts are scoped to PostCard. Local visibility and edited labels remain present.

Stories use violet/coral rings, distinct viewed states and a horizontally scrollable tray. The viewer fills mobile viewports, retains an illustrated stage on desktop, and has explicit Previous/Next controls, arrow-key navigation, reaction feedback and reply previews. Progress animates on a manual slide change; no autoplay, video playback, messaging or other new product feature was added. Reduced motion disables transitions/animations.

The existing session model, publishing/confirmation flow, likes, comments, bookmarks, follows, hide/undo, local edits/deletion, Story/Reel navigation, Connect consent, plans, pricing and permissions were not changed. Modal gained only an optional className for scoped presentation. The app shell and later-phase page layouts were not redesigned; shared PostCard consumers naturally render the same updated component.

## Exact cleanup

The audit traced selectors and dynamic classes through Feed, PostCard, StoryTray, post details, local publication, identity/Explore embeds and Reels before editing. Superseded component styles were removed from globals.scss, social.scss, session-social.scss and redesign.scss and replaced by a single readable component owner, app/feed.scss. This is a consolidation, not another layer over the old component rules.

The machine-readable [cleanup manifest](qa/ui02/results/css-cleanup.json) lists 92 removed or split selector groups/branches, including responsive occurrences. Removed groups include .stories, .story, .story-ring and its own/viewed/unviewed variants, .composer, .feed-tabs, .tabs, .post, .premium-post, author/topic/text/action rules, comment previews, Story progress/controls/reactions and the old :has-based viewer rules. Mixed selectors retained their live non-UI02 branches. The Story focus rule was split from the shared Reel focus rule. The redundant coarse-pointer post-action branch was removed because targets are now always 44px.

Confirmed unused legacy illustration selectors were removed: .post-art, .art-sun, .art-book, .art-coffee, .art-plant, .art-caption, .post-bottom and their responsive rules; also the unused .compose-icon. These had no component/dynamic references. Current .social-art and .scene-* artwork remains shared with Reels and discovery. Unrelated legacy Reel/page styles remain for later phases.

Removed unused imports from components/Social.jsx: CircleReference, ProjectReference, useState, obsolete social datasets (reflections/stories/reels/comments), unused UI primitives and unused Lucide imports. Artwork, FollowButton, DiscoveryRail and session component re-exports remain. Removed the now-unused Feed eyebrow markup. No image assets, fonts, state helpers or route components were deleted. No runtime dependency was added; Prettier was used as a temporary formatting tool.

## Visual review

Before captures were taken from the UI01 production build, before implementation. After captures use the UI02 production build. Desktop 1440px and mobile 320/390/430px are captured in both themes, with additional post-type and detail images.

Actual images were opened and reviewed: desktop and mobile Feed, post media/actions, light/dark Stories, questions, milestones and reflections. Visual review found an empty area under the mobile Story illustration after making the viewer full height. The illustration now fills its stage; the browser suite asserts stage/artwork heights agree. Small mobile screens retain scrolling inside the viewer where needed.

| Screen | Before | After |
| --- | --- | --- |
| Desktop Feed | [Before](qa/ui02/before/1440-light-feed.png) | [After](qa/ui02/after/1440-light-feed.png) |
| Mobile Feed | [Before](qa/ui02/before/390-light-feed.png) | [After](qa/ui02/after/390-light-feed.png) |
| 320px Feed | [Before](qa/ui02/before/320-light-feed.png) | [After](qa/ui02/after/320-light-feed.png) |
| Mobile dark Feed | [Before](qa/ui02/before/390-dark-feed.png) | [After](qa/ui02/after/390-dark-feed.png) |
| Post media/actions | [Before](qa/ui02/before/390-light-post.png) | [After](qa/ui02/after/390-light-post.png) |
| Mobile Story | [Before](qa/ui02/before/390-light-story.png) | [After](qa/ui02/after/390-light-story.png) |
| Dark Story | [Before](qa/ui02/before/390-dark-story.png) | [After](qa/ui02/after/390-dark-story.png) |
| Question | [Before](qa/ui02/before/390-light-question.png) | [After](qa/ui02/after/390-light-question.png) |
| Milestone | [Before](qa/ui02/before/390-light-milestone.png) | [After](qa/ui02/after/390-light-milestone.png) |
| Reflection | [Before](qa/ui02/before/390-light-text-reflection.png) | [After](qa/ui02/after/390-light-text-reflection.png) |
| Project update | [Before](qa/ui02/before/390-light-project-update.png) | [After](qa/ui02/after/390-light-project-update.png) |
| Post detail | [Before](qa/ui02/before/390-light-detail.png) | [After](qa/ui02/after/390-light-detail.png) |

## Reproduction

Use the existing ignored .tools/qa Playwright/axe tooling and .tools/browsers cache. Set QA_ORIGIN to the running production origin (default http://localhost:3113).

- npm run lint; npm test; npm run build
- QA_PHASE=after node scripts/ui02-visual.mjs
- QA_BROWSER=chromium (or firefox/webkit) node scripts/ui02-browser.mjs
- node scripts/w12-browser.mjs
- node scripts/w12-1-browser.mjs
- node scripts/w12-audit.mjs
- node scripts/w12-accessibility.mjs

Set QA_OUTPUT to an ignored tool output directory for the existing suites. UI02 visual captures write docs/qa/ui02/after; UI02 browser results default to .tools/ui02/<engine>/ui02.json.

Browser emulation and automated accessibility checks do not replace physical-device or full screen-reader testing. UI03 is not started.

The legacy dialog-text-click-escape browser regression now targets .story-hint instead of the removed caption wording. Its text-click, Escape and focus-return assertions are unchanged. A Circle confirmation timed out during a heavily concurrent QA pass; the final workflow run uses a 15-second timeout and is recorded separately.

## Final results

- Lint: passed. All existing helper tests: 73/73 passed. Production build: passed (62 static outputs).
- Chromium workflows: 14/14 passed. Extended browser scenarios: 6/6 passed, including nested dialogs, text-click Escape/focus return, reflow, hidden navigation focus and long-message refresh behavior.
- UI02 browser suite: 42 responsive/theme cases passed across Chromium, Firefox and WebKit, plus motion-enabled like/progress checks in each engine. The suite covers full-width mobile posts, 14–16px text, 44px targets, likes, saved feed, hidden/undo states, manual Story stepping across authors, viewed rings, reply previews, focus return, long display names and reduced motion.
- Routes: 59/59 returned HTTP 200 with one h1. Responsive route/theme checks: 200; touch checks: 112; reflow records: 73. No document overflow.
- Accessibility: 24 route scans, 38 additional route/dialog scans, 12 UI02 feed/Story scans across three engines and 2 extended scans; zero automated WCAG A/AA violations. No runtime errors in the final suites.
- Final production screenshots: 44 screen captures, plus nested-dialog and matched-message regression evidence. Both before and after folders include their frame metadata.

The route audit was restarted alone with progress logging after a concurrent run stopped reporting progress. All original checks passed. Machine-readable final results are under [qa/ui02/results](qa/ui02/results/); preliminary failed runs remain only in ignored local tool storage.
