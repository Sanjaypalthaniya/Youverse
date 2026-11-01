'use client';
import { createContext, useContext, useState } from 'react';
const SocialContext = createContext(null);
export function SocialProvider({ children }) {
 const [state, setState] = useState({ liked: [], saved: [], following: [0], hidden: [], viewed: [] });
 function toggle(key, id) { setState(previous => ({ ...previous, [key]: previous[key].includes(id) ? previous[key].filter(value => value !== id) : [...previous[key], id] })); }
 return <SocialContext.Provider value={{ state, toggle }}>{children}</SocialContext.Provider>;
}
export const useSocial = () => useContext(SocialContext);
