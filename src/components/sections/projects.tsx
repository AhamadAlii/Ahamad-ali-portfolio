"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { ProjectCard } from "@/components/sections/project-card";
import { ProjectModal } from "@/components/sections/project-modal";
import { projects, projectCategories, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Projects() {
  const [active, setActive] = useState<(typeof projectCategories)[number]>("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesCat = active === "All" || p.category === active;
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [active, query]);

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Featured Work"
        title="Projects I'm Proud Of"
        subtitle="Production-minded builds across full-stack and AI/ML. Click any card for the deep dive."
      />

      <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex flex-wrap items-center gap-2">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-all",
                active === cat
                  ? "border-primary/50 bg-primary/15 text-primary"
                  : "border-surface-border text-foreground/70 hover:border-surface-border-strong hover:text-foreground",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects or tech…"
            className="w-full rounded-full border border-surface-border bg-surface py-2 pl-9 pr-4 text-sm placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none"
          />
        </div>
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              onOpen={() => setSelected(project)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-10 text-center text-muted-foreground">
          No projects match your search.
        </p>
      )}

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
