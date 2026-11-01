import {notFound} from 'next/navigation';
import Youverse from '../../../../../components/Youverse';
import {discussions,getCircle,getCircleBySlug,getDiscussion} from '../../../../../data/circles';
export function generateStaticParams(){return discussions.map(discussion=>({slug:getCircle(discussion.circleId).slug,discussionId:discussion.id}));}
export async function generateMetadata({params}){const{slug,discussionId}=await params;const circle=getCircleBySlug(slug);const discussion=circle&&getDiscussion(circle.id,discussionId);return{title:discussion?`${discussion.title} — YOUVERSE`:'Discussion not found — YOUVERSE'};}
export default async function Page({params}){const{slug,discussionId}=await params;const circle=getCircleBySlug(slug);if(!circle||!getDiscussion(circle.id,discussionId))notFound();return <Youverse route="circle-discussion" circleId={circle.id} discussionId={discussionId}/>;}
