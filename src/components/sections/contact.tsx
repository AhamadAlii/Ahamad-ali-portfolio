"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Mail, MapPin, Clock } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/social-links";
import { siteConfig } from "@/lib/site-config";

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus("loading");
    setFeedback("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setStatus("success");
        setFeedback(
          json.simulated
            ? "Message received (dev simulation — configure RESEND_API_KEY to send for real)."
            : "Thanks! Your message has been sent. I'll get back to you soon.",
        );
        form.reset();
      } else {
        setStatus("error");
        setFeedback(json.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setFeedback("Network error. Please try again.");
    }
  }

  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Get In Touch"
        title="Let's Build Something"
        subtitle="Have a role, project, or idea in mind? I'd love to hear from you."
      />

      <div className="grid gap-8 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 lg:col-span-2"
        >
          <p className="text-muted-foreground">
            I&apos;m actively exploring Software Engineering opportunities and
            always open to a good conversation.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-3 rounded-xl border border-surface-border bg-surface p-4 transition-colors hover:border-primary/40"
          >
            <Mail className="h-5 w-5 text-primary" />
            <span className="text-sm">{siteConfig.email}</span>
          </a>
          <div className="flex items-center gap-3 rounded-xl border border-surface-border bg-surface p-4">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="text-sm">{siteConfig.location}</span>
          </div>
          <SocialLinks />
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onSubmit={onSubmit}
          className="flex flex-col gap-4 rounded-2xl border border-surface-border bg-surface p-6 backdrop-blur-xl lg:col-span-3"
        >
          {/* Coming-soon notice — contact form is not live yet */}
          <div className="flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-amber-500 dark:text-amber-300">
            <Clock className="mt-0.5 h-5 w-5 shrink-0" />
            <div className="text-sm">
              <p className="font-semibold">This form isn&apos;t live yet</p>
              <p className="mt-0.5 text-amber-600/90 dark:text-amber-200/80">
                Direct messaging is coming soon. In the meantime, please reach
                me at{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-medium underline underline-offset-2"
                >
                  {siteConfig.email}
                </a>
                .
              </p>
            </div>
          </div>

          {/* Honeypot field (hidden from humans) */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="absolute -left-[9999px]"
            aria-hidden
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm">
                Name
              </label>
              <Input id="name" name="name" placeholder="Your name" required />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@email.com"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell me about the opportunity or idea…"
              required
              minLength={10}
            />
          </div>

          <Button type="submit" size="lg" disabled aria-disabled title="Coming soon">
            <Send /> Send Message (Coming Soon)
          </Button>

          {status === "success" && (
            <p className="flex items-center gap-2 text-sm text-emerald-400">
              <CheckCircle2 className="h-4 w-4" /> {feedback}
            </p>
          )}
          {status === "error" && (
            <p className="flex items-center gap-2 text-sm text-rose-400">
              <AlertCircle className="h-4 w-4" /> {feedback}
            </p>
          )}
        </motion.form>
      </div>
    </Section>
  );
}
