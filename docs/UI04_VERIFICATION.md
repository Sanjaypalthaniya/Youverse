# UI04 — Explore, Search and Living Identity

Started: 2026-11-04; resumed and finalized: 2026-11-12 (Asia/Calcutta). Baseline: 0e1891ef4954b93ed3ed04e02531181e4a7f87c8 (verified UI03).

## Scope

UI04 redesigns Explore/Search and own/public profile presentation. UI01 typography/tokens, UI02 PostCard/Stories and UI03 navigation remain. Projects, Circles, Connect and Messages pages and their domain logic are unchanged. The search algorithm, URL handling, recent-search state, publishing, Follow, Connect consent, pricing, permissions and session-only behavior remain. UI05 has not started.

## Visual changes

- Explore replaces the large promotional hero with a compact heading, 58px search row, clear category indicators and horizontal curiosity filters. Search uses the same existing query/filter logic and retains suggestions, recent searches, clear controls and resettable empty results. Focus returns to the search input after submitting or clearing.
- People suggestions use a swipeable mobile rail and a desktop grid. Shared PersonCard supports discovery tiles, compact search rows and related-profile/relationship-dialog cards. Name/craft, avatars, shared interests, Follow, canonical profile links and Connect controls remain. Preview biographies are clamped; full biographies remain on profiles.
- Discovery-specific Project/Circle tiles reuse ProjectCover, ProjectProgress, ProjectStar, CircleCover and MembershipButton. Creator links, tags, skills, progress, collaboration availability, Star and Join/Leave actions remain. Their standalone pages/cards were not redesigned. Reels keep existing Artwork and canonical links; Posts use the existing UI02 PostCard unchanged.
- Profiles use shorter illustrated covers (154px desktop, 132px mobile), a prominent overlapping avatar, 27px/24px names, 14px biographies, a compact statement and derived stats. Own following/follower buttons moved from the old duplicate bottom card to the header and still open the same session relationship dialogs. Public stats show actual reflections, skills and curiosities. Reflection counts moved from the tab badge to the header. No new social counters or state fields were invented.
- Mobile profile covers meet the UI03 header edge-to-edge; existing edit/Follow/Connect/message/safety/share controls remain. Share has a compact mobile icon with the same accessible name. The completion strip is smaller and still explains session-only behavior.
- Skills, interests, intentions and highlights use reusable identity sections with natural typography. Milestones retain the existing UTC date ordering in a lighter timeline. Profile tabs retain arrow/Home/End behavior and have subtle indicators and opacity-only content reveals. All motion respects reduced motion.

## Ownership and exact cleanup

New owners: app/explore.scss, app/profile.scss and app/people.scss; new reusable component: components/PersonCard.jsx. Existing Discovery/Identity components were formatted and their presentation simplified.

The [CSS cleanup manifest](qa/ui04/results/css-cleanup.json) records 98 removal/transfer audit entries, including nested and responsive branches; this is not a count of unique top-level rules. Removed obsolete Explore/Search rules from discovery.scss/redesign.scss and profile presentation rules from identity.scss/redesign.scss rather than retaining an overriding legacy layer. Mixed :is/selectors keep their Projects/Circles/Connect/account branches.

Removed/relocated selectors include discovery-hero/search/form/grid/card/section, suggestions/recent searches, suggested-search-card, profile hero/cover/intro/meta/actions/safety/completion/tabs, identity sections/highlights/timeline/related/memberships and old maker-card rules. Confirmed unused .discovery-symbol/.project-symbol fallback styling, .identity-projects/.identity-project-art, W01 .profile-cover/.profile-card and .explore-hero were removed. No component/dynamic references remained.

Shared ChoiceTabs, interest filters, section headings and discovery-link defaults remain because Projects, Circles and composers use them. Shared cover-violet/coral/green palettes, avatar outlined/bloom variants, shared-curiosity rules and identity editor/form styling remain. The outlined profile avatar gets its intended violet border and surface halo. UI01–UI03 component owners and later-phase page styles were not changed. No runtime assets or dependencies were added.

Removed dead DiscoveryCard fallback branches after its existing early Project/Circle returns, obsolete icon/data/helper imports, and unreachable legacy profile modal branches (Connect with intention/private-message explanations) that had no setters. The live ConnectUI request/message-consent/safety components remain authoritative and unchanged. Removed the duplicate avatar-style class supplied via size: Avatar already derives that class from avatarStyle. Replaced duplicated people-card markup and removed the old bottom relationship card after moving its existing controls to the header.

## Review findings

Actual production screenshots were opened and reviewed for mobile/desktop Explore, mixed/people search, own/public profiles, dark mode and identity sections. Review led to compact people result rows and a shorter profile kicker/completion strip.

Behavior tests found pointer instability from the shared one-pixel hover lift on profile actions and pointer interception when press scaling on a discovery card changed the positioning context of its embedded fixed dialog. UI04 action buttons now avoid vertical hover movement, cards use shadow feedback, and profile reveals use opacity only. Existing confirmation and consent workflows are preserved. Touch controls retain the shared 44px minimum.

## Before/after screenshots

| Screen | Before | After |
| --- | --- | --- |
| Mobile Explore | [Before](qa/ui04/before/390-light-explore.png) | [After](qa/ui04/after/390-light-explore.png) |
| Explore content | [Before](qa/ui04/before/390-light-explore-content.png) | [After](qa/ui04/after/390-light-explore-content.png) |
| Desktop Explore | [Before](qa/ui04/before/1440-light-explore.png) | [After](qa/ui04/after/1440-light-explore.png) |
| Mixed search | [Before](qa/ui04/before/1440-light-search.png) | [After](qa/ui04/after/1440-light-search.png) |
| People results | [Before](qa/ui04/before/390-light-people-results.png) | [After](qa/ui04/after/390-light-people-results.png) |
| Empty search | [Before](qa/ui04/before/390-light-empty-search.png) | [After](qa/ui04/after/390-light-empty-search.png) |
| Own mobile profile | [Before](qa/ui04/before/390-light-own-profile.png) | [After](qa/ui04/after/390-light-own-profile.png) |
| Public mobile profile | [Before](qa/ui04/before/390-light-public-profile.png) | [After](qa/ui04/after/390-light-public-profile.png) |
| Public dark profile | [Before](qa/ui04/before/390-dark-public-profile.png) | [After](qa/ui04/after/390-dark-public-profile.png) |
| Identity highlights | [Before](qa/ui04/before/390-light-identity-highlights.png) | [After](qa/ui04/after/390-light-identity-highlights.png) |
| Milestones | [Before](qa/ui04/before/390-light-milestones.png) | [After](qa/ui04/after/390-light-milestones.png) |
| Tablet profile | [Before](qa/ui04/before/768-light-own-profile.png) | [After](qa/ui04/after/768-light-own-profile.png) |

The capture matrix also includes 320, 360, 430 and 1024px Explore/profile states in both themes. Baseline captures were made before editing from the UI03 production build. After captures use UI04 production output.

Additional reviewed identity detail: [mobile skills/interests](qa/ui04/after/390-light-identity-overview.png) and [desktop dark overview](qa/ui04/after/1440-dark-identity-overview.png).

## Reproduction

Use the existing ignored .tools/qa Playwright/axe tooling and .tools/browsers cache. QA_ORIGIN defaults to http://localhost:3113.

- npm run lint; npm test; npm run build
- QA_PHASE=after node scripts/ui04-visual.mjs
- QA_BROWSER=chromium (or firefox/webkit) node scripts/ui04-browser.mjs
- node scripts/w12-browser.mjs; node scripts/w12-1-browser.mjs
- node scripts/w12-audit.mjs; node scripts/w12-accessibility.mjs
- node scripts/ui01-design.mjs; node scripts/ui02-browser.mjs; node scripts/ui03-browser.mjs

Use QA_OUTPUT for ignored legacy result storage and QA_EVIDENCE=docs/qa/ui04/after for screenshots. Final JSON results are archived in qa/ui04/results/. Browser emulation/automated checks do not replace physical-device, native zoom or full screen-reader testing.

## Final results

- Lint, all 73 existing tests and production build passed (62 static outputs); rerun after resuming on November 12.
- UI04: 42 cases passed across Chromium, Firefox and WebKit at 320, 360, 390, 430, 768, 1024 and 1440px in light/dark themes. Includes search/clear/recent suggestions, people results, Follow, consent gating, relationship dialogs, profile tabs, identity links, Project Star, Circle Join, empty results, three cover variants and motion/reduced-motion checks.
- Existing workflows: 14/14 passed; extended keyboard/touch cases: 6/6 passed. UI01, UI02 and UI03 regressions each passed 14/14 cases.
- Route audit: 59/59 routes returned HTTP 200 with one h1; 200 responsive checks, 112 touch checks and 73 reflow records passed, with no document overflow.
- Automated WCAG A/AA scans: 30 UI04, 24 route, 38 additional route/dialog, 2 extended, 4 UI02 and 8 UI03 scans (106 total), with zero violations. Final archived suites recorded no runtime errors.
- Evidence: 56 before and 62 after screenshots, viewport metadata and passing machine-readable results under qa/ui04/. Cleanup manifest: 98 removal/transfer audit entries.

One Circle Join workflow timed out while browser suites ran concurrently. The full workflow suite passed in isolation with no application changes. Rapid WebKit hard navigation also produced canceled-prefetch noise; the harness now waits for network idle before/after hard navigation. The complete WebKit suite passed without filtering errors. Failed preliminary runs remain only in ignored tool storage.

Results are indexed in [summary.json](qa/ui04/results/summary.json). UI05 has not started.
