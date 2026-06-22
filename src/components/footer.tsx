import { siteConfig } from "@/lib/site-config";
import { SocialLinks } from "@/components/social-links";
import { VisitorCounter } from "@/components/sections/visitor-counter";

export function Footer() {
  return (
    <footer className="relative border-t border-surface-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="font-mono text-lg font-semibold">{siteConfig.name}</p>
            <p className="text-sm text-muted-foreground">{siteConfig.title}</p>
          </div>
          <SocialLinks />
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-surface-border pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js,
            Tailwind & Framer Motion.
          </p>
          <VisitorCounter />
        </div>
      </div>
    </footer>
  );
}
