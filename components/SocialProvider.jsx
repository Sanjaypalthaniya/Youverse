'use client';
import { createContext, useContext, useState } from 'react';
import { emptyDraft } from '../data/discovery';
import { initialOwnProfile } from '../data/identity';
import { initialProjectRequests } from '../data/projects';
const SocialContext = createContext(null);
export function SocialProvider({ children }) {
 const [state, setState] = useState({ liked: [], saved: [], following: [0], hidden: [], viewed: [] });
 const [ownProfile, setOwnProfile] = useState(initialOwnProfile);
 const [profileEditDraft, setProfileEditDraft] = useState(null);
 const [projectOverrides, setProjectOverrides] = useState({});
 const [projectDrafts, setProjectDrafts] = useState({});
 const [projectRequests, setProjectRequests] = useState(initialProjectRequests);
 const [starredProjects, setStarredProjects] = useState([]);
 const [draft, setDraft] = useState(emptyDraft);
 const [readNotifications, setReadNotifications] = useState([]);
 const [recentSearches, setRecentSearches] = useState([]);
 function rememberSearch(query) { const value = query.trim(); if (value) setRecentSearches(previous => [value, ...previous.filter(item => item.toLowerCase() !== value.toLowerCase())].slice(0, 5)); }
 function toggle(key, id) { setState(previous => ({ ...previous, [key]: previous[key].includes(id) ? previous[key].filter(value => value !== id) : [...previous[key], id] })); }
 return <SocialContext.Provider value={{ state, toggle, draft, setDraft, readNotifications, setReadNotifications, recentSearches, setRecentSearches, rememberSearch, ownProfile, setOwnProfile, profileEditDraft, setProfileEditDraft, projectOverrides, setProjectOverrides, projectDrafts, setProjectDrafts, projectRequests, setProjectRequests, starredProjects, setStarredProjects }}>{children}</SocialContext.Provider>;
}
export const useSocial = () => useContext(SocialContext);
