import { notFound } from 'next/navigation';
import Youverse from '../../../components/Youverse';
import { getMaker, makerProfiles } from '../../../data/identity';
export function generateStaticParams() { return makerProfiles.map(maker => ({ slug: maker.slug })); }
export async function generateMetadata({ params }) { const { slug } = await params; const maker = getMaker(slug); return { title: maker ? `${maker.name} — Living Identity — YOUVERSE` : 'Maker not found — YOUVERSE', description: maker?.bio }; }
export default async function Page({ params }) { const { slug } = await params; const maker = getMaker(slug); if (!maker || maker.slug !== slug) notFound(); return <Youverse route="maker-profile" makerId={maker.id}/>; }
