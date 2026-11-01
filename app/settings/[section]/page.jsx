import{notFound}from'next/navigation';
import Youverse from '../../../components/Youverse';
import{settingsSections}from'../../../data/account';
const slug=label=>label.toLowerCase().replaceAll(' & ','-').replaceAll(' ','-');
export function generateStaticParams(){return settingsSections.map(label=>({section:slug(label)}));}
export default async function Page({params}){const{section}=await params;if(!settingsSections.some(label=>slug(label)===section))notFound();return <Youverse route="settings" settingsSection={section}/>;}
