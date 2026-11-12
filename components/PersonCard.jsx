"use client";
import Link from "next/link";
import { ArrowUpRight, Leaf } from "lucide-react";
import { Avatar, Badge, Card } from "./ui";
import { FollowButton } from "./Social";
import { useSocial } from "./SocialProvider";
import {
  profileHref,
  sharedInterests,
  sharedCuriosityText,
} from "../data/identity";
export default function PersonCard({
  person,
  children,
  className = "",
  linkLabel = "View Living Identity",
  compact = false,
}) {
  const { ownProfile } = useSocial();
  const href = profileHref(person);
  const name = (
    <Link className="person-card-name" href={href}>
      <h3>{person.name}</h3>
      <p>{person.craft}</p>
    </Link>
  );
  return (
    <Card
      className={`person-card ${compact ? "person-card-result" : ""} ${className}`}
      data-person-id={person.id}
    >
      {!compact && (
        <div
          className={`person-card-cover cover-${person.cover}`}
          aria-hidden="true"
        >
          <span>✳</span>
        </div>
      )}
      <div className="person-card-body">
        <div className="person-card-header">
          <Link href={href} aria-label={`${person.name}'s profile`}>
            <Avatar {...person} />
          </Link>
          {compact && name}
          <FollowButton person={person.personIndex} />
        </div>
        {!compact && name}
        <p className="person-card-bio">{person.bio}</p>
        <div className="person-common">
          <Leaf size={14} aria-hidden="true" />
          <small>{sharedCuriosityText(ownProfile, person)}</small>
        </div>
        <div className="tag-row">
          {sharedInterests(ownProfile, person).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div className="person-card-footer">
          <Link className="discovery-link" href={href}>
            {linkLabel}
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          {children}
        </div>
      </div>
    </Card>
  );
}
