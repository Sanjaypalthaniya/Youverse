import test from 'node:test';
import assert from 'node:assert/strict';
import { searchDiscovery, discoveryItems, categories, emptyDraft, validateDraft, formats, notifications } from '../data/discovery.js';
test('search supports multiple words, case, whitespace and author names', () => {
 assert.ok(searchDiscovery({ query: '  LITTLE library  ' }).some(item => item.category === 'Projects'));
 const authorResults = searchDiscovery({ query: 'ananya', category: 'Posts' });
 assert.ok(authorResults.length > 0);
 assert.ok(authorResults.every(item => item.post.person === 0));
 assert.equal(searchDiscovery({ query: 'nothing-matches-this' }).length, 0);
});
test('category and curiosity filters combine without unrelated results', () => {
 for (const category of categories.slice(1)) {
  const results = searchDiscovery({ category });
  assert.ok(results.length > 0);
  assert.ok(results.every(item => item.category === category));
 }
 const filtered = searchDiscovery({ category: 'People', interest: 'Creativity' });
 assert.ok(filtered.length > 0);
 assert.ok(filtered.every(item => item.person && item.interests.includes('Creativity')));
 assert.equal(searchDiscovery().length, discoveryItems.length);
});
test('draft validation rejects whitespace, missing media, invalid Circle visibility and overflow', () => {
 assert.ok(validateDraft({ ...emptyDraft, text: '   ' }).text);
 assert.ok(validateDraft({ ...emptyDraft, text: 'Hello' }).tags);
 assert.ok(validateDraft({ ...emptyDraft, text: 'x'.repeat(1501), tags: ['Creativity'] }).text);
 for (const format of ['Image Post', 'Story', 'Reel']) assert.ok(validateDraft({ ...emptyDraft, format, text: 'Hello', tags: ['Creativity'] }).media);
 assert.ok(validateDraft({ ...emptyDraft, text: 'Hello', tags: ['Creativity'], visibility: 'Selected Circle' }).circle);
 for (const format of formats) assert.deepEqual(validateDraft({ ...emptyDraft, format, text: 'A small beginning', tags: ['Creativity'], media: true }), {});
});
test('discovery and notification IDs are unique and their links target existing surfaces', () => {
 assert.equal(new Set(discoveryItems.map(item => item.id)).size, discoveryItems.length);
 assert.equal(new Set(notifications.map(item => item.id)).size, notifications.length);
 for (const item of [...discoveryItems, ...notifications]) assert.match(item.href, /^\/(profile\/(ananyacreates|kabir\.builds|meerawanders)|post\/[1-6](#comments)?|reels#reel-\d|circles|projects(\/[a-z-]+)?(#activity)?|connect)$/);
});
