import {notFound} from 'next/navigation';
import Youverse from '../../../components/Youverse';
import {circleFixtures,getCircleBySlug} from '../../../data/circles';
export function generateStaticParams(){return circleFixtures.map(circle=>({slug:circle.slug}));}
export async function generateMetadata({params}){const{slug}=await params;const circle=getCircleBySlug(slug);return{title:circle?`${circle.name} — YOUVERSE Circles`:'Circle not found — YOUVERSE',description:circle?.description};}
export default async function Page({params}){const{slug}=await params;const circle=getCircleBySlug(slug);if(!circle)notFound();return <Youverse route="circle-detail" circleId={circle.id}/>;}
