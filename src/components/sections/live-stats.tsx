"use client";

import {
  Trophy,
  CheckCircle2,
  Zap,
  Flame,
  Award,
  GitBranch,
  Activity,
  FolderGit2,
  RefreshCw,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { GithubIcon } from "@/components/brand-icons";
import { StatCard } from "@/components/sections/stat-card";
import { useLeetCode, useGitHub, requestFreshStats } from "@/hooks/use-stats";
import { projects } from "@/lib/data";

export function LiveStats() {
  const lc = useLeetCode();
  const gh = useGitHub();

  const leet = lc.data;
  const git = gh.data;
  const usingFallback = leet?.fromFallback || git?.fromFallback;
  const refreshing = lc.isFetching || gh.isFetching;

  const handleRefresh = () => {
    requestFreshStats();
    lc.refetch();
    gh.refetch();
  };

  return (
    <Section id="stats">
      <SectionHeading
        eyebrow="Live Dashboard"
        title="Stats, Updated Automatically"
        subtitle="Real-time metrics pulled directly from my LeetCode and GitHub profiles — refreshed automatically, never hand-edited."
      />

      <div className="mb-6 flex justify-center">
        <button
          type="button"
          onClick={handleRefresh}
          disabled={refreshing}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-strong px-4 py-2 text-sm font-medium text-foreground transition hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-60"
          aria-label="Refresh stats"
        >
          <RefreshCw
            className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
          />
          {refreshing ? "Refreshing…" : "Refresh stats"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        <StatCard
          label="LeetCode Rating"
          value={leet?.rating ?? 0}
          icon={Trophy}
          loading={lc.isLoading}
          accent="text-amber-400"
        />
        <StatCard
          label="Problems Solved"
          value={leet?.totalSolved ?? 0}
          icon={CheckCircle2}
          loading={lc.isLoading}
          accent="text-emerald-400"
        />
        <StatCard
          label="Easy Solved"
          value={leet?.easySolved ?? 0}
          icon={Zap}
          loading={lc.isLoading}
          accent="text-green-400"
        />
        <StatCard
          label="Medium Solved"
          value={leet?.mediumSolved ?? 0}
          icon={Flame}
          loading={lc.isLoading}
          accent="text-yellow-400"
        />
        <StatCard
          label="Hard Solved"
          value={leet?.hardSolved ?? 0}
          icon={Award}
          loading={lc.isLoading}
          accent="text-rose-400"
        />
        <StatCard
          label="Contest Rating"
          value={leet?.contestRating ?? 0}
          icon={Activity}
          loading={lc.isLoading}
          accent="text-orange-400"
        />
        <StatCard
          label="GitHub Repos"
          value={git?.publicRepos ?? 0}
          icon={GithubIcon}
          loading={gh.isLoading}
          accent="text-sky-400"
        />
        <StatCard
          label="Contributions"
          value={git?.contributionsLastYear ?? 0}
          icon={GitBranch}
          loading={gh.isLoading}
          accent="text-violet-400"
        />
        <StatCard
          label="Total Projects"
          value={projects.length}
          icon={FolderGit2}
          accent="text-blue-400"
        />
      </div>

      {usingFallback && !lc.isLoading && !gh.isLoading && (
        <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground/70">
          <RefreshCw className="h-3 w-3" />
          Showing last known values — live APIs are momentarily unavailable.
        </p>
      )}
    </Section>
  );
}
