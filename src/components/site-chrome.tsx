import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: "🏠", label: "Home" },
  { to: "/book", icon: "📖", label: "The Book" },
  { to: "/shop", icon: "🦴", label: "Shop" },
  { to: "/adopt", icon: "💗", label: "Adopt" },
  { to: "/farm", icon: "🏡", label: "Shelter Farm" },
  { to: "/activities", icon: "🎨", label: "Fun Zone" },
];

export function SiteNav() {
  const [barking, setBarking] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-4 border-border bg-sky/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2 px-3 py-3 sm:gap-3">
        <Link
          to="/"
          className="font-display outlined-text-sm mr-auto text-2xl text-paper sm:text-3xl"
        >
          Bailey&apos;s World
        </Link>
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: item.to === "/" }}
            className={cn(
              "font-display inline-flex items-center gap-1.5 rounded-full border-4 border-border bg-paper px-4 py-2 text-base text-primary transition-transform duration-150",
              "shadow-[0_4px_0_0_var(--ink)] hover:-translate-y-0.5 hover:rotate-1 active:translate-y-[3px] active:shadow-[0_1px_0_0_var(--ink)]",
              "[&.active]:bg-sunshine",
            )}
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </Link>
        ))}
        <button
          onClick={() => {
            setBarking((b) => !b);
          }}
          aria-pressed={barking}
          className="font-display inline-flex items-center gap-1.5 rounded-full border-4 border-border bg-teal px-4 py-2 text-base text-primary shadow-[0_4px_0_0_var(--ink)] active:translate-y-[3px]"
        >
          {barking ? "🔊 Woof on!" : "🔇 Sound off"}
        </button>
      </nav>
      {barking && (
        <p className="font-display bg-sunshine py-1 text-center text-lg text-sunshine-foreground">
          WOOF WOOF! Bailey says hello! 🐶
        </p>
      )}
    </header>
  );
}

export function ParentsCorner() {
  return (
    <footer className="mt-20 border-t-4 border-border bg-paper">
      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-12 text-primary sm:grid-cols-3">
        <div>
          <h3 className="text-xl">Parents&apos; Corner</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            The grown-up bits: orders, delivery and getting in touch.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-bold">Shipping &amp; returns</p>
          <p className="mt-1 text-muted-foreground">
            UK delivery in 3–5 days. 30-day returns on unopened items.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-bold">Contact</p>
          <p className="mt-1 text-muted-foreground">hello@baileysworld.co.uk</p>
          <p className="mt-1 text-muted-foreground">Instagram · TikTok · Facebook</p>
        </div>
      </div>
      <p className="border-t border-border/20 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} The Dog With No Chill · Bailey&apos;s World
      </p>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <main>{children}</main>
      <ParentsCorner />
    </div>
  );
}
