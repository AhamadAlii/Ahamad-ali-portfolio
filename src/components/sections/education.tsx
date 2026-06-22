"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { education } from "@/lib/data";

export function Education() {
  return (
    <Section id="education">
      <SectionHeading eyebrow="Education" title="Academic Background" />

      <div className="mx-auto max-w-3xl space-y-5">
        {education.map((edu, i) => (
          <motion.div
            key={edu.institution}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex gap-5 rounded-2xl border border-surface-border bg-surface p-6 backdrop-blur-xl"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <GraduationCap className="h-6 w-6" />
            </span>
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold">{edu.institution}</h3>
                <span className="font-mono text-sm text-primary">
                  {edu.period}
                </span>
              </div>
              <p className="text-foreground/85">{edu.degree}</p>
              <p className="mt-2 text-sm text-muted-foreground">{edu.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
