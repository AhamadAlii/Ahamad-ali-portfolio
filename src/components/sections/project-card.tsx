"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/brand-icons";
import type { Project } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-surface-border bg-surface backdrop-blur-xl"
    >
      <button
        onClick={onOpen}
        className="relative aspect-[16/10] w-full overflow-hidden text-left"
        aria-label={`View details for ${project.title}`}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <span className="absolute right-3 top-3 rounded-full border border-surface-border-strong bg-background/60 px-3 py-1 text-xs backdrop-blur-md">
          {project.category}
        </span>
        <span className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="text-sm text-primary">{project.tagline}</p>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
          {project.stack.length > 4 && (
            <Badge>+{project.stack.length - 4}</Badge>
          )}
        </div>

        <div className="mt-5 flex items-center gap-3 border-t border-surface-border pt-4 text-sm">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-foreground/80 transition-colors hover:text-foreground"
          >
            <GithubIcon className="h-4 w-4" /> Code
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-foreground/80 transition-colors hover:text-primary"
          >
            <ExternalLink className="h-4 w-4" /> Live Demo
          </a>
        </div>
      </div>
    </motion.article>
  );
}
