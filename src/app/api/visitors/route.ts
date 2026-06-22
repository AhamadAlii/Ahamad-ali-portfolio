import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const COUNTER_FILE = path.join("/tmp", "portfolio-visitors.json");
const SEED = 1247;

// In-memory fallback for read-only/serverless filesystems.
let memoryCount: number | null = null;

async function readCount(): Promise<number> {
  if (memoryCount !== null) return memoryCount;
  try {
    const raw = await fs.readFile(COUNTER_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return typeof parsed.count === "number" ? parsed.count : SEED;
  } catch {
    return SEED;
  }
}

async function writeCount(count: number): Promise<void> {
  memoryCount = count;
  try {
    await fs.writeFile(COUNTER_FILE, JSON.stringify({ count }), "utf-8");
  } catch {
    // Ignore write failures (read-only FS); memory value still serves.
  }
}

export async function GET() {
  const count = await readCount();
  return NextResponse.json({ count });
}

export async function POST() {
  const next = (await readCount()) + 1;
  await writeCount(next);
  return NextResponse.json({ count: next });
}
