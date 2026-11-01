'use client';
import { useSocial } from './SocialProvider';
import { discussions, circleMemberCount, transitionMembership } from '../data/circles';
export function useCircles() {
 const { circleMemberships, setCircleMemberships, circleReplies, setCircleReplies, circleReactions, setCircleReactions, circleDrafts, setCircleDrafts } = useSocial();
 function membership(circleId, action) { const result = transitionMembership(circleMemberships, circleId, action); if (!result.error) setCircleMemberships(result.memberships); return result.error; }
 function draft(circleId, value) { setCircleDrafts(previous => { const next = { ...previous }; if (value === null) delete next[circleId]; else next[circleId] = value; return next; }); }
 return { memberships: circleMemberships, membership, replies: circleReplies, setReplies: setCircleReplies, reactions: circleReactions, setReactions: setCircleReactions, drafts: circleDrafts, draft, memberCount: circle => circleMemberCount(circle,circleMemberships), discussionCount: circle => discussions.filter(item=>item.circleId===circle.id).length };
}
