import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import bookCover from "@/assets/book-cover.jpg";
import baileyHero from "@/assets/bailey-hero.png";
import { PageShell } from "@/components/site-chrome";
import {
  BaileySays,
  PawDivider,
  SectionTitle,
  StickerButton,
  StickerLink,
  useEarnBadge,
} from "@/components/bailey";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Meet the Books — Bailey's World" },
      {
        name: "description",
        content:
          "Flip through The Dog With No Chill, read Bailey Says quotes and count down to the brand new November book.",
      },
      { property: "og:title", content: "Meet the Books — Bailey's World" },
      {
        property: "og:description",
        content: "A read-along peek inside Bailey's picture books, plus a countdown to book two.",
      },
      { property: "og:type", content: "book" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BookPage,
});

const pages = [
  {
    title: "Page 1",
    text: "This is Bailey. Bailey has NO chill. Not even a little bit.",
    emoji: "🐶",
  },
  { title: "Page 2", text: "Bailey saw a bee. Bailey chased the bee. Zoom, zoom, ZOOM!", emoji: "🐝" },
  { title: "Page 3", text: "The kitchen was tidy. Then Bailey happened. Oops!", emoji: "🍳" },
  { title: "Page 4", text: "Bailey hugged everyone. Then hugged them again. Woof!", emoji: "🤗" },
];

function useCountdown(target: Date) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  if (!now) return null;
  const diff = Math.max(0, target.getTime() - now.getTime());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function BookPage() {
  useEarnBadge("book");
  const [page, setPage] = useState(0);
  const left = useCountdown(new Date("2026-11-05T09:00:00Z"));

  return (
    <PageShell>
      <section className="px-6 py-12">
        <SectionTitle>Meet the Book!</SectionTitle>
        <div className="mx-auto mt-10 grid max-w-5xl items-center gap-10 md:grid-cols-2">
          <img
            src={bookCover}
            alt="Cover of The Dog With No Chill picture book"
            width={896}
            height={1152}
            className="ink-box tilt-right mx-auto w-full max-w-sm rounded-[1.5rem]"
          />
          <div className="space-y-6">
            <p className="text-2xl text-primary">
              A big, loud, giggly picture book about a dog who simply cannot calm down.
            </p>
            <BaileySays>Read it in a silly voice. That&apos;s the rule!</BaileySays>
            <StickerLink to="/shop" color="magenta" size="lg">
              🦴 Buy the book
            </StickerLink>
          </div>
        </div>
      </section>

      <PawDivider />

      <section className="mx-auto max-w-3xl px-6">
        <h2 className="outlined-text-sm text-center text-4xl text-paper">Read-along peek</h2>
        <div className="ink-box mt-8 rounded-[2.5rem] bg-paper p-8 text-center">
          <span className="text-7xl">{pages[page].emoji}</span>
          <p className="font-display mt-4 text-3xl text-primary">{pages[page].text}</p>
          <p className="mt-3 text-muted-foreground">
            {pages[page].title} of {pages.length}
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <StickerButton
              color="teal"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              ⬅ Back
            </StickerButton>
            <StickerButton
              color="sunshine"
              onClick={() => setPage((p) => Math.min(pages.length - 1, p + 1))}
              disabled={page === pages.length - 1}
            >
              Turn page ➡
            </StickerButton>
          </div>
        </div>
      </section>

      <PawDivider />

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="ink-box rounded-[2.5rem] bg-magenta p-8 text-center text-magenta-foreground">
          <h2 className="text-4xl">Book two lands in November!</h2>
          <p className="mt-2 text-xl">Bailey Goes To School (and eats the register).</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {left ? (
              [
                ["Days", left.days],
                ["Hours", left.hours],
                ["Mins", left.minutes],
                ["Secs", left.seconds],
              ].map(([label, value]) => (
                <div
                  key={label as string}
                  className="rounded-[1.5rem] border-4 border-border bg-paper px-6 py-4 text-primary"
                >
                  <p className="font-display text-4xl">{value as number}</p>
                  <p className="text-sm text-muted-foreground">{label as string}</p>
                </div>
              ))
            ) : (
              <p className="font-display text-2xl">Counting on my paws…</p>
            )}
          </div>
        </div>
        <div className="mt-10">
          <img
            src={baileyHero}
            alt="Bailey bouncing with excitement about the new book"
            width={1024}
            height={1024}
            loading="lazy"
            className="animate-bob mx-auto w-44"
          />
        </div>
      </section>
    </PageShell>
  );
}
