"use client";

import { motion } from "framer-motion";
import { Briefcase, CheckCircle2 } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/lib/data";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've Worked"
        subtitle="Real-world engineering experience shipping features that matter."
      />

      <div className="relative mx-auto max-w-3xl">
        <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-white/10 to-transparent sm:left-5" />

        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.company + idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="relative pl-12 sm:pl-16"
          >
            <span className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-background text-primary sm:h-10 sm:w-10">
              <Briefcase className="h-4 w-4" />
            </span>

            <div className="rounded-2xl border border-surface-border bg-surface p-6 backdrop-blur-xl">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold">{exp.role}</h3>
                  <p className="text-primary">{exp.company}</p>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>{exp.period}</p>
                  <p>{exp.location}</p>
                </div>
              </div>

              <p className="mt-3 text-sm text-muted-foreground">
                {exp.description}
              </p>

              <ul className="mt-4 space-y-2">
                {exp.achievements.map((a) => (
                  <li key={a} className="flex gap-2 text-sm text-foreground/85">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                {exp.stack.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
