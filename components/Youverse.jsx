"use client";
import Connect from "./Connect";
import Messages from "./Messages";
import Premium from "./Premium";
import {
  Settings as AccountSettings,
  Help,
  Welcome,
  Onboarding,
} from "./Account";
import { Circles, CircleDetail } from "./Circles";
import CircleDiscussion from "./CircleDiscussion";
import CircleComposer from "./CircleComposer";
import { Projects, ProjectDetail } from "./Projects";
import ProjectEditor from "./ProjectEditor";
import Identity from "./Identity";
import IdentityEditor from "./IdentityEditor";
import Explore from "./Discovery";
import Composer from "./Composer";
import Notifications from "./Notifications";
import { Feed, Reels, PostDetail } from "./Social";
import AppShell from "./AppShell";
export default function Youverse({
  route,
  postId,
  makerId,
  projectId,
  circleId,
  discussionId,
  makerSlug,
  settingsSection,
}) {
  if (route === "welcome" || route === "login")
    return <Welcome login={route === "login"} />;
  function renderPageContent() {
    if (route === "projects") return <Projects />;
    if (route === "project-detail")
      return <ProjectDetail key={projectId} projectId={projectId} />;
    if (route === "project-create") return <ProjectEditor key="new-project" />;
    if (route === "project-edit")
      return <ProjectEditor key={projectId} projectId={projectId} />;
    if (route === "home") return <Feed />;
    if (route === "reels") return <Reels />;
    if (route === "post") return <PostDetail id={postId} />;
    if (route === "settings")
      return <AccountSettings section={settingsSection} />;
    if (route === "premium") return <Premium />;
    if (route === "help") return <Help />;
    if (route === "onboarding") return <Onboarding />;
    if (route === "create") return <Composer />;
    if (route === "profile") return <Identity />;
    if (route === "maker-profile")
      return <Identity key={makerId} makerId={makerId} />;
    if (route === "profile-edit") return <IdentityEditor />;
    if (route === "connect") return <Connect />;
    if (route === "circles") return <Circles />;
    if (route === "circle-detail")
      return <CircleDetail key={circleId} circleId={circleId} />;
    if (route === "circle-discussion")
      return (
        <CircleDiscussion
          key={discussionId}
          circleId={circleId}
          discussionId={discussionId}
        />
      );
    if (route === "circle-compose")
      return <CircleComposer key={circleId} circleId={circleId} />;
    if (route === "messages" || route === "conversation")
      return <Messages key={makerSlug || "inbox"} makerSlug={makerSlug} />;
    if (route === "notifications") return <Notifications />;
    return <Explore />;
  }

  return <AppShell route={route}>{renderPageContent()}</AppShell>;
}
