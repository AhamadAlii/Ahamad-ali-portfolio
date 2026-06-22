import { Code, Trophy } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const links = [
  { label: "GitHub", href: siteConfig.socials.github, Icon: GithubIcon },
  { label: "LinkedIn", href: siteConfig.socials.linkedin, Icon: LinkedinIcon },
  { label: "LeetCode", href: siteConfig.socials.leetcode, Icon: Code },
  { label: "HackerRank", href: siteConfig.socials.hackerrank, Icon: Trophy },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="group flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-surface text-foreground/70 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-foreground"
        >
          <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
        </a>
      ))}
    </div>
  );
}
