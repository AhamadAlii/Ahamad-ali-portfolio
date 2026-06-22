"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const counted = sessionStorage.getItem("visited");
    const url = "/api/visitors";
    const handle = (data: { count: number }) => setCount(data.count);

    if (counted) {
      fetch(url).then((r) => r.json()).then(handle).catch(() => {});
    } else {
      fetch(url, { method: "POST" })
        .then((r) => r.json())
        .then((d) => {
          sessionStorage.setItem("visited", "1");
          handle(d);
        })
        .catch(() => {});
    }
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Eye className="h-4 w-4 text-primary" />
      <span className="font-mono">
        {count !== null ? count.toLocaleString() : "—"}
      </span>
      <span>visitors</span>
    </div>
  );
}
