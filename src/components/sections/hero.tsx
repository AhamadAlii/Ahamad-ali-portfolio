"use client";

import { motion } from "framer-motion";
import { Download, FolderGit2, Mail, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/social-links";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-5 pt-24 pb-16 text-center sm:px-8"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center"
      >
        <motion.div
          variants={item}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary"
        >
          <Sparkles className="h-4 w-4" />
          {siteConfig.availability}
        </motion.div>

        <motion.h1
          variants={item}
          className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          Hi, I&apos;m <span className="text-gradient">Ahamad Ali</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-4 font-mono text-sm text-primary sm:text-base md:text-lg"
        >
          {siteConfig.title}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg"
        >
          {siteConfig.shortBio}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a href={siteConfig.resume} download className="w-full sm:w-auto">
            <Button size="lg" className="w-full">
              <Download /> Download Resume
            </Button>
          </a>
          <a href="#projects" className="w-full sm:w-auto">
            <Button size="lg" variant="secondary" className="w-full">
              <FolderGit2 /> View Projects
            </Button>
          </a>
          <a href="#contact" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full">
              <Mail /> Contact Me
            </Button>
          </a>
        </motion.div>

        <motion.div variants={item} className="mt-10">
          <SocialLinks />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-surface-border-strong p-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="h-1.5 w-1 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
}
