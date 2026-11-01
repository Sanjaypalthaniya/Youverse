'use client';
import Link from 'next/link';
import { ConnectPersonActions } from './ConnectUI';
import { CircleReference } from './CircleUI';
import { circleHref } from '../data/circles';
import { useCircles } from './useCircles';
import { ProjectReference } from './ProjectUI';
import { profileHref, sharedCuriosityText } from '../data/identity';
import { useState } from 'react';
import { Heart, Bookmark, MessageCircle, Send, MoreHorizontal, Leaf, Plus, ArrowLeft, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Avatar, Badge, Button, Card, EmptyState, Modal, Tabs } from './ui';
import { makers, reflections, stories, reels, comments, interests, circles } from '../data/social';
import { useSocial } from './SocialProvider';
export function Artwork({ variant = 0, title = 'The art of noticing' }) { return <div className={`social-art scene-${variant}`} role="img" aria-label={`Original illustration: ${title}`}><span className="art-orbit"/><Leaf className="art-leaf" size={120}/><div className="art-paper"><small>FIELD NOTES / YOUVERSE</small><strong>{title}</strong><span>Small moments. A little more you.</span></div><span className="art-edition">A STUDY IN EVERYDAY WONDER</span></div>; }
export function FollowButton({ person }) { const { state, toggle } = useSocial(); return <button className="follow-button" aria-pressed={state.following.includes(person)} onClick={() => toggle('following', person)}>{state.following.includes(person) ? 'Following' : 'Follow'}</button>; }
export function DiscoveryRail() { const { memberCount } = useCircles(); const { ownProfile } = useSocial(); return <><section className="rail-section"><h3>Makers to know</h3>{makers.map((person, index) => <div className="suggestion" key={person.id}><Avatar {...person}/><div><Link href={profileHref(person)}><b>{person.name}</b></Link><small>{sharedCuriosityText(ownProfile, person)}</small><ConnectPersonActions personId={person.id} compact/></div><FollowButton person={index}/></div>)}</section><section className="rail-section"><h3>Trending curiosities</h3>{interests.map((interest, index) => <Link key={interest} href={`/explore?q=${encodeURIComponent(interest)}`} className="curiosity"><span>0{index + 1}</span><div><b>{interest}</b><small>A little more to discover ↗</small></div></Link>)}</section><section className="rail-section"><h3>Room to belong</h3>{circles.map(circle => <Link className="circle-mini" href={circleHref(circle)} key={circle.id}><span className="circle-symbol">✳</span><div><b>{circle.name}</b><small>{memberCount(circle)} curious people</small></div></Link>)}</section></>; }

export {PostCard,StoryTray,Feed,Comments,PostDetail,Reels} from './SocialContent';
