"use client";

import { motion } from "framer-motion";
import { GraduationCap, Code2, Brain, Lightbulb } from "lucide-react";
import { Section, SectionHeading, fadeUp } from "@/components/ui/section";

const pillars = [
  {
    icon: GraduationCap,
    title: "B.Tech CSE Student",
    text: "Final-year Computer Science student at PSIT Kanpur, graduating in 2026 with a strong CS foundation.",
  },
  {
    icon: Code2,
    title: "Full-Stack Engineer",
    text: "Comfortable across the stack — from pixel-perfect React UIs to robust Node and Python APIs.",
  },
  {
    icon: Brain,
    title: "AI/ML Builder",
    text: "Hands-on experience designing, training, and deploying machine learning models into real products.",
  },
  {
    icon: Lightbulb,
    title: "Problem Solver",
    text: "500+ solved DSA problems and a LeetCode Knight badge — I think in systems and edge cases.",
  },
];

export function About() {
  return (
    <Section id="about">
      <SectionHeading eyebrow="About Me" title="Engineer, Builder, Problem Solver" />

      <div className="grid gap-10 lg:grid-cols-5">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="lg:col-span-3">
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              I&apos;m{" "}
              <span className="font-medium text-foreground">Ahamad Ali</span>, a
              final-year Computer Science student and full-stack developer who
              loves turning ambiguous problems into clean, production-grade
              software. My journey started with competitive programming and
              quickly grew into building complete products end to end.
            </p>
            <p>
              On the engineering side, I&apos;ve shipped MERN applications,
              designed REST APIs, and crafted responsive front-ends with React,
              Next.js, and Tailwind. On the AI/ML side, I&apos;ve built and
              deployed models with Scikit-Learn and served them through Flask and
              FastAPI back-ends.
            </p>
            <p>
              What stays constant is my problem-solving mindset — I&apos;m
              relentless about correctness, performance, and user experience.
              I&apos;m currently{" "}
              <span className="font-medium text-foreground">
                open to Software Engineering opportunities
              </span>{" "}
              where I can build meaningful products and keep growing fast.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              {...fadeUp}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-surface-border bg-surface p-5 backdrop-blur-xl"
            >
              <p.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-3 font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
