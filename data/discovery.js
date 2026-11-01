import { makers, reflections, reels, circles, interests } from './social.js';
import { projectFixtures, projectHref } from './projects.js';
import { profileHref } from './identity.js';
import { circleHref } from './circles.js';

export const categories = ['All', 'People', 'Posts', 'Reels', 'Circles', 'Projects'];
export const formats = ['Reflection / Thought', 'Image Post', 'Story', 'Reel', 'Question', 'Project Update', 'Milestone'];
export const suggestedSearches = ['Creativity', 'The Little Library', 'Slow living', 'Ananya'];
export const discoveryMakers = makers;
export const discoveryCircles = circles;
export const discoveryProjects = projectFixtures;
export const discoveryItems = [
 ...discoveryMakers.map(person => ({ id: person.id, category: 'People', title: person.name, text: `${person.craft} ${person.bio} ${person.skills.join(' ')} ${person.intentions.join(' ')}`, interests: person.interests, href: profileHref(person), person })),
 ...reflections.map(post => ({ id: `post-${post.id}`, category: 'Posts', title: post.topic, text: `${post.text} ${makers[post.person].name}`, interests: [post.tag], href: `/post/${post.id}`, post })),
 ...reels.map(reel => ({ id: reel.id, category: 'Reels', title: reel.title, text: `${reel.caption} ${makers[reel.person].name}`, interests: [reel.curiosity], href: `/reels#${reel.id}`, reel })),
 ...discoveryCircles.map(circle => ({ id: circle.id, category: 'Circles', title: circle.name, text: circle.description, interests: circle.topics, href: circleHref(circle), circle })),
 ...discoveryProjects.map(project => ({ id: project.id, category: 'Projects', title: project.title, text: `${project.text} ${project.status} ${project.collaboration}`, interests: project.tags, href: projectHref(project), project }))
];
export function searchDiscovery({ query = '', category = 'All', interest = '', projects = discoveryProjects } = {}) {
 const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
 return discoveryItems.map(item => { if (!item.project) return item; const project = projects.find(project => project.id === item.id) || item.project; return { ...item, project, title: project.title, text: `${project.text} ${project.status} ${project.collaboration} ${project.skills.join(' ')}`, interests: project.tags, href: projectHref(project) }; }).filter(item => {
  const haystack = `${item.title} ${item.text} ${item.interests.join(' ')}`.toLocaleLowerCase();
  return (category === 'All' || category === item.category) && (!interest || item.interests.includes(interest)) && words.every(word => haystack.includes(word));
 });
}
export const emptyDraft = { format: formats[0], text: '', tags: [], circle: '', visibility: 'Public', media: false };
export function validateDraft(draft) {
 const errors = {};
 if (!draft.text.trim()) errors.text = 'Add a thought or caption before previewing or publishing.';
 if (draft.text.length > 1500) errors.text = 'Keep your story within 1,500 characters.';
 if (['Image Post', 'Story', 'Reel'].includes(draft.format) && !draft.media) errors.media = 'Add the illustrated demo media to preview this format. No files are uploaded.';
 if (!draft.tags.length) errors.tags = 'Choose at least one curiosity to help your people find this.';
 if (draft.visibility === 'Selected Circle' && !draft.circle) errors.circle = 'Choose a Circle for this visibility.';
 return errors;
}
export const notificationTabs = ['All', 'Unread', 'Mentions', 'Connections', 'Communities'];
export const notifications = [
 { id: 'notice-like', person: 0, type: 'like', category: 'All', title: 'Ananya liked your reflection', text: '“Make room for the little things.”', time: '12 minutes ago', group: 'Today', unread: true, href: '/post/3' },
 { id: 'notice-comment', person: 2, type: 'comment', category: 'Mentions', title: 'Meera mentioned you in a comment', text: '“Aarav, this reminded me of our conversation about beginning again.”', time: '34 minutes ago', group: 'Today', unread: true, href: '/post/1#comments' },
 { id: 'notice-follow', person: 1, type: 'follow', category: 'Connections', title: 'Kabir started following your reflections', text: 'A shared curiosity: making things that matter. Following is separate from Connect.', time: '1 hour ago', group: 'Today', unread: true, href: profileHref(makers[1]) },
 { id: 'notice-circle', person: 2, type: 'circle', category: 'Communities', title: 'A new conversation in Mindful Moments', text: 'Meera asks: what did you notice on your walk today?', time: '2 hours ago', group: 'Today', unread: true, href: '/circles/mindful-moments/discussion/mindful-walk' },
 { id: 'notice-project', person: 1, type: 'project', category: 'Communities', title: 'The Little Library is looking for collaborators', text: 'Kabir shared a new field note and an invitation for neighbourhood hosts.', time: 'Yesterday, 5:20 pm', group: 'Yesterday', unread: false, href: '/projects/the-little-library#activity' },
 { id: 'notice-request', person: 0, type: 'request', category: 'Connections', title: 'Ananya sent a demo Connect request', text: 'An invitation to collaborate. Review the Connect preview; no request was actually sent.', time: 'Yesterday, 3:10 pm', group: 'Yesterday', unread: true, href: '/connect?tab=Incoming' },
 { id: 'notice-match', person: 2, type: 'match', category: 'Connections', title: 'A glimpse of a mutual Connect match', text: 'Demo activity only. Private messages require mutual acceptance; this preview does not create a match.', time: 'Yesterday, 11:30 am', group: 'Yesterday', unread: false, href: '/connect?tab=Matches' },
 { id: 'notice-milestone', person: 1, type: 'milestone', category: 'Communities', title: 'A hundred books. A wonderful beginning.', text: 'Celebrate The Little Library’s first milestone with Kabir.', time: 'Monday, 9:00 am', group: 'Earlier', unread: false, href: '/post/5' }
];
