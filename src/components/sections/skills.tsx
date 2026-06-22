"use client";

import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/ui/section";
import { skillCategories } from "@/lib/data";

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Tech Stack"
        title="Skills & Technologies"
        subtitle="A versatile toolkit spanning frontend, backend, databases, cloud, and machine learning."
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat, idx) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: idx * 0.06 }}
            className="rounded-2xl border border-surface-border bg-surface p-6 backdrop-blur-xl"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <cat.icon className="h-5 w-5" />
              </span>
              <h3 className="font-semibold">{cat.title}</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill, i) => (
                <motion.span
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
                  className="rounded-lg border border-surface-border bg-surface-strong px-3 py-1.5 text-sm text-foreground/85 transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
