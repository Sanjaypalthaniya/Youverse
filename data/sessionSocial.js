import {reflections,stories,reels,comments,makers} from './social.js';
import {formats,validateDraft,discoveryItems} from './discovery.js';
import {getProject,projectFixtures} from './projects.js';
import {getCircle} from './circles.js';

export const initialSocialContent={records:[],comments:{},activity:[],sequence:0};
export const isLocalId=id=>/^local-[1-9]\d*(?:-[a-f0-9]{32})?$/.test(String(id));
export const postHref=post=>`/post/${post.id}`;
export const contentAuthor=(record,ownProfile)=>record.authorId==='self'?ownProfile:makers[record.person];
export const authorHref=person=>person.id==='self'?'/profile':`/profile/${person.slug}`;
export function validatePublication(draft,{memberships=[],projects=projectFixtures,projectRequests=[]}={}){
 const errors=validateDraft(draft);if(!formats.includes(draft.format))errors.format='Choose a supported format.';
 if(!['Public','Followers','Selected Circle','Only me'].includes(draft.visibility))errors.visibility='Choose an audience preview.';
 if(draft.tags.length>5||new Set(draft.tags).size!==draft.tags.length||draft.tags.some(tag=>!tag.trim()||tag.length>60))errors.tags='Choose 1–5 unique tags, each up to 60 characters.';
 const circle=draft.circle&&(getCircle(draft.circle)||[getCircle('creative'),getCircle('mindful'),getCircle('builders')].find(item=>item.name===draft.circle));
 if(draft.circle&&(!circle||!memberships.includes(circle.id)))errors.circle='Choose a valid Circle you have joined in this session.';
 if(draft.format==='Project Update'){
  const project=projects.find(item=>item.id===draft.projectId);if(!project)errors.project='Choose an existing project for this update.';
  else if(project.ownerId!=='self'&&!project.team.some(member=>member.makerId==='self')&&!projectRequests.some(request=>request.projectId===project.id&&request.makerId==='self'&&request.status==='accepted'))errors.project='Share updates only for your owned or collaborating demo projects.';
 }
 return errors;
}
export function publishContent(state,draft,context={},createdAt=new Date().toISOString()){
 const errors=validatePublication(draft,context);if(Object.keys(errors).length)return{state,errors};const sequence=state.sequence+1,sessionKey=state.sessionKey||context.sessionKey||'00000000000000000000000000000000',id=`local-${sequence}-${sessionKey}`;const kind={'Reflection / Thought':'Text reflection','Image Post':'Image post','Story':'Story','Reel':'Reel','Question':'Question','Project Update':'Project update','Milestone':'Milestone'}[draft.format];
 const circle=draft.circle&&(getCircle(draft.circle)||[getCircle('creative'),getCircle('mindful'),getCircle('builders')].find(item=>item.name===draft.circle));
 const record={id,local:true,authorId:'self',person:-1,type:kind==='Story'?'story':kind==='Reel'?'reel':'post',kind:circle&&kind==='Text reflection'?'Circle post':kind,text:draft.text.trim(),body:draft.text.trim(),title:draft.text.trim().slice(0,70),caption:draft.text.trim(),tags:[...draft.tags],tag:draft.tags[0],visibility:draft.visibility,createdAt,time:'Just now · local demo',media:draft.media?{type:'illustration',simulated:true}:null,image:!!draft.media,art:sequence%3,slides:[draft.text.trim()],likes:0,comments:0,topic:kind,curiosity:draft.tags[0],audio:'Local illustrated demo · no audio',projectId:draft.format==='Project Update'?draft.projectId:undefined,circleId:circle?.id,circle:circle?.name};
 const activity={id:`activity-${id}`,person:-1,type:'milestone',category:circle||record.projectId?'Communities':'All',title:`You published a local ${record.type}.`,text:'Visible in this tab only. No other person was notified.',time:'Just now · local demo',group:'Today',unread:true,href:postHref(record),contentId:id};
 return{state:{...state,sequence,sessionKey,records:[record,...state.records],activity:[activity,...state.activity]},record,errors:{}};
}
export const sessionPosts=state=>[...state.records.filter(record=>record.type==='post'),...reflections];
export const sessionStories=state=>[...state.records.filter(record=>record.type==='story'),...stories];
export const sessionReels=state=>[...state.records.filter(record=>record.type==='reel'),...reels];
export const findContent=(state,id)=>[...state.records,...reflections,...reels].find(record=>String(record.id)===String(id));
export function feedPosts(content,social,tab='For You'){return sessionPosts(content).filter(post=>tab==='Saved'?social.saved.includes(post.id):tab==='Following'?social.following.includes(post.person):true);}
export function contentComments(state,id){const record=findContent(state,id);return[...(record&&!record.local?comments.map(comment=>({...comment,id:`${id}-${comment.id}`})):[]),...(state.comments[id]||[])];}
export function addContentComment(state,id,text){if(!findContent(state,id))return{state,error:'This content is no longer available.'};if(!text.trim()||text.length>1000)return{state,error:'Write a comment of 1–1,000 characters.'};const sequence=state.sequence+1;return{state:{...state,sequence,comments:{...state.comments,[id]:[...(state.comments[id]||[]),{id:`local-comment-${sequence}`,authorId:'self',person:-1,text:text.trim(),time:'Just now · local demo'}]}},error:''};}
export function toggleSocialValue(state,key,id){if(!['liked','saved','following','hidden','viewed'].includes(key))return state;if(key==='following'&&!makers[id])return state;return{...state,[key]:state[key].includes(id)?state[key].filter(item=>item!==id):[...state[key],id]};}
export function editLocalContent(state,id,text){const record=state.records.find(item=>item.id===id);if(!record||record.authorId!=='self')return{state,error:'Only your own local content can be edited.'};if(!text.trim()||text.length>1500)return{state,error:'Use 1–1,500 characters.'};return{state:{...state,records:state.records.map(item=>item.id===id?{...item,text:text.trim(),body:text.trim(),caption:text.trim(),title:text.trim().slice(0,70),slides:[text.trim()],edited:true}:item)},error:''};}
export function deleteLocalContent(state,id){if(!state.records.some(record=>record.id===id&&record.authorId==='self'))return{state,error:'Only your own local content can be deleted.'};const nextComments={...state.comments};delete nextComments[id];return{state:{...state,records:state.records.filter(record=>record.id!==id),comments:nextComments,activity:state.activity.filter(item=>item.contentId!==id)},error:''};}
export function socialDiscoveryItems(state,ownProfile){return[...state.records.filter(record=>record.type!=='story').map(record=>({id:`session-${record.id}`,category:record.type==='reel'?'Reels':'Posts',title:record.title,text:`${record.text} ${ownProfile?.name||''}`,interests:record.tags,href:postHref(record),...(record.type==='reel'?{reel:record}:{post:record})})),...discoveryItems];}
export function storyStep(items,index,slide,direction){const next=slide+direction;if(next>=0&&next<items[index].slides.length)return{index,slide:next};const nextIndex=index+direction;if(nextIndex<0||nextIndex>=items.length)return null;return{index:nextIndex,slide:direction<0?items[nextIndex].slides.length-1:0};}
