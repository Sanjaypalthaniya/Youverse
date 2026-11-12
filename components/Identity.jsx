"use client";
import Link from "next/link";
import { ProPlanBadge } from "./ConnectCapabilities";
import { FeaturedIdentity } from "./CommunityManagement";
import { useSocialContent } from "./useSocialContent";
import {
  ConnectPersonActions,
  MessageConsentButton,
  ConnectSafety,
} from "./ConnectUI";
import { useCircles } from "./useCircles";
import { circleHref } from "../data/circles";
import { ProjectCard } from "./ProjectUI";
import { useProjects } from "./useProjects";
import { useState } from "react";
import {
  MapPin,
  Share2,
  Settings,
  Sparkles,
  ArrowUpRight,
  Leaf,
  Shield,
  Pencil,
} from "lucide-react";
import { Avatar, Badge, Button, Card, EmptyState, Modal } from "./ui";
import { FollowButton, PostCard } from "./Social";
import PersonCard from "./PersonCard";
import { useSocial } from "./SocialProvider";
import { makers, circles } from "../data/social";
import {
  getMaker,
  profileHref,
  profileCompletion,
  sharedCuriosityText,
} from "../data/identity";

export function IdentityHero({ person, children, preview = false, stats }) {
  return (
    <section className="identity-hero">
      <div
        className={`identity-cover cover-${person.cover}`}
        role="img"
        aria-label={`${person.name}'s illustrated profile cover`}
      >
        <span className="cover-orbit" />
        <span className="cover-flower" aria-hidden="true">
          ✳
        </span>
        <span className="cover-note">A LITTLE MORE YOU. ALWAYS BECOMING.</span>
      </div>
      <div className="identity-intro">
        <div className="identity-topline">
          <Avatar {...person} size="large" />
          <div className="identity-kicker">
            <Badge>
              {preview
                ? "UNSAVED PREVIEW"
                : person.id === "self"
                  ? "YOUR LIVING IDENTITY"
                  : "MAKER & EVERYDAY EXPLORER"}
            </Badge>
            {children}
          </div>
        </div>
        <h1>{person.name}</h1>
        <p className="identity-handle">@{person.handle}</p>
        <div className="identity-meta">
          <p className="identity-craft">{person.craft}</p>
          {person.location && (
            <p className="identity-location">
              <MapPin size={13} aria-hidden="true" />
              {person.location}
            </p>
          )}
        </div>
        {person.statement && <blockquote>{person.statement}</blockquote>}
        <p className="identity-bio">{person.bio}</p>
        {stats}
      </div>
    </section>
  );
}
function IdentityStats({ items }) {
  return (
    <div
      className="identity-stats"
      role="group"
      aria-label="Identity at a glance"
    >
      {items.map((item) => {
        const Tag = item.onClick ? "button" : "div";
        return (
          <Tag
            key={item.label}
            onClick={item.onClick}
            className="identity-stat"
          >
            <b>{item.value}</b>
            <span>{item.label}</span>
          </Tag>
        );
      })}
    </div>
  );
}
export function MakerIdentityCard({ person }) {
  return (
    <PersonCard
      person={person}
      className="maker-identity-card"
      linkLabel={`Meet ${person.name.split(" ")[0]}`}
    />
  );
}
export function IdentityTimeline({ milestones }) {
  if (!milestones.length)
    return (
      <EmptyState title="Every journey starts somewhere">
        Small beginnings belong here, too.
      </EmptyState>
    );
  return (
    <ol className="identity-timeline">
      {[...milestones]
        .sort((first, second) => second.date.localeCompare(first.date))
        .map((item) => (
          <li key={item.id}>
            <time dateTime={item.date}>
              {new Date(`${item.date}T12:00:00Z`).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                timeZone: "UTC",
              })}
            </time>
            <h3>{item.title}</h3>
            <Badge>{item.category || "Personal growth"}</Badge>
            <p>{item.description}</p>
          </li>
        ))}
    </ol>
  );
}
export function IdentityProjects({ person }) {
  const { projects, projectRequests } = useProjects();
  const selected = projects.filter(
    (project) =>
      person.projectIds.includes(project.id) ||
      project.ownerId === person.id ||
      projectRequests.some(
        (request) =>
          request.projectId === project.id &&
          request.makerId === person.id &&
          request.status === "accepted",
      ),
  );
  return selected.length ? (
    <div className="project-grid">
      {selected.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  ) : (
    <EmptyState title="Room for a new idea">
      Projects and collaborations will take shape here.
    </EmptyState>
  );
}
function IdentitySection({ title, eyebrow, children, className = "" }) {
  return (
    <Card className={`identity-section-card ${className}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {children}
    </Card>
  );
}
function IdentityOverview({ person }) {
  return (
    <>
      <div className="identity-two-column">
        <IdentitySection title="Skills & capabilities" eyebrow="WHAT I BRING">
          <div className="tag-row">
            {person.skills.length ? (
              person.skills.map((skill) => <Badge key={skill}>{skill}</Badge>)
            ) : (
              <p className="muted">Still exploring what I can bring.</p>
            )}
          </div>
        </IdentitySection>
        <IdentitySection
          title="Interests & curiosities"
          eyebrow="WHAT MOVES ME"
        >
          <div className="tag-row">
            {person.interests.map((interest) => (
              <Link
                key={interest}
                href={`/explore?q=${encodeURIComponent(interest)}`}
              >
                <Badge>{interest}</Badge>
              </Link>
            ))}
          </div>
        </IdentitySection>
      </div>
      <IdentitySection
        className="identity-intentions"
        title="Becoming, with intention"
      >
        <Sparkles size={20} aria-hidden="true" />
        {person.intentions.length ? (
          <ul>
            {person.intentions.map((intention) => (
              <li key={intention}>{intention}</li>
            ))}
          </ul>
        ) : (
          <p>A little space to discover what comes next.</p>
        )}
      </IdentitySection>
      <IdentitySection
        title="Identity highlights"
        eyebrow="LITTLE THINGS THAT SAY A LOT"
      >
        {person.highlights.length ? (
          <ul className="identity-highlights">
            {person.highlights.map((highlight) => (
              <li key={highlight}>
                <span aria-hidden="true">✳</span>
                {highlight}
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">There is room for your next small highlight.</p>
        )}
      </IdentitySection>
      <section className="identity-section">
        <div className="section-heading">
          <h2>Growing, one step at a time</h2>
          <span>Personal milestones</span>
        </div>
        <Card>
          <IdentityTimeline milestones={person.milestones} />
        </Card>
      </section>
      <section className="identity-section">
        <div className="section-heading">
          <h2>Ideas in the making</h2>
          <Link href="/projects">Explore projects ↗</Link>
        </div>
        <IdentityProjects person={person} />
      </section>
    </>
  );
}
export default function Identity({ makerId }) {
  const { posts: sessionReflections } = useSocialContent();
  const { memberships: joinedCircles, memberCount } = useCircles();
  const { ownProfile, state } = useSocial();
  const person = makerId ? getMaker(makerId) : ownProfile;
  const own = !makerId;
  const [tab, setTab] = useState("Overview");
  const [modal, setModal] = useState("");
  const [notice, setNotice] = useState("");
  const tabs = ["Overview", "Reflections", "Projects", "Milestones"];
  const posts = own
    ? sessionReflections.filter((post) => post.authorId === "self")
    : sessionReflections.filter((post) => post.person === person.personIndex);
  const completion = profileCompletion(person);
  const stats = own
    ? [
        { label: "reflections", value: posts.length },
        {
          label: "following",
          value: state.following.length,
          onClick: () => setModal("Following"),
        },
        {
          label: "followers",
          value: ownProfile.followerIds.length,
          onClick: () => setModal("Followers"),
        },
      ]
    : [
        { label: "reflections", value: posts.length },
        { label: "skills", value: person.skills.length },
        { label: "curiosities", value: person.interests.length },
      ];
  const memberships = circles.filter((circle) =>
    own
      ? joinedCircles.includes(circle.id)
      : circle.memberIds.includes(person.id),
  );
  async function share() {
    const url = `${window.location.origin}${own ? "/profile" : profileHref(person)}`;
    try {
      await navigator.clipboard.writeText(url);
      setNotice(
        own
          ? "Demo profile link copied. Session edits are visible in this tab only."
          : "Maker profile link copied.",
      );
    } catch {
      setNotice(
        `Share this profile: ${url}${own ? " (session edits are local to this tab)" : ""}`,
      );
    }
  }
  function tabKey(event, index) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft")
      next = (index + tabs.length - 1) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    setTab(tabs[next]);
    event.currentTarget.parentElement.children[next].focus();
  }
  return (
    <div className="profile-screen">
      <IdentityHero person={person} stats={<IdentityStats items={stats} />}>
        {own ? (
          <Link className="yv-button soft" href="/profile/edit">
            <Pencil size={15} />
            Edit profile
          </Link>
        ) : (
          <FollowButton person={person.personIndex} />
        )}
      </IdentityHero>
      {own && <ProPlanBadge />}
      <div className="identity-action-row">
        {own ? (
          <Link href="/settings">
            <Settings size={16} />
            Account settings
          </Link>
        ) : (
          <>
            <ConnectPersonActions personId={person.id} />
            <MessageConsentButton personId={person.id} />
            <ConnectSafety personId={person.id} />
            <details className="identity-safety">
              <summary>
                <Shield size={16} />
                Safety options
              </summary>
              <div>
                <button onClick={() => setModal("Report this profile")}>
                  Report profile
                </button>
                <button onClick={() => setModal("Block preview")}>
                  Block preview
                </button>
              </div>
            </details>
          </>
        )}
        <button
          className="identity-share"
          aria-label="Share profile"
          onClick={share}
        >
          <Share2 size={16} />
          <span className="profile-share-label">Share profile</span>
        </button>
      </div>
      <p className="inline-notice" role="status">
        {notice}
      </p>
      {own ? (
        <Card className="identity-completion">
          <div>
            <h2>Your identity is taking shape.</h2>
            <p>
              {completion.complete} of {completion.total} identity sections
              filled in.
            </p>
            <small>Session-only profile. Changes reset on refresh.</small>
          </div>
          <div className="completion-meter">
            <span>{completion.percent}%</span>
            <progress
              value={completion.complete}
              max={completion.total}
              aria-label="Profile completion"
            />
          </div>
        </Card>
      ) : (
        <Card className="shared-curiosity profile-shared">
          <Leaf size={24} />
          <div>
            <h2>A little common ground</h2>
            <p>{sharedCuriosityText(ownProfile, person)}</p>
            <small>
              Based on the interests you have both stated. An invitation to
              curiosity.
            </small>
          </div>
        </Card>
      )}
      <div
        className="identity-tabs"
        role="tablist"
        aria-label="Identity sections"
      >
        {tabs.map((name, index) => (
          <button
            key={name}
            id={`identity-tab-${name}`}
            role="tab"
            type="button"
            aria-selected={tab === name}
            aria-controls={`identity-panel-${name}`}
            tabIndex={tab === name ? 0 : -1}
            onClick={() => setTab(name)}
            onKeyDown={(event) => tabKey(event, index)}
          >
            {name}
          </button>
        ))}
      </div>
      {tabs.map((name) => (
        <div
          key={name}
          id={`identity-panel-${name}`}
          className="identity-panel"
          role="tabpanel"
          aria-labelledby={`identity-tab-${name}`}
          tabIndex={0}
          hidden={tab !== name}
        >
          {tab === name &&
            (name === "Overview" ? (
              <>
                {own && <FeaturedIdentity profile={person} />}
                <IdentityOverview person={person} />
              </>
            ) : name === "Reflections" ? (
              posts.length ? (
                posts.map((post) => <PostCard key={post.id} post={post} />)
              ) : (
                <EmptyState title="Nothing published, just yet">
                  Your next thought has a home here.{" "}
                  <Link href="/create">Start a reflection ↗</Link>
                </EmptyState>
              )
            ) : name === "Projects" ? (
              <IdentityProjects person={person} />
            ) : (
              <Card>
                <IdentityTimeline milestones={person.milestones} />
              </Card>
            ))}
        </div>
      ))}
      <Card className="identity-memberships">
        <h2>Circles I call home</h2>
        {!memberships.length && (
          <p className="muted">
            No Circles joined in this session.{" "}
            <Link href="/circles">Find a little common ground.</Link>
          </p>
        )}
        {memberships.map((circle) => (
          <Link
            className="circle-mini"
            href={circleHref(circle)}
            key={circle.id}
          >
            <span className="circle-symbol">✳</span>
            <div>
              <b>{circle.name}</b>
              <small>
                {memberCount(circle)} curious people · Demo membership
              </small>
            </div>
            <ArrowUpRight size={16} />
          </Link>
        ))}
      </Card>
      <section className="identity-section">
        <div className="section-heading">
          <h2>
            {own
              ? "A little more common ground"
              : "More makers to get curious about"}
          </h2>
          <Link href="/explore">Explore ↗</Link>
        </div>
        <div className="identity-related">
          {makers
            .filter((maker) => maker.id !== person.id)
            .map((maker) => (
              <MakerIdentityCard key={maker.id} person={maker} />
            ))}
        </div>
      </section>
      {modal && (
        <Modal title={modal} onClose={() => setModal("")}>
          {modal === "Following" || modal === "Followers" ? (
            <>
              {makers
                .filter((maker) =>
                  modal === "Following"
                    ? state.following.includes(maker.personIndex)
                    : ownProfile.followerIds.includes(maker.id),
                )
                .map((maker) => (
                  <MakerIdentityCard key={maker.id} person={maker} />
                ))}
              {modal === "Following" && !state.following.length && (
                <p>No makers followed yet. Explore a little common ground.</p>
              )}
            </>
          ) : (
            <>
              <p>
                {modal === "Block preview"
                  ? "Blocking is a preview here. No relationship or discovery setting has been changed."
                  : "This is a local report preview. No report is sent or stored. Production moderation belongs to a later phase."}
              </p>
              <Button onClick={() => setModal("")}>Close preview</Button>
            </>
          )}
        </Modal>
      )}
    </div>
  );
}
