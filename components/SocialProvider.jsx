'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { emptyDraft } from '../data/discovery';
import { initialOwnProfile } from '../data/identity';
import { initialProjectRequests } from '../data/projects';
import { initialCircleMemberships } from '../data/circles';
import { initialConnectState } from '../data/connect';
import { initialAccountPreferences } from '../data/account';
import {initialSocialContent,toggleSocialValue} from '../data/sessionSocial';
const SocialContext = createContext(null);
export function SocialProvider({ children }) {
 const [state, setState] = useState({ liked: [], saved: [], following: [0], hidden: [], viewed: [] });
 const [ownProfile, setOwnProfile] = useState(initialOwnProfile);
 const [profileEditDraft, setProfileEditDraft] = useState(null);
 const [projectOverrides, setProjectOverrides] = useState({});
 const [deletedProjects,setDeletedProjects]=useState([]);
 const [localDiscussions,setLocalDiscussions]=useState([]);
 const [projectDrafts, setProjectDrafts] = useState({});
 const [projectRequests, setProjectRequests] = useState(initialProjectRequests);
 const [starredProjects, setStarredProjects] = useState([]);
 const [circleMemberships, setCircleMemberships] = useState(initialCircleMemberships);
 const [circleReplies, setCircleReplies] = useState({});
 const [circleReactions, setCircleReactions] = useState([]);
 const [circleDrafts, setCircleDrafts] = useState({});
 const [connectState, setConnectState] = useState(initialConnectState);
 const [accountPreferences,setAccountPreferences]=useState(initialAccountPreferences);
 const [messages,setMessages]=useState({});
 const [readConversations,setReadConversations]=useState([]);
 const [socialContent,setSocialContent]=useState(initialSocialContent);
 const [appearance,setAppearance]=useState('light');
 const [resolvedTheme,setResolvedTheme]=useState('light');
 function applyAppearance(mode){const resolved=mode==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):mode;document.documentElement.dataset.theme=resolved;setResolvedTheme(resolved);}
 function changeAppearance(mode){if(!['light','dark','system'].includes(mode))return;setAppearance(mode);localStorage.setItem('youverse-theme',mode);applyAppearance(mode);}
 useEffect(()=>{const frame=requestAnimationFrame(()=>{const stored=localStorage.getItem('youverse-theme');const mode=['light','dark','system'].includes(stored)?stored:'light';setAppearance(mode);applyAppearance(mode);});const media=window.matchMedia('(prefers-color-scheme: dark)');function changed(){if(localStorage.getItem('youverse-theme')==='system')applyAppearance('system');}media.addEventListener('change',changed);return()=>{cancelAnimationFrame(frame);media.removeEventListener('change',changed);};},[]);
 const [draft, setDraft] = useState(emptyDraft);
 const [readNotifications, setReadNotifications] = useState([]);
 const [recentSearches, setRecentSearches] = useState([]);
 function rememberSearch(query) { const value = query.trim(); if (value) setRecentSearches(previous => [value, ...previous.filter(item => item.toLowerCase() !== value.toLowerCase())].slice(0, 5)); }
 function toggle(key, id) { setState(previous => toggleSocialValue(previous,key,id)); }
 return <SocialContext.Provider value={{ deletedProjects, setDeletedProjects, localDiscussions, setLocalDiscussions, state, toggle, draft, setDraft, readNotifications, setReadNotifications, recentSearches, setRecentSearches, rememberSearch, ownProfile, setOwnProfile, profileEditDraft, setProfileEditDraft, projectOverrides, setProjectOverrides, projectDrafts, setProjectDrafts, projectRequests, setProjectRequests, starredProjects, setStarredProjects, circleMemberships, setCircleMemberships, circleReplies, setCircleReplies, circleReactions, setCircleReactions, circleDrafts, setCircleDrafts, connectState, setConnectState,socialContent,setSocialContent,accountPreferences,setAccountPreferences,messages,setMessages,readConversations,setReadConversations,appearance,resolvedTheme,changeAppearance }}>{children}</SocialContext.Provider>;
}
export const useSocial = () => useContext(SocialContext);
