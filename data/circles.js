import { getMaker, initialOwnProfile } from './identity.js';

export const circleCategories = ['Creativity', 'Wellbeing', 'Building together'];
const guidelines = ['Be curious before being certain. Ask thoughtful questions and make room for different experiences.', 'Share work and feedback with care. Critique the idea, respect the person, and credit original creators.', 'Protect personal information. Ask before sharing someone else’s story, image or contact details.', 'Keep introductions welcome and unhurried. No spam, harassment or pressure to connect privately.'];
export const circleFixtures = [
 { id: 'creative', slug: 'the-creative-corner', name: 'The Creative Corner', members: 128, category: 'Creativity', topic: 'Creativity', topics: ['Creativity', 'Design', 'Photography'], cover: 'violet', description: 'A welcoming corner for experiments, unfinished sketches and creative questions.', purpose: 'A place to share the practice, not just the polished outcome. Bring the thing you are trying, the question you are sitting with, or a little everyday wonder.', creatorId: 'maker-0', moderatorIds: ['maker-0'], memberIds: ['maker-0', 'maker-1', 'self'], guidelines, relatedIds: ['mindful', 'builders'], featured: true },
 { id: 'mindful', slug: 'mindful-moments', name: 'Mindful Moments', members: 86, category: 'Wellbeing', topic: 'Slow living', topics: ['Slow living', 'Personal growth', 'Photography'], cover: 'green', description: 'Noticing walks, gentle rituals and conversations without a deadline.', purpose: 'A little space to slow down with others. We exchange ordinary observations, gentle practices and honest questions about making time for what matters.', creatorId: 'maker-2', moderatorIds: ['maker-2', 'maker-1'], memberIds: ['maker-1', 'maker-2', 'self'], guidelines, relatedIds: ['creative', 'builders'], featured: true },
 { id: 'builders', slug: 'builders-and-dreamers', name: 'Builders & Dreamers', members: 54, category: 'Building together', topic: 'Side projects', topics: ['Side projects', 'Technology', 'Creativity'], cover: 'coral', description: 'Small starts, useful experiments and ideas made better together.', purpose: 'For people building something with intention. Share a prototype, ask for a fresh perspective, or help another maker take their next small step.', creatorId: 'maker-1', moderatorIds: ['maker-1'], memberIds: ['maker-1'], guidelines, relatedIds: ['creative', 'mindful'], featured: false }
];
export const discussions = [
 { id: 'creative-noticing', circleId: 'creative', authorId: 'maker-0', title: 'What did you notice when you put the screen away?', body: 'This weekend I traded my screen for a sketchbook and a slow morning. A crooked window frame became my favourite drawing. Share one ordinary detail that caught your attention, or a small experiment you would like to try.', tags: ['Creativity', 'Photography'], pinned: true, featured: true, time: 'Today · 9:15 am', reactions: 18, replies: [{ id: 'noticing-reply-1', authorId: 'maker-1', text: 'The handwritten labels on our library shelves. Each one carries a little of the neighbour who made it.', time: 'Today · 10:10 am' }] },
 { id: 'creative-stuck', circleId: 'creative', authorId: 'maker-1', title: 'A small ritual for getting unstuck', body: 'When an idea feels too big, I make the smallest version I can explain to a friend. What helps you start again? Half-formed thoughts are welcome here.', tags: ['Creativity', 'Design'], pinned: false, featured: false, time: 'Yesterday · 4:30 pm', reactions: 7, replies: [] },
 { id: 'mindful-walk', circleId: 'mindful', authorId: 'maker-2', title: 'Sunday’s noticing walk has no distance goal', body: 'Bring your curiosity and one thing you would like to see more closely. We will take a gentle, accessible route and pause whenever someone finds something worth noticing. What would make this walk welcoming for you?', tags: ['Slow living', 'Photography'], pinned: true, featured: true, time: 'Today · 8:40 am', reactions: 24, replies: [{ id: 'walk-reply-1', authorId: 'maker-1', text: 'A few places to sit and a clear starting point would help. Happy to bring a notebook for shared observations.', time: 'Today · 9:20 am' }] },
 { id: 'mindful-ritual', circleId: 'mindful', authorId: 'maker-1', title: 'One small thing you are making room for', body: 'Mine is drinking the first cup of tea without opening a task list. Not a challenge or a streak. Just a small practice. What is yours?', tags: ['Slow living', 'Personal growth'], pinned: false, featured: false, time: 'Yesterday · 7:10 am', reactions: 11, replies: [] },
 { id: 'builders-first-step', circleId: 'builders', authorId: 'maker-1', title: 'What is the smallest useful version of your idea?', body: 'The Little Library began with a borrowed shelf. Tell us what you are exploring and one small step you could take this week. Thoughtful feedback is welcome; unsolicited private messages are not.', tags: ['Side projects', 'Technology'], pinned: true, featured: true, time: 'Today · 11:05 am', reactions: 9, replies: [] }
];
export const circleHref = circle => `/circles/${circle.slug}`;
export const getCircle = identifier => circleFixtures.find(circle => circle.id === identifier || circle.slug === identifier);
export const getCircleBySlug = slug => circleFixtures.find(circle => circle.slug === slug);
export const getDiscussion = (circleId, discussionId) => discussions.find(discussion => discussion.circleId === circleId && discussion.id === discussionId);
export const discussionHref = discussion => `${circleHref(getCircle(discussion.circleId))}/discussion/${discussion.id}`;
export const initialCircleMemberships = [...initialOwnProfile.circleIds];
export function transitionMembership(memberships, circleId, action) {
 if (!getCircle(circleId) || !['join','leave'].includes(action)) return { memberships, error: 'Choose an existing Circle and a valid membership action.' };
 return { memberships: action === 'join' ? [...new Set([...memberships, circleId])] : memberships.filter(id => id !== circleId), error: '' };
}
export function circleMemberCount(circle, memberships) { return circle.members + Number(memberships.includes(circle.id)) - Number(initialCircleMemberships.includes(circle.id)); }
export function visibleCircleMembers(circle, memberships) { return [...circle.memberIds.filter(id => id !== 'self'), ...(memberships.includes(circle.id) ? ['self'] : [])]; }
export function filterCircles({ query = '', category = 'All', interest = '', mine = false, memberships = [] } = {}) {
 const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
 return circleFixtures.filter(circle => (!mine || memberships.includes(circle.id)) && (category === 'All' || circle.category === category) && (!interest || circle.topics.includes(interest)) && words.every(word => `${circle.name} ${circle.description} ${circle.purpose} ${circle.topics.join(' ')}`.toLowerCase().includes(word)));
}
export const emptyDiscussionDraft = { title: '', body: '', tags: [], image: false };
export function validateDiscussion(draft, circleId, memberships) {
 const errors = {}; const circle = getCircle(circleId);
 if (!circle || !memberships.includes(circleId)) errors.membership = 'Join this Circle before preparing a discussion.';
 if (!draft.title.trim() || draft.title.length > 120) errors.title = 'Add a title of 1–120 characters.';
 if (!draft.body.trim() || draft.body.length > 3000) errors.body = 'Add a discussion of 1–3,000 characters.';
 if (!draft.tags.length || draft.tags.length > 3 || new Set(draft.tags).size !== draft.tags.length || draft.tags.some(tag => !circle?.topics.includes(tag))) errors.tags = 'Choose 1–3 of this Circle’s topics.';
 return errors;
}
export function validateReply(text, circleId, memberships) { if (!getCircle(circleId) || !memberships.includes(circleId)) return 'Join this Circle before replying.'; if (!text.trim() || text.length > 1000) return 'Write a reply of 1–1,000 characters.'; return ''; }
export function appendCircleReply(replies, discussionId, reply, memberships) {
 const discussion = discussions.find(item => item.id === discussionId);
 const error = discussion ? validateReply(reply.text, discussion.circleId, memberships) : 'This discussion does not exist.';
 if (error || reply.authorId !== 'self' || !reply.id || [...discussions.flatMap(item=>item.replies),...Object.values(replies).flat()].some(item => item.id === reply.id)) return { replies, error: error || 'Use the signed-in demo identity and a unique reply ID.' };
 return { replies: { ...replies, [discussionId]: [...(replies[discussionId] || []), { ...reply, text: reply.text.trim() }] }, error: '' };
}
export function toggleCircleReaction(reactions, discussionId, memberships) {
 const discussion = discussions.find(item => item.id === discussionId);
 if (!discussion || !memberships.includes(discussion.circleId)) return { reactions, error: 'Join this Circle before reacting.' };
 return { reactions: reactions.includes(discussionId) ? reactions.filter(id => id !== discussionId) : [...reactions, discussionId], error: '' };
}
