import test from 'node:test';
import assert from 'node:assert/strict';
import { projectFixtures, getProject, getProjectBySlug, projectHref, projectOwner, ownerHref, projectProgress, filterProjects, validateProject, emptyProjectDraft, normalizeProject, initialProjectRequests, validateCollaboration, submitProjectRequest, transitionProjectRequest } from '../data/projects.js';
import { getMaker, initialOwnProfile } from '../data/identity.js';
import { discoveryProjects, discoveryItems } from '../data/discovery.js';
test('project IDs, canonical slugs, owner references and discovery links resolve consistently', () => {
 assert.equal(projectFixtures,discoveryProjects); assert.equal(new Set(projectFixtures.map(project=>project.id)).size,projectFixtures.length); assert.equal(new Set(projectFixtures.map(project=>project.slug)).size,projectFixtures.length);
 for(const project of projectFixtures){ assert.equal(getProject(project.id),project); assert.equal(getProjectBySlug(project.slug),project); assert.equal(getProjectBySlug(project.id),undefined); assert.ok(projectOwner(project)); assert.equal(projectOwner(project).id,project.ownerId); assert.equal(ownerHref(project),project.ownerId==='self'?'/profile':`/profile/${getMaker(project.ownerId).slug}`); assert.equal(discoveryItems.find(item=>item.id===project.id).href,projectHref(project)); assert.ok(project.team.every(member=>member.makerId==='self'||getMaker(member.makerId))); assert.ok(project.relatedIds.every(id=>getProject(id)&&id!==project.id)); }
 assert.equal(getProject('missing'),undefined); assert.equal(getProjectBySlug('create'),undefined); assert.equal(getProject('project-100'),undefined); assert.ok(initialOwnProfile.projectIds.every(id=>getProject(id)));
});
test('roadmaps and milestones use valid statuses and progress follows completion',()=>{
 for(const project of projectFixtures){assert.deepEqual(validateProject(project),{});assert.equal(project.roadmap.length,project.milestones.length);assert.deepEqual(project.roadmap.map(item=>item.status),project.milestones.map(item=>item.status));const progress=projectProgress(project);assert.ok(progress.percent>=0&&progress.percent<=100);}
 const project=projectFixtures[0]; assert.equal(projectProgress({...project,milestones:project.milestones.map(item=>({...item,status:'Completed'}))}).percent,100); assert.equal(projectProgress({...project,milestones:[]}).percent,0);
});
test('search combines project owner, skill, category, status and collaboration filters',()=>{
 assert.ok(filterProjects(projectFixtures,{query:'kabir community'}).some(project=>project.id==='project-0'));
 assert.ok(filterProjects(projectFixtures,{query:'illustration',category:'Art & design',status:'Exploring',availability:'Open'}).length>0);
 assert.equal(filterProjects(projectFixtures,{query:'no-such-project'}).length,0);
 assert.equal(filterProjects(projectFixtures,{category:'Wellbeing',status:'Exploring'}).length,0);
 assert.equal(filterProjects([{...projectFixtures[0],collaborationOpen:false}],{availability:'Open'}).length,0);
});
test('project forms reject missing fields, invalid categories, duplicate chips/roles, malformed milestones and inconsistent completion',()=>{
 assert.ok(validateProject(emptyProjectDraft).title); assert.ok(validateProject(emptyProjectDraft).roles); assert.ok(validateProject(emptyProjectDraft).milestones);
 const project=projectFixtures[3]; assert.ok(validateProject({...project,text:'x'.repeat(181)}).text); assert.ok(validateProject({...project,category:'Unknown'}).category); assert.ok(validateProject({...project,skills:['Design','design']}).skills);assert.ok(validateProject({...project,roles:[project.roles[0],project.roles[0]]}).roles);assert.ok(validateProject({...project,milestones:[{...project.milestones[0],date:'2026-02-30'}]}).milestones);assert.ok(validateProject({...project,status:'Completed'}).status);
 assert.deepEqual(validateProject({...project,status:'Completed',milestones:project.milestones.map(item=>({...item,status:'Completed'}))}),{}); assert.equal(normalizeProject({...project,title:'  Small Beginnings  '}).title,'Small Beginnings');
});
test('collaboration validates role, introduction, owner and open status; submit/cancel preserve immutability',()=>{
 const project=projectFixtures[1], request={id:'test',makerId:'self',roleId:project.roles[0].id,introduction:'I would love to bring a small illustrated field note.'};
 assert.deepEqual(validateCollaboration(project,request),{});assert.ok(validateCollaboration(project,{...request,roleId:'missing'}).role);assert.ok(validateCollaboration(project,{...request,introduction:'   '}).introduction);assert.ok(validateCollaboration(project,{...request,makerId:project.ownerId}).project);assert.ok(validateCollaboration({...project,status:'Paused'},request).project);
 const original=[];const submitted=submitProjectRequest(original,project,request);assert.equal(original.length,0);assert.equal(submitted.requests[0].status,'pending');assert.ok(submitProjectRequest(submitted.requests,project,{...request,id:'duplicate'}).errors.duplicate);
 const cancelled=transitionProjectRequest(submitted.requests,project,'test','cancelled','self');assert.equal(cancelled.requests[0].status,'cancelled');assert.equal(submitted.requests[0].status,'pending');assert.ok(transitionProjectRequest(cancelled.requests,project,'test','accepted',project.ownerId).error);
});
test('only the demo project owner accepts/declines pending introductions; no Connect or DM state is created',()=>{
 const project=projectFixtures[3], original=initialProjectRequests;
 assert.ok(transitionProjectRequest(original,project,original[0].id,'accepted','maker-1').error);
 assert.ok(transitionProjectRequest(original,{...project,roles:[]},original[0].id,'accepted','self').error);
 const accepted=transitionProjectRequest(original,project,original[0].id,'accepted','self');assert.equal(accepted.requests[0].status,'accepted');assert.equal(original[0].status,'pending');assert.deepEqual(Object.keys(accepted).sort(),['error','requests']);assert.ok(!('matches'in accepted));
 const declined=transitionProjectRequest(accepted.requests,project,original[1].id,'declined','self');assert.equal(declined.requests[1].status,'declined');assert.ok(transitionProjectRequest(declined.requests,project,original[0].id,'cancelled',original[0].makerId).error);
});
