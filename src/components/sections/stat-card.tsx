"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType, SVGProps } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return value;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  suffix = "",
  prefix = "",
  loading = false,
  accent = "text-primary",
}: {
  label: string;
  value: number;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  suffix?: string;
  prefix?: string;
  loading?: boolean;
  accent?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useCountUp(value, inView && !loading);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-surface-border bg-surface p-5 backdrop-blur-xl"
    >
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-50" />
      <Icon className={cn("h-5 w-5", accent)} />
      <div className="mt-4 font-mono text-2xl font-bold tracking-tight sm:text-3xl">
        {loading ? (
          <span className="inline-block h-8 w-16 animate-pulse rounded bg-surface-hover" />
        ) : (
          <>
            {prefix}
            {count.toLocaleString()}
            {suffix}
          </>
        )}
      </div>
      <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{label}</p>
    </motion.div>
  );
}
