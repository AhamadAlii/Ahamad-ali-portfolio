import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";
import { fallbackLeetCode } from "@/lib/data";
import type { LeetCodeStats } from "@/lib/types";

// Revalidate at the route level (ISR-style) every 5 minutes so newly
// solved problems show up quickly after a refresh.
export const revalidate = 300;

const LEETCODE_GQL = "https://leetcode.com/graphql";

const PROFILE_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        ranking
      }
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
    userContestRanking(username: $username) {
      rating
      topPercentage
    }
  }
`;

// Keep the last successful payload in module memory so transient
// failures still return real data instead of breaking the UI.
let lastGood: LeetCodeStats | null = null;

function badgeForRating(rating: number): string {
  if (rating >= 2400) return "Guardian";
  if (rating >= 1850) return "Knight";
  return "Active";
}

export async function GET(request: Request) {
  const username = siteConfig.usernames.leetcode;
  // ?fresh=1 bypasses the cache so the manual Refresh button gets live data.
  const fresh =
    new URL(request.url).searchParams.get("fresh") === "1";

  try {
    const res = await fetch(LEETCODE_GQL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "Mozilla/5.0 (portfolio-stats-bot)",
      },
      body: JSON.stringify({
        query: PROFILE_QUERY,
        variables: { username },
      }),
      ...(fresh
        ? { cache: "no-store" as const }
        : { next: { revalidate: 300 } }),
    });

    if (!res.ok) throw new Error(`LeetCode responded ${res.status}`);

    const json = await res.json();
    const matched = json?.data?.matchedUser;
    if (!matched) throw new Error("LeetCode user not found");

    const counts: { difficulty: string; count: number }[] =
      matched.submitStatsGlobal?.acSubmissionNum ?? [];
    const get = (d: string) =>
      counts.find((c) => c.difficulty === d)?.count ?? 0;

    const contest = json?.data?.userContestRanking;
    const rating = Math.round(contest?.rating ?? fallbackLeetCode.rating);
    const topPercent = Number(
      (contest?.topPercentage ?? fallbackLeetCode.topPercent).toFixed(2),
    );

    const stats: LeetCodeStats = {
      username,
      ranking: matched.profile?.ranking ?? 0,
      rating,
      contestRating: rating,
      topPercent,
      totalSolved: get("All"),
      easySolved: get("Easy"),
      mediumSolved: get("Medium"),
      hardSolved: get("Hard"),
      badge: badgeForRating(rating),
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
    const fallback: LeetCodeStats = {
      ...(lastGood ?? fallbackLeetCode),
      fromFallback: true,
      error: err instanceof Error ? err.message : "Unknown error",
    };
    return NextResponse.json(fallback, {
      status: 200,
      headers: { "Cache-Control": "public, s-maxage=300" },
    });
  }
}
