import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { makerProfiles, initialOwnProfile, getMaker, profileHref, sharedInterests, sharedCuriosityText, validateProfile, normalizeProfile, profileCompletion, isValidDate } from '../data/identity.js';
import { makers, reflections, circles } from '../data/social.js';
import { discoveryMakers, discoveryProjects, discoveryItems, notifications } from '../data/discovery.js';
test('maker identity is shared across surfaces; slugs, IDs and linked entity references resolve', () => {
 assert.equal(makers, makerProfiles); assert.equal(discoveryMakers, makerProfiles);
 assert.equal(new Set(makers.map(maker => maker.slug)).size, makers.length);
 makers.forEach((maker, index) => {
  assert.equal(maker.personIndex, index); assert.equal(getMaker(maker.slug), maker); assert.equal(getMaker(maker.id), maker);
  assert.deepEqual(validateProfile({ ...maker, handle: 'unique.demo' }), {});
  assert.ok(reflections.some(post => post.person === index));
  assert.ok(maker.projectIds.every(id => discoveryProjects.some(project => project.id === id)));
  assert.ok(maker.circleIds.every(id => circles.some(circle => circle.id === id)));
 });
 assert.equal(getMaker('missing'), undefined); assert.equal(getMaker('edit'), undefined);
 assert.equal(getMaker('ANANYACREATES'), undefined);
});
test('discovery, notification and author navigation uses canonical creator profiles', () => {
 for (const item of discoveryItems.filter(item => item.category === 'People')) assert.equal(item.href, profileHref(item.person));
 for (const item of notifications.filter(item => item.type === 'follow')) assert.equal(item.href, profileHref(makers[item.person]));
 const social = readFileSync(new URL('../components/Social.jsx', import.meta.url), 'utf8');
 assert.ok(social.includes('profileHref(person)'));
 for (const file of ['../components/Social.jsx', '../components/Discovery.jsx', '../data/discovery.js']) assert.ok(!readFileSync(new URL(file, import.meta.url), 'utf8').includes('/profile?maker='));
});
test('shared curiosity explanations use real intersections and update after edits', () => {
 const maker = makers[0];
 assert.deepEqual(sharedInterests({ interests: ['Photography', 'Photography', 'Technology'] }, maker), ['Photography']);
 assert.ok(sharedCuriosityText(initialOwnProfile, maker).includes('Design'));
 assert.equal(sharedCuriosityText({ interests: [] }, maker), 'A new perspective to get curious about.');
 assert.equal(sharedCuriosityText({ interests: ['Technology'] }, makers[1]), 'You both explore Technology.');
});
test('profile validation rejects invalid handles, collisions, whitespace, overflow, duplicate chips and impossible dates', () => {
 assert.deepEqual(validateProfile(initialOwnProfile), {});
 for (const handle of ['a', ' spaces ', '-invalid', makers[0].handle.toUpperCase()]) assert.ok(validateProfile({ ...initialOwnProfile, handle }).handle);
 assert.ok(validateProfile({ ...initialOwnProfile, name: '   ' }).name);
 assert.ok(validateProfile({ ...initialOwnProfile, bio: 'x'.repeat(501) }).bio);
 assert.ok(validateProfile({ ...initialOwnProfile, skills: ['Design', 'design'] }).skills);
 assert.ok(validateProfile({ ...initialOwnProfile, interests: [] }).interests);
 assert.ok(validateProfile({ ...initialOwnProfile, highlights: Array.from({ length: 6 }, (_, index) => `Highlight ${index}`) }).highlights);
 for (const date of ['', '2026-02-30', '2026-13-01']) assert.ok(validateProfile({ ...initialOwnProfile, milestones: [{ id: 'bad', title: 'A beginning', date, description: '' }] }).milestones);
 assert.ok(isValidDate('2024-02-29')); assert.ok(!isValidDate('2026-02-29'));
});
test('normalization and completion support partial identities without mutating fixtures', () => {
 const profile = normalizeProfile({ ...initialOwnProfile, name: '  Aarav  ', skills: ['  Design  '] });
 assert.equal(profile.name, 'Aarav'); assert.deepEqual(profile.skills, ['Design']); assert.equal(initialOwnProfile.name, 'Aarav Shah');
 assert.equal(profileCompletion(initialOwnProfile).percent, 100);
 const partial = profileCompletion({ ...initialOwnProfile, location: '', skills: [], milestones: [] });
 assert.equal(partial.complete, partial.total - 3); assert.ok(partial.percent < 100);
});
