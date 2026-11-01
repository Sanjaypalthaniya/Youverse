import { notFound } from 'next/navigation';
import Youverse from '../../../../components/Youverse';
import { projectFixtures, getProjectBySlug } from '../../../../data/projects';
export function generateStaticParams() { return projectFixtures.map(project => ({ slug: project.slug })); }
export const metadata = { title: 'Edit project preview — YOUVERSE' };
export default async function Page({ params }) { const { slug } = await params; const project = getProjectBySlug(slug); if (!project) notFound(); return <Youverse route="project-edit" projectId={project.id}/>; }
