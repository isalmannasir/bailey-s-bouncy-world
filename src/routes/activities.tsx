import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import baileyHero from "@/assets/bailey-hero.png";
import { PageShell } from "@/components/site-chrome";
import {
  BadgeTray,
  BaileyFetching,
  PawDivider,
  SectionTitle,
  StickerButton,
  earnBadge,
  useEarnBadge,
} from "@/components/bailey";

export const Route = createFileRoute("/activities")({
  head: () => ({
    meta: [
      { title: "Fun Zone — Games & Colouring with Bailey" },
      {
        name: "description",
        content:
          "Play Find the Tennis Ball, grab printable colouring pages and collect star badges in Bailey's Fun Zone.",
      },
      { property: "og:title", content: "Fun Zone — Games & Colouring with Bailey" },
      {
        property: "og:description",
        content: "Hidden-ball game, printable colouring pages and star badges for kids.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ActivitiesPage,
});

const CELLS = 12;

function BallGame() {
  const [ball, setBall] = useState(() => Math.floor(Math.random() * CELLS));
  const [found, setFound] = useState<number | null>(null);
  const [misses, setMisses] = useState<number[]>([]);

  const guess = (i: number) => {
    if (found !== null) return;
    if (i === ball) {
      setFound(i);
      earnBadge("play");
    } else if (!misses.includes(i)) {
      setMisses([...misses, i]);
    }
  };

  return (
    <div className="ink-box rounded-[2.5rem] bg-paper p-8">
      <h3 className="text-3xl text-primary">🎾 Find the tennis ball!</h3>
      <p className="mt-1 text-muted-foreground">
        Bailey hid her ball under one of the bushes. Tap to look!
      </p>
      <div className="mt-6 grid grid-cols-4 gap-3 sm:grid-cols-6">
        {Array.from({ length: CELLS }, (_, i) => {
          const isFound = found === i;
          const isMiss = misses.includes(i);
          return (
            <button
              key={i}
              onClick={() => guess(i)}
              aria-label={`Bush ${i + 1}`}
              className={`aspect-square rounded-2xl border-4 border-border text-4xl transition-transform hover:-translate-y-1 active:translate-y-1 ${
                isFound ? "bg-sunshine" : isMiss ? "bg-muted" : "bg-grass"
              }`}
            >
              {isFound ? "🎾" : isMiss ? "🍃" : "🌳"}
            </button>
          );
        })}
      </div>
      {found !== null ? (
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <p className="font-display text-2xl text-magenta">You found it! Bailey is SO happy!</p>
          <StickerButton
            color="teal"
            onClick={() => {
              setBall(Math.floor(Math.random() * CELLS));
              setFound(null);
              setMisses([]);
            }}
          >
            Play again
          </StickerButton>
        </div>
      ) : (
        <p className="font-display mt-6 text-xl text-primary">Looks so far: {misses.length}</p>
      )}
    </div>
  );
}

const downloads = [
  { emoji: "🖍️", title: "Bailey colouring page", text: "Print it and go wild with crayons." },
  { emoji: "🐾", title: "Paw print maze", text: "Help Bailey reach the tennis ball." },
  { emoji: "🖼️", title: "Bailey wallpaper", text: "For the family tablet." },
];

function ActivitiesPage() {
  useEarnBadge("play");
  const [fetching, setFetching] = useState<string | null>(null);

  return (
    <PageShell>
      <section className="px-6 py-12">
        <SectionTitle>Fun Zone!</SectionTitle>
        <img
          src={baileyHero}
          alt="Bailey ready to play"
          width={1024}
          height={1024}
          className="animate-bob mx-auto mt-4 w-44"
        />
        <div className="mx-auto mt-8 max-w-3xl">
          <BallGame />
        </div>
      </section>

      <PawDivider />

      <section className="mx-auto max-w-5xl px-6">
        <h2 className="outlined-text-sm text-center text-4xl text-paper">Print &amp; play</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {downloads.map((d, i) => (
            <div
              key={d.title}
              className={`ink-box rounded-[2rem] bg-paper p-6 text-center ${i % 2 ? "tilt-right" : "tilt-left"}`}
            >
              <span className="text-6xl">{d.emoji}</span>
              <h3 className="mt-3 text-2xl text-primary">{d.title}</h3>
              <p className="mt-1 text-muted-foreground">{d.text}</p>
              {fetching === d.title ? (
                <BaileyFetching label="Bailey is fetching it…" />
              ) : (
                <StickerButton
                  className="mt-4"
                  color="sunshine"
                  onClick={() => {
                    setFetching(d.title);
                    setTimeout(() => setFetching(null), 1800);
                  }}
                >
                  Download
                </StickerButton>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-14">
        <BadgeTray />
      </section>
    </PageShell>
  );
}
