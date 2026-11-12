"use client";
import Link from "next/link";
import { useSocialContent } from "./useSocialContent";
import { ConnectPersonActions } from "./ConnectUI";
import { CircleCover, MembershipButton } from "./CircleUI";
import { useCircles } from "./useCircles";
import { ProjectCover, ProjectProgress, ProjectStar } from "./ProjectUI";
import { projectOwner, ownerHref } from "../data/projects";
import PersonCard from "./PersonCard";
import { useProjects } from "./useProjects";
import { Suspense, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, X, ArrowUpRight, Compass, Play } from "lucide-react";
import { Avatar, Badge, Button, Card, EmptyState, LoadingState } from "./ui";
import { Artwork, PostCard } from "./Social";
import { useSocial } from "./SocialProvider";
import { interests, makers } from "../data/social";
import {
  categories,
  searchDiscovery,
  suggestedSearches,
} from "../data/discovery";

export function ChoiceTabs({ items, value, onChange, label }) {
  return (
    <div className="choice-tabs" role="group" aria-label={label}>
      {items.map((item) => (
        <button
          type="button"
          key={item}
          aria-pressed={value === item}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
function CollectionDiscoveryCard({ item }) {
  const { ownProfile } = useSocial();
  const { memberCount, discussionCount } = useCircles();
  const project = item.project,
    circle = item.circle;
  const owner = project && projectOwner(project, ownProfile);
  return (
    <Card
      className={`discovery-card discovery-collection ${project ? "discovery-project" : "discovery-circle"}`}
    >
      <Link className="discovery-cover" href={item.href}>
        {project ? (
          <ProjectCover project={project} />
        ) : (
          <CircleCover circle={circle} />
        )}
      </Link>
      <div className="discovery-card-body">
        <span className="discovery-kind">
          {item.category} · {project ? project.category : circle.category}
        </span>
        <Link href={item.href}>
          <h3>{item.title}</h3>
        </Link>
        <p className="discovery-description">
          {project ? project.text : circle.description}
        </p>
        <div className="tag-row">
          {(project ? project.tags : circle.topics).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        {project ? (
          <>
            <Link href={ownerHref(project)} className="discovery-owner">
              <Avatar {...owner} />
              <span>{owner.name}</span>
            </Link>
            <small className="discovery-skills">
              Skills · {project.skills.join(", ")}
            </small>
            <ProjectProgress project={project} />
            <div className="discovery-tile-actions">
              <small>
                {project.collaborationOpen &&
                !["Paused", "Completed"].includes(project.status) &&
                project.roles.length
                  ? `${project.roles.length} collaboration ${project.roles.length === 1 ? "role" : "roles"} open`
                  : "Collaboration closed"}
              </small>
              <ProjectStar project={project} />
            </div>
          </>
        ) : (
          <>
            <small className="discovery-count">
              {memberCount(circle)} curious people · {discussionCount(circle)}{" "}
              demo discussions
            </small>
            <MembershipButton circle={circle} />
          </>
        )}
        <Link className="discovery-link" href={item.href}>
          {project ? "Explore this project" : "Find your place"}
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </Card>
  );
}
export function DiscoveryCard({ item, compact = false }) {
  const { ownProfile } = useSocial();
  if (item.post) return <PostCard post={item.post} />;
  if (item.person)
    return (
      <PersonCard
        person={item.person}
        compact={compact}
        className="discovery-card"
      >
        <ConnectPersonActions personId={item.person.id} compact />
      </PersonCard>
    );
  if (item.project || item.circle)
    return <CollectionDiscoveryCard item={item} />;
  if (!item.reel) return null;
  return (
    <Card className="discovery-card discovery-reel">
      <Link
        className="discovery-reel-cover"
        href={item.href}
        aria-label={`Discover Reel: ${item.title}`}
      >
        <Artwork variant={item.reel.art} title={item.title} />
        <span className="discovery-play" aria-hidden="true">
          <Play size={20} />
        </span>
      </Link>
      <div className="discovery-card-body">
        <span className="discovery-kind">Illustrated Reel</span>
        <Link href={item.href}>
          <h3>{item.title}</h3>
        </Link>
        <p className="discovery-description">{item.reel.caption}</p>
        <small>
          Illustrated demo ·{" "}
          {item.reel.local ? ownProfile.name : makers[item.reel.person].name}
        </small>
        <Link className="discovery-link" href={item.href}>
          Watch illustrated Reel
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </Card>
  );
}
function ExploreContent() {
  const searchInput = useRef(null);
  const params = useSearchParams();
  const router = useRouter();
  const urlQuery = params.get("q") || "";
  const [query, setQuery] = useState(urlQuery);
  const [lastUrl, setLastUrl] = useState(urlQuery);
  if (urlQuery !== lastUrl) {
    setLastUrl(urlQuery);
    setQuery(urlQuery);
  }
  const [category, setCategory] = useState("All");
  const [interest, setInterest] = useState("");
  const [suggestions, setSuggestions] = useState(false);
  const { recentSearches, setRecentSearches, rememberSearch } = useSocial();
  const { projects } = useProjects();
  const { discovery: baseItems } = useSocialContent();
  const allItems = searchDiscovery({ projects, items: baseItems });
  const results = searchDiscovery({
    query,
    category,
    interest,
    projects,
    items: allItems,
  });
  const isFiltering = !!query.trim() || !!interest || category !== "All";
  function search(value) {
    setQuery(value);
    rememberSearch(value);
    searchInput.current?.focus({ preventScroll: true });
    setSuggestions(false);
    router.replace(
      value.trim()
        ? `/explore?q=${encodeURIComponent(value.trim())}`
        : "/explore",
      { scroll: false },
    );
  }
  const suggestionsList = [
    ...new Set([...suggestedSearches, ...allItems.map((item) => item.title)]),
  ]
    .filter(
      (item) =>
        !query.trim() ||
        item.toLowerCase().includes(query.trim().toLowerCase()),
    )
    .slice(0, 5);
  return (
    <div className="explore-screen">
      <header className="discovery-hero">
        <div>
          <span className="eyebrow">FOLLOW YOUR CURIOSITY</span>
          <h1>
            Find your kind of world<span>.</span>
          </h1>
          <p>Fresh perspectives. Familiar curiosities. A little more you.</p>
        </div>
        <Compass size={32} aria-hidden="true" />
      </header>
      <div
        className="discovery-search"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setSuggestions(false);
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.currentTarget.querySelector("input").focus();
            setSuggestions(false);
          }
        }}
      >
        <form
          className="discovery-search-form"
          onSubmit={(event) => {
            event.preventDefault();
            search(query);
          }}
        >
          <button
            type="button"
            className="icon-button"
            aria-label="Toggle search suggestions"
            aria-expanded={suggestions}
            aria-controls="search-suggestions"
            onClick={() => setSuggestions(!suggestions)}
          >
            <Search size={21} />
          </button>
          <input
            ref={searchInput}
            maxLength={160}
            aria-label="Search people, posts, Reels, Circles and projects"
            placeholder="What are you curious about?"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSuggestions(true);
            }}
            onFocus={() => setSuggestions(true)}
          />
          {query && (
            <button
              type="button"
              className="icon-button"
              aria-label="Clear search"
              onClick={() => search("")}
            >
              <X size={18} />
            </button>
          )}
          <Button type="submit">Search</Button>
        </form>
        {suggestions && (
          <div className="search-suggestions" id="search-suggestions">
            <p className="eyebrow">
              {query ? "SUGGESTED SEARCHES" : "START WITH A LITTLE CURIOSITY"}
            </p>
            {suggestionsList.map((value) => (
              <button key={value} onClick={() => search(value)}>
                <Search size={15} />
                {value}
                <ArrowUpRight size={15} />
              </button>
            ))}
            {!suggestionsList.length && (
              <p>Press Search to explore this phrase.</p>
            )}
            <button
              className="close-suggestions"
              onClick={() => setSuggestions(false)}
            >
              Close suggestions
            </button>
          </div>
        )}
      </div>
      <section className="recent-searches" aria-label="Recent searches">
        <span>Recent</span>
        {recentSearches.length ? (
          recentSearches.map((value) => (
            <button key={value} onClick={() => search(value)}>
              {value}
            </button>
          ))
        ) : (
          <small>Your searches will appear here during this session.</small>
        )}
        {recentSearches.length > 0 && (
          <button onClick={() => setRecentSearches([])}>
            Clear recent searches
          </button>
        )}
      </section>
      <ChoiceTabs
        items={categories}
        value={category}
        onChange={setCategory}
        label="Discovery categories"
      />
      <section
        className="interest-filters"
        aria-label="Trending curiosity filters"
      >
        {interests.map((tag) => (
          <button
            key={tag}
            aria-pressed={interest === tag}
            onClick={() => setInterest(interest === tag ? "" : tag)}
          >
            {tag}
          </button>
        ))}
        {interest && (
          <button onClick={() => setInterest("")}>Clear filter ×</button>
        )}
      </section>
      {isFiltering ? (
        <section aria-label="Search results">
          <div className="section-heading">
            <h2>
              {query.trim()
                ? `Results for “${query.trim()}”`
                : category === "All"
                  ? interest
                  : category}
            </h2>
            <span role="status" aria-live="polite">
              {results.length}{" "}
              {results.length === 1 ? "possibility" : "possibilities"}
            </span>
          </div>
          {results.length ? (
            <div
              data-category={category}
              className={`discovery-grid ${category === "Posts" ? "post-results" : ""}`}
            >
              {results.map((item) => (
                <DiscoveryCard item={item} key={item.id} compact />
              ))}
            </div>
          ) : (
            <EmptyState title="A little more room to explore">
              Try a maker’s name, a different curiosity, or clear your filters.
              <br />
              <button
                className="yv-button soft mt-3"
                onClick={() => {
                  setCategory("All");
                  setInterest("");
                  search("");
                }}
              >
                Explore all possibilities
              </button>
            </EmptyState>
          )}
        </section>
      ) : (
        <>
          {[
            [
              "People",
              "Your kind of people",
              "New perspectives, familiar curiosities.",
            ],
            [
              "Circles",
              "A little room to belong",
              "Find a conversation you can grow into.",
            ],
            [
              "Projects",
              "Good things in the making",
              "Small ideas become more together.",
            ],
            [
              "Posts",
              "Reflections worth sitting with",
              "A few words that might meet you where you are.",
            ],
            [
              "Reels",
              "A different point of view",
              "Illustrated stories from the everyday.",
            ],
          ].map(([type, title, caption]) => (
            <section className="discovery-section" key={type}>
              <div className="section-heading">
                <div>
                  <h2>{title}</h2>
                  <p>{caption}</p>
                </div>
                <button onClick={() => setCategory(type)}>See all ↗</button>
              </div>
              <div
                data-category={type}
                className={`discovery-grid ${type === "Posts" ? "post-results" : ""}`}
              >
                {allItems
                  .filter((item) => item.category === type)
                  .slice(0, type === "Posts" ? 2 : 3)
                  .map((item) => (
                    <DiscoveryCard key={item.id} item={item} />
                  ))}
              </div>
            </section>
          ))}
          <Card className="suggested-search-card">
            <h2>Follow a small what-if.</h2>
            <p>Sometimes the best discoveries start with a simple question.</p>
            <div className="interest-filters">
              {suggestedSearches.map((value) => (
                <button key={value} onClick={() => search(value)}>
                  {value} ↗
                </button>
              ))}
            </div>
          </Card>
        </>
      )}
      <p className="muted discovery-disclaimer">
        Curated local demo results. Makers, Projects and Circles link to their
        canonical demo pages.
      </p>
    </div>
  );
}
export default function Explore() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ExploreContent />
    </Suspense>
  );
}
