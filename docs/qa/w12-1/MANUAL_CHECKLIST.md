# Remaining manual sign-off checklist

Status: OPEN. Automated browser results do not complete these checks.

For every run record tester, client date, physical device, OS, actual browser/version, screen reader/version, input method, expected result, observed result and PASS/FAIL. Do not replace device testing with Playwright's viewport or touch flags.

- [ ] Physical iPhone/iPad Safari: portrait/landscape, notch/safe area, mobile menu/bottom nav, scroll, Story and nested dialogs, keyboard opening/closing while composing and focus restoration.
- [ ] Physical Android: Chrome and supported browser, real IME/virtual keyboard, Back behavior, long messages/forms, rotation, sticky elements and taps near screen edges.
- [ ] Native browser zoom UI at 100%, 200%, 400%: confirm actual zoom indicator, keep navigation reachable, edit forms, complete a Connect introduction and use message safety dialogs. The automated 1280/640/320 CSS-width equivalents are separate evidence.
- [ ] NVDA with Chromium and Firefox: landmarks/headings, Feed tab selection, form labels/counters/errors, required fields, status updates, Story progress, dialog names and meaningful keyboard order. Review repeated avatar/name announcements for usability.
- [ ] VoiceOver on Safari/iOS: touch exploration, rotor order, no offscreen closed-menu links, dialog containment/return focus, consent locks and local-read reminder wording.
- [ ] Nested dialogs beyond the automated profile-preview/local-reflection edit case: Escape closes one layer, focus returns to the surviving dialog, body remains locked until the last dialog closes, then the trigger regains focus.
- [ ] Human review at all seven viewport sizes and zoom levels: every scroll position, long titles/tags, disabled/error/loading states, small inherited secondary text and contrast over illustrations.
- [ ] Confirm semantics: session records reset on refresh; Follow, project acceptance, Circle membership and paid plans never unlock DMs; unmatch/block revoke sending; unblock does not restore consent; no messages or reports are actually delivered.

No manual completion or accessibility certification is claimed until results and reviewer evidence are recorded.
