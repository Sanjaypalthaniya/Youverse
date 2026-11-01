'use client';
import { useSocial } from './SocialProvider';
import { circleMemberCount, transitionMembership } from '../data/circles';
import {selectDiscussions,createSessionDiscussion,changeSessionDiscussion,changeOwnReply} from '../data/communitySession';
export function useCircles() {
 const { circleMemberships, setCircleMemberships, circleReplies, setCircleReplies, circleReactions, setCircleReactions, circleDrafts, setCircleDrafts,localDiscussions,setLocalDiscussions } = useSocial();
 const records=selectDiscussions(localDiscussions);
 function publish(value,circleId){const result=createSessionDiscussion(localDiscussions,value,circleId,circleMemberships,'local-discussion-'+crypto.randomUUID().replaceAll('-',''));if(!Object.keys(result.errors).length){setLocalDiscussions(result.local);draft(circleId,null);}return result;}
 function change(id,value,action){const result=changeSessionDiscussion(localDiscussions,id,value,circleMemberships,action);if(!result.error)setLocalDiscussions(result.local);return result.error;}
 function changeReply(discussionId,replyId,text,action){const result=changeOwnReply(circleReplies,records,discussionId,replyId,text,circleMemberships,action);if(!result.error)setCircleReplies(result.replies);return result.error;}
 function membership(circleId, action) { const result = transitionMembership(circleMemberships, circleId, action); if (!result.error) setCircleMemberships(result.memberships); return result.error; }
 function draft(circleId, value) { setCircleDrafts(previous => { const next = { ...previous }; if (value === null) delete next[circleId]; else next[circleId] = value; return next; }); }
 return { records,publish,change,changeReply,memberships: circleMemberships, membership, replies: circleReplies, setReplies: setCircleReplies, reactions: circleReactions, setReactions: setCircleReactions, drafts: circleDrafts, draft, memberCount: circle => circleMemberCount(circle,circleMemberships), discussionCount: circle => records.filter(item=>item.circleId===circle.id).length };
}
