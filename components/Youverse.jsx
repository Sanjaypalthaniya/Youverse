'use client';
import Link from 'next/link';
import Connect from './Connect';
import Messages from './Messages';
import Premium from './Premium';
import {Settings as AccountSettings,Help,Welcome,Onboarding} from './Account';
import { Circles, CircleDetail } from './Circles';
import CircleDiscussion from './CircleDiscussion';
import CircleComposer from './CircleComposer';
import { Projects, ProjectDetail } from './Projects';
import ProjectEditor from './ProjectEditor';
import Identity from './Identity';
import IdentityEditor from './IdentityEditor';
import { useSocial } from './SocialProvider';
import { makers } from '../data/social';
import { profileHref, sharedCuriosityText } from '../data/identity';
import { useRouter } from 'next/navigation';
import Explore from './Discovery';
import Composer from './Composer';
import Notifications from './Notifications';
import { Feed, Reels, PostDetail, DiscoveryRail } from './Social';
import { useEffect, useState } from 'react';
import { Home, Compass, Clapperboard, Plus, Sparkles, MessageCircle, Bell, User, Layers, Users, Settings, Search, Moon, Sun, ArrowUpRight, ArrowRight, MoreHorizontal, Check, Menu } from 'lucide-react';
import { Avatar, Badge, Button, Card, EmptyState, Modal } from './ui';
const navigation = [['home','Home',Home],['explore','Explore',Compass],['reels','Reels',Clapperboard],['connect','Connect',Sparkles],['messages','Messages',MessageCircle],['notifications','Notifications',Bell],['profile','Living Identity',User],['projects','Projects',Layers],['circles','Circles',Users],['premium','Premium',Sparkles]];
const href = route => route === 'home' ? '/' : `/${route}`;
export default function Youverse({ route, postId, makerId, projectId, circleId, discussionId, makerSlug, settingsSection }) {
 const { ownProfile,appearance,resolvedTheme,changeAppearance } = useSocial();
 const dark = resolvedTheme === 'dark';
 const router = useRouter();
 const [modal,setModal] = useState(''); const [query,setQuery] = useState(''); const [menu,setMenu] = useState(false);

 useEffect(() => { if(!modal) return; function close(e) { if(e.key === 'Escape') setModal(''); } document.addEventListener('keydown',close); return () => document.removeEventListener('keydown',close); },[modal]);
 function toggleTheme(){changeAppearance(dark?'light':'dark');}
 if(route === 'welcome' || route === 'login') return <Welcome login={route === 'login'}/>;
 function renderPageContent() {
 if(route === 'projects') return <Projects/>;
 if(route === 'project-detail') return <ProjectDetail key={projectId} projectId={projectId}/>;
 if(route === 'project-create') return <ProjectEditor key="new-project"/>;
 if(route === 'project-edit') return <ProjectEditor key={projectId} projectId={projectId}/>;
 if(route === 'home') return <Feed/>;
 if(route === 'reels') return <Reels/>;
 if(route === 'post') return <PostDetail id={postId}/>;
 if(route === 'settings') return <AccountSettings section={settingsSection}/>;
 if(route === 'premium') return <Premium/>;
 if(route === 'help') return <Help/>;
 if(route === 'onboarding') return <Onboarding/>;
 if(route === 'create') return <Composer/>;
 if(route === 'profile') return <Identity/>;
 if(route === 'maker-profile') return <Identity key={makerId} makerId={makerId}/>;
 if(route === 'profile-edit') return <IdentityEditor/>;
 if(route === 'connect') return <Connect/>;
 if(route === 'circles') return <Circles/>;
 if(route === 'circle-detail') return <CircleDetail key={circleId} circleId={circleId}/>;
 if(route === 'circle-discussion') return <CircleDiscussion key={discussionId} circleId={circleId} discussionId={discussionId}/>;
 if(route === 'circle-compose') return <CircleComposer key={circleId} circleId={circleId}/>;
 if(route === 'messages' || route === 'conversation') return <Messages key={makerSlug || 'inbox'} makerSlug={makerSlug}/>;
 if(route === 'notifications') return <Notifications/>;
 return <Explore/>;
 }
 return <div className="app-shell"><a className="skip-link" href="#main">Skip to content</a><aside className={`sidebar ${menu ? 'is-open':''}`}><Link className="brand" href="/">youverse<span>✳</span></Link><p className="brand-caption">A LITTLE MORE YOU.</p><nav aria-label="Main navigation">{navigation.map(([key,label,Icon]) => <Link key={key} href={href(key)} className={(route === key || key === 'profile' && ['profile-edit','maker-profile'].includes(route) || key === 'projects' && route.startsWith('project-') || key === 'circles' && route.startsWith('circle-') || key === 'messages' && route === 'conversation') ? 'active':''} aria-current={(route === key || key === 'profile' && ['profile-edit','maker-profile'].includes(route) || key === 'projects' && route.startsWith('project-') || key === 'circles' && route.startsWith('circle-') || key === 'messages' && route === 'conversation') ? 'page':undefined}><Icon size={21}/>{label}{key === 'connect' && <span className="new-label">NEW</span>}</Link>)}</nav><Link className="yv-button primary create-button" href="/create"><Plus size={20}/>Create a post</Link><div className="sidebar-bottom"><div className="little-note"><span>✳</span><p>You’re not a finished story.<br/><b>Keep becoming.</b></p></div><Link href="/settings" className={route === 'settings' ? 'active':''}><Settings size={19}/>Settings</Link><button onClick={toggleTheme}>{dark ? <Sun size={19}/>:<Moon size={19}/>} {dark ? 'Light':'Dark'} appearance</button><Link href="/profile" className="signed-user"><Avatar {...ownProfile}/><span><b>{ownProfile.name}</b><small>@{ownProfile.handle}</small></span><MoreHorizontal size={18}/></Link></div></aside><div className="main-shell"><header className="topbar"><button className="icon-button mobile-menu" aria-label="Toggle navigation" aria-expanded={menu} onClick={() => setMenu(!menu)}><Menu/></button><span className="topbar-greeting">Your world. Your pace.</span><form className="search-box" action="/explore" onSubmit={event => { event.preventDefault(); router.push(`/explore?q=${encodeURIComponent(query.trim())}`); }}><Search size={18}/><input name="q" maxLength={160} aria-label="Search YOUVERSE" placeholder="Find people, ideas, possibilities…" value={query} onChange={e => setQuery(e.target.value)}/><kbd>↵</kbd></form><Link className="icon-button notification-dot" href="/notifications" aria-label="Notifications"><Bell size={20}/></Link><Link className="icon-button" href="/messages" aria-label="Messages"><MessageCircle size={20}/></Link><Link href="/profile"><Avatar {...ownProfile}/></Link></header><div className="content-grid"><main id="main">{renderPageContent()}</main><aside className="right-rail"><DiscoveryRail/><Card className="daily-card"><span className="eyebrow">A MOMENT FOR YOU</span><span className="daily-flower">✳</span><h2>Less scrolling.<br/>More becoming.</h2><p>What’s one small thing you’d like to make room for today?</p><Link href="/create">Leave a little reflection <ArrowUpRight size={16}/></Link></Card><Card className="project-teaser"><Badge>GOOD THINGS IN THE MAKING</Badge><h3>Ideas grow better<br/>together.</h3><Link href="/projects">Explore projects <ArrowRight size={16}/></Link></Card><footer><Link href="/welcome">About</Link><Link href="/settings/privacy">Privacy</Link><Link href="/settings/safety">Guidelines</Link><Link href="/help">Help</Link><p>© 2026 YOUVERSE · Made for becoming.</p><Badge>W08 - Local demo</Badge></footer></aside></div></div><nav className="bottom-nav" aria-label="Mobile navigation">{[['home',Home],['explore',Compass],['create',Plus],['connect',Sparkles],['profile',User]].map(([r,Icon]) => <Link key={r} href={href(r)} className={(route === r || r === 'profile' && ['profile-edit','maker-profile'].includes(route)) ? 'active':''} aria-label={r} aria-current={(route === r || r === 'profile' && ['profile-edit','maker-profile'].includes(route)) ? 'page':undefined}><Icon size={22}/><span>{r}</span></Link>)}</nav>{modal && <Modal title={modal} onClose={() => setModal('')}><p>This is the W01 foundation preview. The full experience is tracked in the product roadmap.</p><Button onClick={() => setModal('')}><Check size={17}/>Got it</Button></Modal>}</div>;
}
function PageTitle({ title,text }) { return <div className="page-heading"><span className="eyebrow">A LITTLE MORE YOU</span><h1>{title}</h1><p>{text}</p></div>; }

