import { projects as originals } from './mock.js';
import { getMaker, initialOwnProfile, profileHref, isValidDate } from './identity.js';

export const projectCategories = ['Community', 'Art & design', 'Wellbeing', 'Design & technology'];
export const projectStatuses = ['Exploring', 'In progress', 'Completed', 'Paused'];
export const milestoneStatuses = ['Upcoming', 'In progress', 'Completed'];
export const projectVisibilities = ['Public', 'Followers', 'Only me'];
export const projectLimits = { title: 80, text: 180, mission: 2000, chip: 60, introduction: 500 };
const details = [
 { slug: 'the-little-library', ownerId: 'maker-1', category: 'Community', status: 'In progress', skills: ['Community building', 'Project planning', 'Product design'], tags: ['Side projects', 'Slow living'], mission: 'A neighbourhood should have room for stories. We are building small, welcoming lending shelves where a borrowed book can become a conversation. Our next step is a second shelf, designed and cared for with the people who live nearby.', roles: [{ id: 'host', title: 'Neighbourhood host', description: 'Help care for a shelf and welcome readers.' }, { id: 'designer', title: 'Shelf experience designer', description: 'Make borrowing simple, welcoming and accessible.' }], team: [{ makerId: 'maker-1', role: 'Founder & community builder' }, { makerId: 'self', role: 'Design collaborator' }], stages: ['Listen to the neighbourhood', 'Open the first shelf', 'Welcome a second neighbourhood'], completed: 2, note: 'A hundred books have found a home. We are learning what makes a shelf feel welcoming before building the next one.', featured: true, trending: true },
 { slug: 'everyday-illustrated', ownerId: 'maker-0', category: 'Art & design', status: 'Exploring', skills: ['Illustration', 'Visual storytelling', 'Photography'], tags: ['Creativity', 'Design'], mission: 'An illustrated collection of the moments we almost miss: a kitchen window, a familiar walk, a stranger reading on the bus. We are exploring a small printed field guide that helps people look a little closer.', roles: [{ id: 'illustrator', title: 'Everyday illustrator', description: 'Bring a small visual field note from your day.' }], team: [{ makerId: 'maker-0', role: 'Illustrator & project lead' }, { makerId: 'self', role: 'Creative collaborator' }], stages: ['Collect everyday observations', 'Explore a shared visual language', 'Make the first field guide'], completed: 1, note: 'Thirty mornings of sketches, and a growing collection of details worth keeping.', featured: false, trending: true },
 { slug: 'slow-sunday-club', ownerId: 'maker-2', category: 'Wellbeing', status: 'In progress', skills: ['Facilitating conversations', 'Writing', 'Community building'], tags: ['Slow living', 'Personal growth'], mission: 'A softer space for people who want to slow down. We host gentle noticing walks with no distance goal, and collect field notes about what happens when we make a little room for each other.', roles: [{ id: 'walk-host', title: 'Noticing walk host', description: 'Help plan a gentle, accessible Sunday route.' }], team: [{ makerId: 'maker-2', role: 'Writer & walk host' }], stages: ['Find an accessible route', 'Host the first noticing walk', 'Publish a gentle walking guide'], completed: 2, note: 'Our first walk had no finish line. We came home with twelve small things worth noticing.', featured: false, trending: true },
 { slug: 'small-beginnings', ownerId: 'self', category: 'Design & technology', status: 'In progress', skills: ['Product design', 'Prototyping', 'Writing'], tags: ['Creativity', 'Side projects'], mission: 'A small, accessible collection of creative prompts for people starting again. I am exploring how a thoughtful question, a blank page and twenty quiet minutes can make a new practice feel possible.', roles: [{ id: 'prompt-writer', title: 'Creative prompt writer', description: 'Shape gentle, specific prompts for a first creative step.' }, { id: 'accessibility-reviewer', title: 'Accessibility reviewer', description: 'Help make the prompts welcoming to more people.' }], team: [{ makerId: 'self', role: 'Designer & project owner' }], stages: ['Listen to creative beginners', 'Prototype ten gentle prompts', 'Try the first shared practice'], completed: 1, note: 'Five conversations reminded me that starting small is a design choice. The first ten prompts are taking shape.', featured: true, trending: false }
];
export const projectFixtures = details.map((detail, index) => ({
 ...(originals[index] || { title: 'Small Beginnings', text: 'Gentle creative prompts for people finding their way back to making.', color: 'violet', type: 'Design & technology · In progress' }), ...detail, id: `project-${index}`, person: detail.ownerId === 'self' ? -1 : getMaker(detail.ownerId).personIndex, topic: detail.tags[0], collaboration: detail.roles[0].title, collaborationOpen: true, cover: originals[index]?.color || 'violet', visibility: 'Public',
 milestones: detail.stages.map((title, step) => ({ id: `project-${index}-step-${step}`, title, date: ['2026-09-15', '2026-10-24', '2026-12-01'][step], status: step < detail.completed ? 'Completed' : step === detail.completed ? 'In progress' : 'Upcoming' })),
 roadmap: detail.stages.map((title, step) => ({ id: `project-${index}-road-${step}`, title, status: step < detail.completed ? 'Completed' : step === detail.completed ? 'In progress' : 'Upcoming' })),
 updates: [{ id: `project-${index}-update-1`, date: '2026-10-24', title: 'A little progress, shared', text: detail.note, makerId: detail.ownerId }], relatedIds: details.map((_, related) => `project-${related}`).filter(id => id !== `project-${index}`).slice(0, 2)
}));
export const projectHref = project => `/projects/${project.slug}`;
export const getProject = identifier => projectFixtures.find(project => project.id === identifier || project.slug === identifier);
export const getProjectBySlug = slug => projectFixtures.find(project => project.slug === slug);
export const projectOwner = (project, ownProfile = initialOwnProfile) => project.ownerId === 'self' ? ownProfile : getMaker(project.ownerId);
export const ownerHref = project => project.ownerId === 'self' ? '/profile' : profileHref(getMaker(project.ownerId));
export function projectProgress(project) { const total = project.milestones.length; const complete = project.milestones.filter(item => item.status === 'Completed').length; return { complete, total, percent: total ? Math.round(complete / total * 100) : 0 }; }
export function filterProjects(projects, { query = '', category = 'All', status = 'All', availability = 'All' } = {}) { const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean); return projects.filter(project => (category === 'All' || project.category === category) && (status === 'All' || project.status === status) && (availability === 'All' || (availability === 'Open' ? project.collaborationOpen && project.roles.length > 0 && !['Completed','Paused'].includes(project.status) : !project.collaborationOpen || !project.roles.length || ['Completed','Paused'].includes(project.status))) && words.every(word => `${project.title} ${project.text} ${project.mission} ${project.skills.join(' ')} ${project.tags.join(' ')} ${projectOwner(project).name}`.toLowerCase().includes(word))); }
export const emptyProjectDraft = { title: '', text: '', mission: '', category: projectCategories[0], status: 'Exploring', skills: [], tags: [], collaborationOpen: true, roles: [], milestones: [], cover: 'violet', visibility: 'Public', ownerId: 'self' };
export function validateProject(project) {
 const errors = {};
 for (const field of ['title', 'text', 'mission']) if (!project[field].trim() || project[field].length > projectLimits[field]) errors[field] = `Add ${field === 'text' ? 'a short description' : field === 'title' ? 'a project name' : 'a mission'} within ${projectLimits[field]} characters.`;
 if (!projectCategories.includes(project.category)) errors.category = 'Choose an available category.';
 if (!projectStatuses.includes(project.status)) errors.status = 'Choose a project status.';
 if (!projectVisibilities.includes(project.visibility)) errors.visibility = 'Choose a visibility.';
 for (const field of ['skills', 'tags']) if (!project[field].length || project[field].length > 10 || project[field].some(item => !item.trim() || item.length > 60) || new Set(project[field].map(item => item.trim().toLowerCase())).size !== project[field].length) errors[field] = 'Add 1–10 unique entries, up to 60 characters each.';
 if (project.roles.length > 8 || project.roles.some(role => !role.id || !role.title.trim() || role.title.length > 80 || role.description.length > 240) || new Set(project.roles.map(role => role.id)).size !== project.roles.length || new Set(project.roles.map(role => role.title.trim().toLowerCase())).size !== project.roles.length || project.collaborationOpen && !project.roles.length) errors.roles = 'Open collaboration needs a role. Use up to 8 unique roles with titles up to 80 and descriptions up to 240 characters.';
 if (!project.milestones.length || project.milestones.length > 10 || project.milestones.some(item => !item.id || !item.title.trim() || item.title.length > 80 || !isValidDate(item.date) || !milestoneStatuses.includes(item.status)) || new Set(project.milestones.map(item => item.id)).size !== project.milestones.length) errors.milestones = 'Add 1–10 milestones with a title up to 80 characters, valid date and status.';
 if (project.status === 'Completed' && projectProgress(project).percent !== 100) errors.status = 'Complete every milestone before marking the project completed.';
 if (!['violet', 'coral', 'green'].includes(project.cover)) errors.cover = 'Choose an illustrated cover.';
 return errors;
}
export function normalizeProject(project) { return { ...project, title: project.title.trim(), text: project.text.trim(), mission: project.mission.trim(), skills: project.skills.map(item => item.trim()), tags: project.tags.map(item => item.trim()), roles: project.roles.map(role => ({ ...role, title: role.title.trim(), description: role.description.trim() })), milestones: project.milestones.map(item => ({ ...item, title: item.title.trim() })), roadmap: project.milestones.map(item => ({ ...item })), topic: project.tags[0]?.trim(), color: project.cover, collaboration: project.collaborationOpen ? 'Open to collaborators' : 'Collaboration closed' }; }
export const initialProjectRequests = [
 { id: 'incoming-ananya', projectId: 'project-3', makerId: 'maker-0', roleId: 'prompt-writer', introduction: 'I would love to turn my everyday sketchbook practice into a few visual prompts for people finding their way back to making.', status: 'pending' },
 { id: 'incoming-meera', projectId: 'project-3', makerId: 'maker-2', roleId: 'accessibility-reviewer', introduction: 'Hosting gentle walks taught me to make invitations feel welcoming. I would love to review the language and pacing of your prompts.', status: 'pending' }
];
export function validateCollaboration(project, request) {
 const errors = {};
 if (!project || project.ownerId === request.makerId || !project.collaborationOpen || ['Completed','Paused'].includes(project.status)) errors.project = 'This project is not accepting a request from this identity.';
 if (project && !project.roles.some(role => role.id === request.roleId)) errors.role = 'Choose one of this project’s needed roles.';
 if (!request.introduction.trim() || request.introduction.length > 500) errors.introduction = 'Write a short introduction of 1–500 characters.';
 if (request.makerId !== 'self' && !getMaker(request.makerId)) errors.maker = 'Choose a valid maker identity.';
 return errors;
}
export function submitProjectRequest(requests, project, request) {
 const errors = validateCollaboration(project, request);
 if (requests.some(item => item.projectId === project?.id && item.makerId === request.makerId && ['pending','accepted'].includes(item.status))) errors.duplicate = 'You already have a pending or accepted request for this project.';
 if (requests.some(item => item.id === request.id)) errors.duplicate = 'This request already exists.';
 if (Object.keys(errors).length) return { requests, errors };
 return { requests: [...requests, { ...request, projectId: project.id, introduction: request.introduction.trim(), status: 'pending' }], errors: {} };
}
export function transitionProjectRequest(requests, project, requestId, action, actorId) {
 const request = requests.find(item => item.id === requestId);
 const allowed = request && project && request.projectId === project.id && request.status === 'pending' && ((action === 'cancelled' && request.makerId === actorId) || (['accepted','declined'].includes(action) && project.ownerId === actorId));
 if (!allowed) return { requests, error: 'Only a pending request can be changed by its requester or project owner.' };
 if (action === 'accepted' && (!project.collaborationOpen || ['Paused','Completed'].includes(project.status) || !project.roles.some(role => role.id === request.roleId))) return { requests, error: 'This role is no longer accepting collaborators. Reopen the role or decline the request.' };
 return { requests: requests.map(item => item.id === requestId ? { ...item, status: action } : item), error: '' };
}
