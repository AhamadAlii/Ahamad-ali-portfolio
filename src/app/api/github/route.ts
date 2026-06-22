import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";
import { fallbackGitHub } from "@/lib/data";
import type { GitHubStats, GitHubContribution } from "@/lib/types";

export const revalidate = 300;

let lastGood: GitHubStats | null = null;

function authHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-stats-bot",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function fetchContributions(
  username: string,
  fresh: boolean,
): Promise<{ contributions: GitHubContribution[]; total: number }> {
  // The contributions calendar requires the GraphQL API + a token.
  if (!process.env.GITHUB_TOKEN) return { contributions: [], total: 0 };

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays { date contributionCount }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { login: username } }),
    ...(fresh ? { cache: "no-store" as const } : { next: { revalidate: 300 } }),
  });

  if (!res.ok) return { contributions: [], total: 0 };
  const json = await res.json();
  const calendar =
    json?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) return { contributions: [], total: 0 };

  const contributions: GitHubContribution[] = [];
  for (const week of calendar.weeks ?? []) {
    for (const day of week.contributionDays ?? []) {
      contributions.push({ date: day.date, count: day.contributionCount });
    }
  }
  return {
    contributions,
    total: calendar.totalContributions ?? 0,
  };
}

export async function GET(request: Request) {
  const username = siteConfig.usernames.github;
  // ?fresh=1 bypasses the cache so the manual Refresh button gets live data.
  const fresh = new URL(request.url).searchParams.get("fresh") === "1";
  const fetchOpts = fresh
    ? { cache: "no-store" as const }
    : { next: { revalidate: 300 } };

  try {
    const userRes = await fetch(
      `https://api.github.com/users/${username}`,
      { headers: authHeaders(), ...fetchOpts },
    );
    if (!userRes.ok) throw new Error(`GitHub user responded ${userRes.status}`);
    const user = await userRes.json();

    // Aggregate stars across public repos (first 100).
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&type=owner&sort=updated`,
      { headers: authHeaders(), ...fetchOpts },
    );
    const repos = reposRes.ok ? await reposRes.json() : [];
    const totalStars = Array.isArray(repos)
      ? repos.reduce(
          (sum: number, r: { stargazers_count?: number }) =>
            sum + (r.stargazers_count ?? 0),
          0,
        )
      : 0;

    const { contributions, total } = await fetchContributions(username, fresh);

    const stats: GitHubStats = {
      username,
      name: user.name ?? siteConfig.name,
      publicRepos: user.public_repos ?? 0,
      followers: user.followers ?? 0,
      following: user.following ?? 0,
      totalStars,
      contributionsLastYear: total || fallbackGitHub.contributionsLastYear,
      contributions,
    };

    lastGood = stats;
    return NextResponse.json(stats, {
      headers: {
        "Cache-Control": fresh
          ? "no-store"
          : "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (err) {
    const fallback: GitHubStats = {
      ...(lastGood ?? fallbackGitHub),
      fromFallback: true,
      error: err instanceof Error ? err.message : "Unknown error",
    };
    return NextResponse.json(fallback, {
      status: 200,
      headers: { "Cache-Control": "public, s-maxage=300" },
    });
  }
}
