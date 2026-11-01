import {notFound} from 'next/navigation';
import Youverse from '../../../../../components/Youverse';
import {circleFixtures,getCircleBySlug} from '../../../../../data/circles';
export function generateStaticParams(){return circleFixtures.map(circle=>({slug:circle.slug}));}
export const metadata={title:'Start a Circle conversation — YOUVERSE'};
export default async function Page({params}){const{slug}=await params;const circle=getCircleBySlug(slug);if(!circle)notFound();return <Youverse route="circle-compose" circleId={circle.id}/>;}
