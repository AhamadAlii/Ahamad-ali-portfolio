"use client";

import { motion } from "framer-motion";
import { Download, BadgeCheck, Briefcase, Layers } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { preferredRoles } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

const techSummary = [
  "React / Next.js",
  "Node.js / Express",
  "Python / FastAPI / Flask",
  "MongoDB / MySQL",
  "AWS / Docker / Linux",
  "Scikit-Learn / Pandas",
];

export function Recruiter() {
  return (
    <Section id="recruiter">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/[0.12] via-white/[0.03] to-blue-500/[0.08] p-8 backdrop-blur-xl sm:p-12"
      >
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for Hire
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              For Recruiters
            </h2>
            <p className="mt-3 text-muted-foreground">
              {siteConfig.availability}. I bring full-stack engineering depth,
              applied AI/ML experience, and a proven problem-solving track
              record — ready to contribute from day one.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={siteConfig.resume} download>
                <Button size="lg">
                  <Download /> Download Resume
                </Button>
              </a>
              <a href="#contact">
                <Button size="lg" variant="outline">
                  Reach Out
                </Button>
              </a>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-1">
            <div className="rounded-2xl border border-surface-border bg-background/40 p-5">
              <h3 className="flex items-center gap-2 font-semibold">
                <Briefcase className="h-4 w-4 text-primary" /> Preferred Roles
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {preferredRoles.map((role) => (
                  <Badge key={role} className="border-primary/30 bg-primary/10">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-surface-border bg-background/40 p-5">
                <h3 className="flex items-center gap-2 font-semibold">
                  <Layers className="h-4 w-4 text-primary" /> Tech Stack
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {techSummary.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-surface-border bg-background/40 p-5">
                <h3 className="flex items-center gap-2 font-semibold">
                  <BadgeCheck className="h-4 w-4 text-primary" /> Experience
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  <li>Tech Intern @ Skill Bee</li>
                  <li>3 production-grade projects</li>
                  <li>LeetCode Knight (Top 2.84%)</li>
                  <li>AWS &amp; IBM certified</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
