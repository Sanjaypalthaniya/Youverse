import{notFound}from'next/navigation';
import Youverse from '../../../components/Youverse';
import{makerProfiles,getMaker}from'../../../data/identity';
export function generateStaticParams(){return makerProfiles.map(maker=>({makerSlug:maker.slug}));}
export async function generateMetadata({params}){const{makerSlug}=await params;const maker=getMaker(makerSlug);return{title:maker?`Conversation with ${maker.name} — YOUVERSE`:'Conversation unavailable — YOUVERSE'};}
export default async function Page({params}){const{makerSlug}=await params;const maker=getMaker(makerSlug);if(!maker||maker.slug!==makerSlug)notFound();return <Youverse route="conversation" makerSlug={makerSlug}/>;}
