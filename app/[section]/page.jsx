import { notFound } from 'next/navigation';
import Youverse from '../../components/Youverse';
const routes = ['welcome','login','explore','reels','create','connect','messages','notifications','profile','projects','circles','settings'];
export function generateStaticParams() { return routes.map(section => ({ section })); }
export default async function Page({ params }) { const { section } = await params; if (!routes.includes(section)) notFound(); return <Youverse route={section} />; }
