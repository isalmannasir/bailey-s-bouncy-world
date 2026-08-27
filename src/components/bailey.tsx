import { Link } from "@tanstack/react-router";
import { type ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/* ---------- Sticker button ---------- */

type StickerColor = "magenta" | "sunshine" | "grass" | "teal" | "paper";

const stickerColors: Record<StickerColor, string> = {
  magenta: "bg-magenta text-magenta-foreground",
  sunshine: "bg-sunshine text-sunshine-foreground",
  grass: "bg-grass text-grass-foreground",
  teal: "bg-teal text-primary",
  paper: "bg-paper text-primary",
};

export function StickerButton({
  color = "magenta",
  size = "md",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: StickerColor;
  size?: "md" | "lg";
}) {
  return (
    <button
      {...props}
      className={cn(
        "font-display inline-flex items-center justify-center gap-2 rounded-full border-4 border-border font-extrabold transition-transform duration-150 active:translate-y-[4px] disabled:opacity-60",
        "shadow-[0_6px_0_0_var(--ink)] active:shadow-[0_2px_0_0_var(--ink)] hover:-rotate-1 hover:scale-105",
        size === "lg" ? "px-8 py-4 text-2xl" : "px-6 py-3 text-lg",
        stickerColors[color],
        className,
      )}
    >
      {children}
    </button>
  );
}

export function StickerLink({
  to,
  color = "magenta",
  size = "md",
  className,
  children,
}: {
  to: string;
  color?: StickerColor;
  size?: "md" | "lg";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "font-display inline-flex items-center justify-center gap-2 rounded-full border-4 border-border font-extrabold transition-transform duration-150 active:translate-y-[4px]",
        "shadow-[0_6px_0_0_var(--ink)] active:shadow-[0_2px_0_0_var(--ink)] hover:-rotate-1 hover:scale-105",
        size === "lg" ? "px-8 py-4 text-2xl" : "px-6 py-3 text-lg",
        stickerColors[color],
        className,
      )}
    >
      {children}
    </Link>
  );
}

/* ---------- Speech + quote bubbles ---------- */

export function SpeechBubble({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-[2.5rem] border-4 border-border bg-paper px-7 py-6 text-primary shadow-[8px_8px_0_0_var(--ink)]",
        className,
      )}
    >
      {children}
      <span className="absolute -bottom-5 left-12 h-8 w-8 rotate-45 rounded-br-xl border-r-4 border-b-4 border-border bg-paper" />
    </div>
  );
}

export function BaileySays({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[2rem] border-4 border-dashed border-magenta bg-paper/80 p-6">
      <p className="font-display text-magenta text-xl">Bailey Says…</p>
      <p className="mt-2 text-xl text-primary">{children}</p>
    </div>
  );
}

/* ---------- Little decorations ---------- */

export function Paw({ className }: { className?: string }) {
  return <span className={cn("select-none", className)}>🐾</span>;
}

export function PawDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-10 text-3xl">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="animate-bob"
          style={{ animationDelay: `${i * 0.15}s` }}
        >
          🐾
        </span>
      ))}
    </div>
  );
}

export function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("animate-twinkle", className)} aria-hidden>
      <path
        d="M12 1.5l3 6.6 7.2.8-5.4 4.9 1.5 7.1L12 17.3 5.7 20.9l1.5-7.1L1.8 8.9l7.2-.8z"
        fill="currentColor"
        stroke="var(--ink)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "outlined-text text-paper text-center text-5xl sm:text-6xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}

/* ---------- Fetching loader ---------- */

export function BaileyFetching({ label = "Bailey is fetching it…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-10">
      <span className="animate-fetch text-5xl">🐕</span>
      <p className="font-display text-primary text-xl">{label}</p>
    </div>
  );
}

/* ---------- Badge collection (delight only) ---------- */

export const BADGES = [
  { id: "home", label: "Hello Bailey" },
  { id: "book", label: "Book Sniffer" },
  { id: "shop", label: "Shop Hound" },
  { id: "play", label: "Ball Finder" },
] as const;

const earned = new Set<string>();
const listeners = new Set<() => void>();

export function earnBadge(id: string) {
  if (earned.has(id)) return;
  earned.add(id);
  listeners.forEach((l) => l());
}

export function useBadges() {
  const [, force] = useState(0);
  useEffect(() => {
    const l = () => force((n) => n + 1);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return earned;
}

export function useEarnBadge(id: string) {
  useEffect(() => {
    const t = setTimeout(() => earnBadge(id), 900);
    return () => clearTimeout(t);
  }, [id]);
}

export function BadgeTray() {
  const badges = useBadges();
  return (
    <div className="rounded-[2rem] border-4 border-border bg-paper/90 p-6">
      <p className="font-display text-primary text-2xl">
        Your star badges: {badges.size}/{BADGES.length}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        {BADGES.map((b) => {
          const got = badges.has(b.id);
          return (
            <span
              key={b.id}
              className={cn(
                "font-display inline-flex items-center gap-2 rounded-full border-4 border-border px-4 py-2 text-base",
                got ? "bg-sunshine text-sunshine-foreground" : "bg-muted text-muted-foreground",
              )}
            >
              <Star className={cn("h-5 w-5", got ? "text-orange" : "text-muted-foreground")} />
              {b.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
