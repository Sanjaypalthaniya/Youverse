'use client';
import { useSocial } from './SocialProvider';
import { projectFixtures } from '../data/projects';
export function useProjects() {
 const { projectOverrides, projectDrafts, setProjectDrafts, setProjectOverrides, projectRequests, setProjectRequests, starredProjects, setStarredProjects } = useSocial();
 const projects = projectFixtures.map(project => projectOverrides[project.id] || project);
 function star(id) { setStarredProjects(previous => previous.includes(id) ? previous.filter(value => value !== id) : [...previous, id]); }
 function draft(key, value) { setProjectDrafts(previous => { const next = { ...previous }; if (value === null) delete next[key]; else next[key] = value; return next; }); }
 function save(project) { if (project.ownerId !== 'self') return; setProjectOverrides(previous => ({ ...previous, [project.id]: project })); draft(project.id, null); }
 return { projects, projectDrafts, draft, save, star, starredProjects, projectRequests, setProjectRequests };
}
