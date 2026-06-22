export type LeetCodeStats = {
  username: string;
  ranking: number;
  rating: number;
  contestRating: number;
  topPercent: number;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  badge: string;
  fromFallback?: boolean;
  error?: string;
};

export type GitHubContribution = { date: string; count: number };

export type GitHubStats = {
  username: string;
  name: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  contributionsLastYear: number;
  contributions: GitHubContribution[];
  fromFallback?: boolean;
  error?: string;
};
