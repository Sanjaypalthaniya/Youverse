'use client';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
export function Button({ children, variant = 'primary', className = '', ...props }) { return <button className={`yv-button ${variant} ${className}`} {...props}>{children}</button>; }
export function Card({ children, className = '', ...props }) { return <section className={`yv-card ${className}`} {...props}>{children}</section>; }
export function Avatar({ name, size = '', color = 'violet', avatarStyle = 'initials' }) { return <span className={`avatar ${size} ${color} avatar-${avatarStyle}`} aria-label={name}>{name.split(' ').map(n => n[0]).slice(0,2).join('')}</span>; }
export function Badge({ children }) { return <span className="yv-badge">{children}</span>; }
export function Input({ label, ...props }) { return <label className="field">{label}<input {...props} /></label>; }
export function Tabs({ items, value, onChange }) { return <div className="tabs" role="tablist">{items.map(item => <button key={item} role="tab" aria-selected={value === item} onClick={() => onChange(item)}>{item}</button>)}</div>; }
export function EmptyState({ title, children }) { return <Card className="empty"><h3>{title}</h3><p>{children}</p></Card>; }
export function LoadingState() { return <div className="loading" role="status">Finding your possibilities…</div>; }
export function Modal({ title, children, onClose }) {
 const dialog = useRef(null);
 useEffect(() => { const previous = document.activeElement; const overflow = document.body.style.overflow; document.body.style.overflow = 'hidden'; dialog.current.querySelector('button')?.focus(); return () => { document.body.style.overflow = overflow; previous?.focus(); }; }, []);
 function trapFocus(event) { if(event.key === 'Escape') { event.stopPropagation(); onClose(); return; } if(event.key !== 'Tab') return; const controls = dialog.current.querySelectorAll('button,a[href],input,textarea,[tabindex="0"]'); const first = controls[0]; const last = controls[controls.length-1]; if(event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if(!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } }
 return <div className="modal-backdrop-yv" onClick={onClose}><section ref={dialog} className="yv-card dialog" role="dialog" aria-modal="true" aria-label={title} onKeyDown={trapFocus} onClick={e => e.stopPropagation()}><button className="icon-button close-dialog" aria-label="Close dialog" onClick={onClose}><X /></button><h2>{title}</h2>{children}</section></div>;
}
