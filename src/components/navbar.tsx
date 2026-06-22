"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import { navItems } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-surface-border bg-background/70 backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a
            href="#hero"
            className="flex items-center gap-2 font-mono text-sm font-semibold"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Terminal className="h-4 w-4" />
            </span>
            <span className="hidden sm:inline">Ahamad-Ali</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm text-foreground/70 transition-colors hover:bg-surface-strong hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={siteConfig.resume}
              download
              className="hidden sm:inline-flex"
            >
              <Button size="sm">Resume</Button>
            </a>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-border md:hidden"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
        <motion.div
          style={{ scaleX }}
          className="h-0.5 origin-left bg-gradient-to-r from-primary to-blue-400"
        />
      </header>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-x-0 top-16 z-40 border-b border-surface-border bg-background/95 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-1 p-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-foreground/80 transition-colors hover:bg-surface-strong"
              >
                {item.label}
              </a>
            ))}
            <a href={siteConfig.resume} download onClick={() => setOpen(false)}>
              <Button className="mt-2 w-full">Download Resume</Button>
            </a>
          </div>
        </motion.div>
      )}
    </>
  );
}
