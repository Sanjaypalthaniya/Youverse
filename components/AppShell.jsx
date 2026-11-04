"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  Home,
  Compass,
  Clapperboard,
  Plus,
  Sparkles,
  MessageCircle,
  Bell,
  User,
  Layers,
  Users,
  Settings,
  Search,
  Moon,
  Sun,
  ArrowUpRight,
  ArrowRight,
  MoreHorizontal,
  Menu,
  X,
} from "lucide-react";
import { Avatar, Badge, Card } from "./ui";
import { DiscoveryRail } from "./Social";
import { useSocial } from "./SocialProvider";

const navigation = [
  ["home", "Home", Home],
  ["explore", "Explore", Compass],
  ["reels", "Reels", Clapperboard],
  ["connect", "Connect", Sparkles],
  ["messages", "Messages", MessageCircle],
  ["notifications", "Notifications", Bell],
  ["profile", "Living Identity", User],
  ["projects", "Projects", Layers],
  ["circles", "Circles", Users],
  ["premium", "Premium", Sparkles],
];
const mobileNavigation = [
  ["home", "Home", Home],
  ["explore", "Explore", Compass],
  ["create", "Create", Plus],
  ["connect", "Connect", Sparkles],
  ["profile", "Profile", User],
];
const href = (key) => (key === "home" ? "/" : `/${key}`);
function activeSection(route) {
  if (route === "post") return "home";
  if (["profile-edit", "maker-profile"].includes(route)) return "profile";
  if (route.startsWith("project-")) return "projects";
  if (route.startsWith("circle-")) return "circles";
  if (route === "conversation") return "messages";
  return route;
}

export default function AppShell({ route, children }) {
  const { ownProfile, resolvedTheme, changeAppearance } = useSocial();
  const router = useRouter();
  const active = activeSection(route);
  const dark = resolvedTheme === "dark";
  const [compact, setCompact] = useState(false);
  const [menu, setMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const sidebar = useRef(null);
  const drawerScroll = useRef(null);
  const menuTrigger = useRef(null);
  const drawerClose = useRef(null);
  const searchTrigger = useRef(null);
  const searchInput = useRef(null);
  const drawerOpen = compact && menu;
  useEffect(() => {
    const media = window.matchMedia("(max-width:700px)");
    function resize() {
      setCompact(media.matches);
      if (!media.matches) setMenu(false);
    }
    resize();
    media.addEventListener("change", resize);
    function pop() {
      setMenu(false);
      setSearchOpen(false);
    }
    window.addEventListener("popstate", pop);
    return () => {
      media.removeEventListener("change", resize);
      window.removeEventListener("popstate", pop);
    };
  }, []);
  useEffect(() => {
    if (!drawerOpen) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const trigger = menuTrigger.current;
    const position = drawerScroll.current;
    drawerClose.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = overflow;
      if (
        trigger?.isConnected &&
        window.matchMedia("(max-width:700px)").matches
      )
        trigger.focus({ preventScroll: true });
      if (position && window.location.href === position.url)
        window.scrollTo({ top: position.top, behavior: "instant" });
    };
  }, [drawerOpen]);
  useEffect(() => {
    if (searchOpen && compact) searchInput.current?.focus();
  }, [searchOpen, compact]);
  function closeSearch() {
    setSearchOpen(false);
    searchTrigger.current?.focus({ preventScroll: true });
  }
  function drawerKey(event) {
    if (!drawerOpen) return;
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      setMenu(false);
      return;
    }
    if (event.key !== "Tab") return;
    const controls = [
      ...sidebar.current.querySelectorAll("a[href],button:not(:disabled)"),
    ].filter(
      (el) =>
        el.getClientRects().length &&
        getComputedStyle(el).visibility !== "hidden",
    );
    const first = controls[0],
      last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }
  function navigate(event) {
    if (
      event.target.closest("a[href]") &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey
    )
      setMenu(false);
  }
  return (
    <div className="app-shell" data-page={route}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {drawerOpen && (
        <button
          className="nav-scrim"
          tabIndex={-1}
          aria-label="Close navigation backdrop"
          onClick={() => setMenu(false)}
        />
      )}
      <aside
        id="app-navigation"
        ref={sidebar}
        inert={(compact && !drawerOpen) || undefined}
        aria-hidden={(compact && !drawerOpen) || undefined}
        className={`sidebar ${drawerOpen ? "is-open" : ""}`}
        role={drawerOpen ? "dialog" : undefined}
        aria-modal={drawerOpen ? true : undefined}
        aria-label={drawerOpen ? "Navigation" : "Primary navigation"}
        onKeyDown={drawerKey}
        onClick={navigate}
      >
        <div className="drawer-heading">
          <Link className="brand" href="/" aria-label="YOUVERSE home">
            <span className="brand-word">youverse</span>
            <span className="brand-mark" aria-hidden="true">
              ✳
            </span>
          </Link>
          <button
            ref={drawerClose}
            className="icon-button drawer-close"
            aria-label="Close navigation"
            aria-controls="app-navigation"
            aria-expanded={drawerOpen}
            onClick={() => setMenu(false)}
          >
            <X size={22} />
          </button>
        </div>
        <p className="brand-caption">A LITTLE MORE YOU.</p>
        <nav aria-label="Main navigation">
          {navigation.map(([key, label, Icon]) => (
            <Fragment key={key}>
              {key === "home" && (
                <span className="nav-section-label">Your world</span>
              )}
              {key === "projects" && (
                <span className="nav-section-label">Make &amp; belong</span>
              )}
              <Link
                href={href(key)}
                aria-label={label}
                title={label}
                className={active === key ? "active" : ""}
                aria-current={active === key ? "page" : undefined}
              >
                <Icon size={21} aria-hidden="true" />
                <span className="nav-label">{label}</span>
              </Link>
            </Fragment>
          ))}
        </nav>
        <Link
          className="yv-button primary create-button"
          href="/create"
          aria-label="Create a post"
          title="Create a post"
        >
          <Plus size={20} aria-hidden="true" />
          <span className="nav-label">Create a post</span>
        </Link>
        <div className="sidebar-bottom">
          <div className="little-note">
            <span aria-hidden="true">✳</span>
            <p>
              You’re not a finished story.
              <br />
              <b>Keep becoming.</b>
            </p>
          </div>
          <Link
            href="/settings"
            aria-current={active === "settings" ? "page" : undefined}
            aria-label="Settings"
            title="Settings"
            className={active === "settings" ? "active" : ""}
          >
            <Settings size={20} aria-hidden="true" />
            <span className="nav-label">Settings</span>
          </Link>
          <button
            onClick={() => changeAppearance(dark ? "light" : "dark")}
            aria-label={`${dark ? "Light" : "Dark"} appearance`}
            title={`${dark ? "Light" : "Dark"} appearance`}
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
            <span className="nav-label">
              {dark ? "Light" : "Dark"} appearance
            </span>
          </button>
          <Link
            href="/profile"
            className="signed-user"
            aria-label={`Your profile: ${ownProfile.name}`}
            title={ownProfile.name}
          >
            <Avatar {...ownProfile} />
            <span className="nav-label">
              <b>{ownProfile.name}</b>
              <small>@{ownProfile.handle}</small>
            </span>
            <MoreHorizontal
              className="account-more"
              size={18}
              aria-hidden="true"
            />
          </Link>
        </div>
      </aside>
      <div
        className="main-shell"
        inert={drawerOpen || undefined}
        aria-hidden={drawerOpen || undefined}
      >
        <header className="topbar">
          <button
            ref={menuTrigger}
            className="icon-button mobile-menu"
            aria-label="Toggle navigation"
            aria-controls="app-navigation"
            aria-expanded={drawerOpen}
            onClick={() => {
              drawerScroll.current = {
                top: window.scrollY,
                url: window.location.href,
              };
              setSearchOpen(false);
              setMenu(true);
            }}
          >
            <Menu size={22} />
          </button>
          <Link className="mobile-brand" href="/" aria-label="YOUVERSE home">
            youverse<span aria-hidden="true">✳</span>
          </Link>
          <span className="topbar-greeting">Your world. Your pace.</span>
          <form
            id="global-search"
            className={`search-box ${searchOpen ? "is-open" : ""}`}
            action="/explore"
            onSubmit={(event) => {
              event.preventDefault();
              setSearchOpen(false);
              router.push(`/explore?q=${encodeURIComponent(query.trim())}`);
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape" && compact) {
                event.preventDefault();
                closeSearch();
              }
            }}
          >
            <Search size={18} aria-hidden="true" />
            <input
              ref={searchInput}
              name="q"
              maxLength={160}
              aria-label="Search YOUVERSE"
              placeholder="Search your world…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <kbd aria-hidden="true">↵</kbd>
          </form>
          <button
            ref={searchTrigger}
            className="icon-button mobile-search"
            aria-label="Toggle search"
            aria-controls="global-search"
            aria-expanded={searchOpen}
            onClick={() => (searchOpen ? closeSearch() : setSearchOpen(true))}
          >
            {searchOpen ? <X size={21} /> : <Search size={21} />}
          </button>
          <Link
            className="icon-button notification-dot"
            href="/notifications"
            aria-label="Notifications"
            aria-current={active === "notifications" ? "page" : undefined}
          >
            <Bell size={21} />
          </Link>
          <Link
            className="icon-button header-messages"
            href="/messages"
            aria-label="Messages"
            aria-current={active === "messages" ? "page" : undefined}
          >
            <MessageCircle size={21} />
          </Link>
          <Link
            className="header-profile"
            href="/profile"
            aria-label="Your profile"
          >
            <Avatar {...ownProfile} />
          </Link>
        </header>
        <div className="content-grid">
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <aside className="right-rail" aria-label="Discover your world">
            <DiscoveryRail />
            <Card className="daily-card">
              <span className="eyebrow">A MOMENT FOR YOU</span>
              <span className="daily-flower" aria-hidden="true">
                ✳
              </span>
              <h2>
                Less scrolling.
                <br />
                More becoming.
              </h2>
              <p>What’s one small thing you’d like to make room for today?</p>
              <Link href="/create">
                Leave a little reflection <ArrowUpRight size={16} />
              </Link>
            </Card>
            <Card className="project-teaser">
              <Badge>GOOD THINGS IN THE MAKING</Badge>
              <h3>
                Ideas grow better
                <br />
                together.
              </h3>
              <Link href="/projects">
                Explore projects <ArrowRight size={16} />
              </Link>
            </Card>
            <footer>
              <Link href="/welcome">About</Link>
              <Link href="/settings/privacy">Privacy</Link>
              <Link href="/settings/safety">Guidelines</Link>
              <Link href="/help">Help</Link>
              <p>© 2026 YOUVERSE · Made for becoming.</p>
              <Badge>Session demo</Badge>
            </footer>
          </aside>
        </div>
      </div>
      <nav
        className="bottom-nav"
        aria-label="Mobile navigation"
        inert={drawerOpen || undefined}
        aria-hidden={drawerOpen || undefined}
      >
        {mobileNavigation.map(([key, label, Icon]) => (
          <Link
            key={key}
            href={href(key)}
            className={active === key ? "active" : ""}
            aria-label={key}
            aria-current={active === key ? "page" : undefined}
          >
            <span className="bottom-nav-icon">
              <Icon size={22} aria-hidden="true" />
            </span>
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
