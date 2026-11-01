import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { circleFixtures, discussions, getCircle, getCircleBySlug, getDiscussion, circleHref, discussionHref, initialCircleMemberships, transitionMembership, circleMemberCount, visibleCircleMembers, filterCircles, emptyDiscussionDraft, validateDiscussion, validateReply, appendCircleReply, toggleCircleReaction } from '../data/circles.js';
import { circles, reflections } from '../data/social.js';
import { discoveryCircles, discoveryItems, notifications } from '../data/discovery.js';
import { getMaker, makerProfiles, initialOwnProfile } from '../data/identity.js';
test('Circle data, IDs/slugs, members and moderator references are consistent across surfaces',()=>{
 assert.equal(circles,circleFixtures);assert.equal(discoveryCircles,circleFixtures);assert.equal(new Set(circles.map(circle=>circle.id)).size,circles.length);
 for(const circle of circles){assert.equal(getCircle(circle.id),circle);assert.equal(getCircleBySlug(circle.slug),circle);assert.equal(getCircleBySlug(circle.id),undefined);assert.ok(getMaker(circle.creatorId));assert.ok(circle.memberIds.every(id=>id==='self'||getMaker(id)));assert.ok(circle.moderatorIds.every(id=>circle.memberIds.includes(id)));assert.ok(circle.relatedIds.every(id=>getCircle(id)&&id!==circle.id));assert.ok(circle.guidelines.length>0);}
 for(const person of [...makerProfiles,initialOwnProfile])for(const id of person.circleIds)assert.ok(getCircle(id).memberIds.includes(person.id));
 assert.equal(getCircle('missing'),undefined);assert.equal(getCircleBySlug('create'),undefined);
});
test('discussions and replies resolve only within their Circle with stable unique IDs and authors',()=>{
 assert.equal(new Set(discussions.map(item=>item.id)).size,discussions.length);
 for(const item of discussions){assert.ok(getCircle(item.circleId));assert.equal(getDiscussion(item.circleId,item.id),item);assert.ok(getMaker(item.authorId));assert.ok(getCircle(item.circleId).memberIds.includes(item.authorId));assert.ok(item.tags.every(tag=>getCircle(item.circleId).topics.includes(tag)));assert.ok(item.replies.every(reply=>getMaker(reply.authorId)));assert.ok(discussionHref(item).startsWith(circleHref(getCircle(item.circleId))));}
 assert.equal(getDiscussion('mindful','creative-noticing'),undefined);assert.equal(getDiscussion('creative','missing'),undefined);
});
test('membership transitions are immutable, idempotent and keep counts and named members aligned',()=>{
 const circle=getCircle('builders');const joined=transitionMembership(initialCircleMemberships,'builders','join');assert.equal(initialCircleMemberships.includes('builders'),false);assert.equal(circleMemberCount(circle,joined.memberships),55);assert.ok(visibleCircleMembers(circle,joined.memberships).includes('self'));
 assert.deepEqual(transitionMembership(joined.memberships,'builders','join').memberships,joined.memberships);const left=transitionMembership(joined.memberships,'builders','leave');assert.equal(circleMemberCount(circle,left.memberships),54);assert.ok(!visibleCircleMembers(circle,left.memberships).includes('self'));assert.ok(transitionMembership(initialCircleMemberships,'unknown','join').error);assert.ok(transitionMembership(initialCircleMemberships,'creative','accept').error);
});
test('Circle search combines text, category, curiosity and My Circles membership',()=>{
 assert.ok(filterCircles({query:'unfinished sketches',category:'Creativity',interest:'Design'}).some(circle=>circle.id==='creative'));assert.equal(filterCircles({query:'not-a-real-circle'}).length,0);assert.equal(filterCircles({mine:true,memberships:[]}).length,0);assert.equal(filterCircles({mine:true,memberships:['mindful']})[0].id,'mindful');
});
test('discussion validation requires membership, title/body limits and genuine Circle topics',()=>{
 assert.ok(validateDiscussion(emptyDiscussionDraft,'creative',initialCircleMemberships).title);assert.ok(validateDiscussion(emptyDiscussionDraft,'creative',initialCircleMemberships).body);
 const draft={title:'One little question',body:'What helps you keep making?',tags:['Creativity'],image:false};assert.deepEqual(validateDiscussion(draft,'creative',initialCircleMemberships),{});assert.ok(validateDiscussion(draft,'builders',initialCircleMemberships).membership);assert.ok(validateDiscussion({...draft,title:'x'.repeat(121)},'creative',initialCircleMemberships).title);assert.ok(validateDiscussion({...draft,body:'x'.repeat(3001)},'creative',initialCircleMemberships).body);assert.ok(validateDiscussion({...draft,tags:['Technology']},'creative',initialCircleMemberships).tags);assert.ok(validateDiscussion({...draft,tags:['Creativity','Creativity']},'creative',initialCircleMemberships).tags);
});
test('reply/reaction helpers validate membership and references and never create Connect or DM state',()=>{
 assert.ok(validateReply('   ','creative',initialCircleMemberships));assert.ok(validateReply('x'.repeat(1001),'creative',initialCircleMemberships));assert.ok(validateReply('Hello','builders',initialCircleMemberships));const original={};const result=appendCircleReply(original,'creative-stuck',{id:'local-test',authorId:'self',text:'  A little courage.  '},initialCircleMemberships);assert.equal(result.error,'');assert.equal(result.replies['creative-stuck'][0].text,'A little courage.');assert.deepEqual(original,{});assert.ok(appendCircleReply(result.replies,'creative-stuck',{id:'local-test',authorId:'self',text:'Duplicate'},initialCircleMemberships).error);assert.ok(appendCircleReply({},'missing',{id:'bad',authorId:'self',text:'Hello'},initialCircleMemberships).error);
 const reaction=toggleCircleReaction([],'creative-stuck',initialCircleMemberships);assert.deepEqual(reaction.reactions,['creative-stuck']);assert.deepEqual(toggleCircleReaction(reaction.reactions,'creative-stuck',initialCircleMemberships).reactions,[]);assert.ok(toggleCircleReaction([],'builders-first-step',initialCircleMemberships).error);assert.deepEqual(Object.keys(result).sort(),['error','replies']);assert.deepEqual(Object.keys(transitionMembership([],'builders','join')).sort(),['error','memberships']);
});
test('canonical Circle links connect discovery, Feed, notifications, profiles and project interests',()=>{
 for(const item of discoveryItems.filter(item=>item.circle))assert.equal(item.href,circleHref(item.circle));
 for(const item of reflections.filter(item=>item.circleId))assert.ok(getCircle(item.circleId));
 const circleNotice=notifications.find(item=>item.id==='notice-circle');assert.equal(circleNotice.href,discussionHref(getDiscussion('mindful','mindful-walk')));
 for(const file of ['../components/Social.jsx','../components/Identity.jsx'])assert.ok(readFileSync(new URL(file,import.meta.url),'utf8').includes('circleHref(circle)'));
 assert.ok(readFileSync(new URL('../components/Projects.jsx',import.meta.url),'utf8').includes('ProjectCircleRecommendations'));
});
