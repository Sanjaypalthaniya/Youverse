'use client';
import {useSocial} from './SocialProvider';
import {selectProjects,createSessionProject,saveSessionProject,deleteSessionProject} from '../data/communitySession';
export function useProjects(){const{projectOverrides,deletedProjects,setDeletedProjects,projectDrafts,setProjectDrafts,setProjectOverrides,projectRequests,setProjectRequests,starredProjects,setStarredProjects}=useSocial();const projects=selectProjects(projectOverrides,deletedProjects);
function star(id){if(!projects.some(project=>project.id===id))return;setStarredProjects(previous=>previous.includes(id)?previous.filter(value=>value!==id):[...previous,id]);}
function draft(key,value){setProjectDrafts(previous=>{const next={...previous};if(value===null)delete next[key];else next[key]=value;return next;});}
function save(project){const result=saveSessionProject(projectOverrides,deletedProjects,project);if(!result.error){setProjectOverrides(result.overrides);draft(project.id,null);}return result.error;}
function create(value){const result=createSessionProject(projectOverrides,value,'local-project-'+crypto.randomUUID().replaceAll('-',''));if(!Object.keys(result.errors).length){setProjectOverrides(result.overrides);draft('new',null);}return result;}
function remove(id){const result=deleteSessionProject(projectOverrides,deletedProjects,id);if(!result.error){setDeletedProjects(result.deleted);draft(id,null);}return result.error;}
return{projects,projectDrafts,draft,save,create,remove,star,starredProjects,projectRequests,setProjectRequests};}
