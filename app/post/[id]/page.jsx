import { notFound } from 'next/navigation';
import Youverse from '../../../components/Youverse';
import { reflections } from '../../../data/social';
export function generateStaticParams() { return reflections.map(post => ({ id: String(post.id) })); }
export async function generateMetadata({ params }) { const { id } = await params; const post = reflections.find(item => String(item.id) === id); return { title: post ? `${post.topic} — YOUVERSE` : 'Reflection not found — YOUVERSE' }; }
export default async function Page({ params }) { const { id } = await params; if (!reflections.some(post => String(post.id) === id)) notFound(); return <Youverse route="post" postId={id}/>; }
