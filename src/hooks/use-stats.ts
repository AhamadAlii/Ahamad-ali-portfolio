"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import type { LeetCodeStats, GitHubStats } from "@/lib/types";

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

// When the user clicks "Refresh", we set this flag so the next refetch hits
// the cache-bypassing `?fresh=1` endpoints. It's reset after each fetch.
let forceFresh = false;

/** Force the next stats refetch to bypass the server cache. */
export function requestFreshStats() {
  forceFresh = true;
}

export function useLeetCode() {
  return useQuery<LeetCodeStats>({
    queryKey: ["leetcode"],
    queryFn: () =>
      getJSON<LeetCodeStats>(
        forceFresh ? "/api/leetcode?fresh=1" : "/api/leetcode",
      ),
  });
}

export function useGitHub() {
  return useQuery<GitHubStats>({
    queryKey: ["github"],
    queryFn: () =>
      getJSON<GitHubStats>(
        forceFresh ? "/api/github?fresh=1" : "/api/github",
      ).finally(() => {
        // Reset only after the GitHub fetch (the second of the pair) settles,
        // so both LeetCode and GitHub use the fresh URL during a manual refresh.
        forceFresh = false;
      }),
  });
}

export function useVisitorCount() {
  return useMutation({
    mutationFn: () =>
      fetch("/api/visitors", { method: "POST" }).then(
        (r) => r.json() as Promise<{ count: number }>,
      ),
  });
}
