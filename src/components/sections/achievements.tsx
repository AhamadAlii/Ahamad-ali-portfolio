"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { achievements } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Achievements() {
  return (
    <Section id="achievements">
      <SectionHeading
        eyebrow="Recognition"
        title="Achievements & Certifications"
        subtitle="Milestones that reflect consistency, problem-solving depth, and continuous learning."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className={cn(
              "group relative overflow-hidden rounded-2xl border p-6 backdrop-blur-xl transition-all hover:-translate-y-1",
              a.highlight
                ? "border-primary/30 bg-primary/[0.07]"
                : "border-surface-border bg-surface",
            )}
          >
            {a.highlight && (
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
            )}
            <div className="flex items-start justify-between">
              <span
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl",
                  a.highlight
                    ? "bg-primary/20 text-primary"
                    : "bg-surface-strong text-foreground/80",
                )}
              >
                <Trophy className="h-5 w-5" />
              </span>
              <span className="rounded-full border border-surface-border bg-background/40 px-2.5 py-1 font-mono text-xs text-foreground/70">
                {a.badge}
              </span>
            </div>
            <h3 className="mt-4 font-semibold">{a.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{a.detail}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
