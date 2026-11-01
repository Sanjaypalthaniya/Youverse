import { people } from './mock.js';

export const identityInterests = ['Creativity', 'Slow living', 'Side projects', 'Personal growth', 'Design', 'Photography', 'Technology'];
export const intentionOptions = ['Create with courage', 'Learn together', 'Collaborate thoughtfully', 'Find community', 'Make time to notice'];
export const profileLimits = { name: 60, handle: 30, craft: 90, location: 80, bio: 500, statement: 160, chip: 60, highlights: 5, milestones: 8 };
const metadata = [
 { location: 'Bengaluru, India', bio: 'Collecting ordinary moments and turning them into illustrations. Making a little room for creative courage.', statement: 'Making ordinary moments feel worth noticing.', skills: ['Visual storytelling', 'Illustration', 'Design systems'], interests: ['Creativity', 'Slow living', 'Design', 'Photography'], intentions: ['Create with courage', 'Learn together'], highlights: ['An everyday sketchbook practice', 'Making design a little more human'], milestones: [{ id: 'ananya-1', date: '2026-10-18', title: 'Thirty days of everyday sketches', description: 'A tiny drawing each morning, without needing it to be perfect.' }, { id: 'ananya-2', date: '2026-09-01', title: 'Started Everyday, Illustrated', description: 'A collection of moments we almost miss.' }], projectIds: ['project-1'], circleIds: ['creative'], cover: 'coral', followerIds: ['maker-1', 'maker-2'] },
 { location: 'Pune, India', bio: 'Building neighbourhood projects with people who care. Currently making room for a hundred borrowed adventures.', statement: 'Useful things, built with care and a few curious people.', skills: ['Community building', 'Prototyping', 'Project planning'], interests: ['Slow living', 'Side projects', 'Technology'], intentions: ['Collaborate thoughtfully', 'Find community'], highlights: ['The Little Library, built with neighbours', 'Learning to build in public'], milestones: [{ id: 'kabir-1', date: '2026-10-24', title: 'A home for one hundred books', description: 'Our neighbours filled the shelves and brought the lemon cake.' }, { id: 'kabir-2', date: '2026-08-10', title: 'Opened the first library shelf', description: 'A borrowed shelf and an open invitation.' }], projectIds: ['project-0'], circleIds: ['creative', 'mindful'], cover: 'green', followerIds: ['maker-0'] },
 { location: 'Kochi, India', bio: 'Writing field notes from the long way home. Curious about places, people and the practice of slowing down.', statement: 'Take the long way. There is a story there.', skills: ['Writing', 'Photography', 'Facilitating conversations'], interests: ['Side projects', 'Personal growth', 'Slow living', 'Photography'], intentions: ['Make time to notice', 'Find community'], highlights: ['Host of the Sunday noticing walk', 'A notebook for small beginnings'], milestones: [{ id: 'meera-1', date: '2026-10-11', title: 'Our first noticing walk', description: 'No distance goal. Just good company and curiosity.' }, { id: 'meera-2', date: '2026-09-07', title: 'A month of field notes', description: 'Learning to record the everyday before it slips past.' }], projectIds: ['project-2'], circleIds: ['mindful'], cover: 'violet', followerIds: ['maker-0', 'maker-1'] }
];

export const makerProfiles = people.map((person, index) => ({ ...person, ...metadata[index], id: `maker-${index}`, slug: person.handle, personIndex: index, following: index === 0, avatarStyle: 'initials' }));
export const initialOwnProfile = {
 id: 'self', slug: 'aaravshah', name: 'Aarav Shah', handle: 'aaravshah', craft: 'Designer & curious builder', location: 'Mumbai, India', color: 'green', cover: 'violet', avatarStyle: 'initials',
 bio: 'Designer by craft. Curious by nature. Collecting little moments and building meaningful things with people who care.', statement: 'Always a work in progress. Keep becoming.',
 skills: ['Product design', 'Prototyping', 'Visual storytelling'], interests: ['Creativity', 'Slow living', 'Side projects', 'Design', 'Photography'], intentions: ['Create with courage', 'Collaborate thoughtfully'],
 highlights: ['Helping The Little Library find its shape'], milestones: [{ id: 'aarav-1', date: '2026-10-20', title: 'Joined The Little Library collaboration', description: 'Making room for stories, one neighbourhood at a time.' }, { id: 'aarav-2', date: '2026-09-12', title: 'Made time for a personal practice', description: 'Twenty minutes of making, without a brief.' }],
 projectIds: ['project-0', 'project-1'], circleIds: ['creative', 'mindful'], followerIds: ['maker-1']
};
export function getMaker(identifier) { return makerProfiles.find(maker => maker.slug === identifier || maker.id === identifier); }
export function profileHref(maker) { return `/profile/${maker.slug}`; }
export function sharedInterests(first, second) { return [...new Set(first.interests)].filter(interest => second.interests.includes(interest)); }
export function sharedCuriosityText(first, second) { const common = sharedInterests(first, second); return common.length ? `You both explore ${common.join(' and ')}.` : 'A new perspective to get curious about.'; }
export function profileCompletion(profile) {
 const fields = ['name', 'handle', 'craft', 'location', 'bio', 'statement', 'skills', 'interests', 'intentions', 'highlights', 'milestones'];
 const complete = fields.filter(field => Array.isArray(profile[field]) ? profile[field].length > 0 : !!profile[field]?.trim()).length;
 return { complete, total: fields.length, percent: Math.round(complete / fields.length * 100) };
}
export function validateProfile(profile) {
 const errors = {};
 for (const field of ['name', 'handle', 'craft', 'location', 'bio', 'statement']) {
  if (['name', 'handle', 'craft', 'bio'].includes(field) && !profile[field].trim()) errors[field] = 'Add this part of your identity before saving.';
  else if (profile[field].length > profileLimits[field]) errors[field] = `Keep this within ${profileLimits[field]} characters.`;
 }
 if (profile.handle && !/^[a-zA-Z0-9][a-zA-Z0-9._]{2,29}$/.test(profile.handle)) errors.handle = 'Use 3–30 letters, numbers, dots or underscores; start with a letter or number.';
 if (makerProfiles.some(maker => maker.handle.toLowerCase() === profile.handle.toLowerCase())) errors.handle = 'This demo username already belongs to another maker.';
 for (const field of ['skills', 'interests', 'intentions', 'highlights']) {
  const limit = field === 'highlights' ? profileLimits.highlights : 10;
  if (profile[field].length > limit || profile[field].some(value => !value.trim() || value.length > profileLimits.chip) || new Set(profile[field].map(value => value.trim().toLowerCase())).size !== profile[field].length) errors[field] = `Use up to ${limit} unique entries, each 1–${profileLimits.chip} characters.`;
 }
 if (!profile.interests.length) errors.interests = 'Choose at least one curiosity.';
 if (profile.milestones.length > profileLimits.milestones || profile.milestones.some(item => !item.title.trim() || item.title.length > 80 || item.description.length > 240 || !isValidDate(item.date))) errors.milestones = 'Add a title (up to 80 characters), a valid date, and a description up to 240 characters. Use at most 8 milestones.';
 return errors;
}
export function isValidDate(value) { if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false; const date = new Date(`${value}T12:00:00Z`); return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value; }
export function normalizeProfile(profile) { return { ...profile, ...Object.fromEntries(['name', 'handle', 'craft', 'location', 'bio', 'statement'].map(field => [field, profile[field].trim()])), ...Object.fromEntries(['skills', 'interests', 'intentions', 'highlights'].map(field => [field, profile[field].map(value => value.trim())])), milestones: profile.milestones.map(item => ({ ...item, title: item.title.trim(), description: item.description.trim() })) }; }
