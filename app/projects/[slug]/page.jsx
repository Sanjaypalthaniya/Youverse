import { notFound } from 'next/navigation';
import Youverse from '../../../components/Youverse';
import { projectFixtures, getProjectBySlug } from '../../../data/projects';
export function generateStaticParams() { return projectFixtures.map(project => ({ slug: project.slug })); }
export async function generateMetadata({ params }) { const { slug } = await params; const project = getProjectBySlug(slug); return { title: project ? `${project.title} — YOUVERSE Projects` : 'Project not found — YOUVERSE', description: project?.text }; }
export default async function Page({ params }) { const { slug } = await params; const project = getProjectBySlug(slug); if (!project) notFound(); return <Youverse route="project-detail" projectId={project.id}/>; }
