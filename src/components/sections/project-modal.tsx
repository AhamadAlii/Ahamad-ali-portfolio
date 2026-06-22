"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Lightbulb, Target } from "lucide-react";
import { GithubIcon } from "@/components/brand-icons";
import type { Project } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-overlay p-4 backdrop-blur-sm"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-surface-border bg-background/95 backdrop-blur-xl"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-surface-border bg-background/60 text-foreground/80 backdrop-blur-md transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-2xl">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="640px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </div>

            <div className="p-6">
              <span className="text-sm text-primary">{project.tagline}</span>
              <h3 className="text-2xl font-bold">{project.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-surface-border bg-surface p-3 text-center"
                  >
                    <div className="font-mono text-lg font-bold text-primary">
                      {m.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h4 className="flex items-center gap-2 font-semibold">
                  <Target className="h-4 w-4 text-primary" /> Architecture
                  Highlights
                </h4>
                <ul className="mt-2 space-y-1.5">
                  {project.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-2 text-sm text-foreground/85"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 rounded-xl border border-surface-border bg-surface p-4">
                <h4 className="flex items-center gap-2 text-sm font-semibold">
                  <Lightbulb className="h-4 w-4 text-amber-400" /> Challenge
                  Solved
                </h4>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {project.challenges}
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full">
                    <ExternalLink /> Live Demo
                  </Button>
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full">
                    <GithubIcon /> View Code
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
