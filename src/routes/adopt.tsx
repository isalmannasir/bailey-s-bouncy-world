import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import baileyHeart from "@/assets/bailey-heart.png";
import { PageShell } from "@/components/site-chrome";
import {
  BaileySays,
  SectionTitle,
  StickerButton,
  useEarnBadge,
} from "@/components/bailey";

export const Route = createFileRoute("/adopt")({
  head: () => ({
    meta: [
      { title: "Adoption Programme (UK) — Bailey's World" },
      {
        name: "description",
        content:
          "UK rescues and shelters can submit dogs to Bailey's adoption programme in three simple steps. Warm homes, wagging tails.",
      },
      { property: "og:title", content: "Adoption Programme (UK) — Bailey's World" },
      {
        property: "og:description",
        content: "Submit a rescue dog for Bailey's UK adoption programme in three short steps.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdoptPage,
});

const steps = [
  { n: 1, title: "Tell us about the dog", text: "Name, age, size and their favourite silly habit." },
  { n: 2, title: "We say hello", text: "Our UK team calls your organisation within 3 working days." },
  { n: 3, title: "Find a family", text: "We share their story with families looking for a friend." },
];

function AdoptPage() {
  useEarnBadge("adopt");
  const [sent, setSent] = useState(false);

  return (
    <PageShell>
      <section className="px-6 py-12">
        <SectionTitle>Adopt a Friend 💗</SectionTitle>
        <div className="mx-auto mt-10 grid max-w-5xl items-center gap-10 md:grid-cols-2">
          <img
            src={baileyHeart}
            alt="Bailey hugging a big pink heart"
            width={768}
            height={768}
            className="animate-bob mx-auto w-64"
          />
          <div className="space-y-5">
            <p className="text-2xl text-primary">
              Every dog deserves a squishy sofa and someone to bark at. This bit is for UK rescues
              and shelters with dogs looking for a home.
            </p>
            <BaileySays>Everybody deserves a best friend. Even the wriggly ones!</BaileySays>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6">
        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className={`ink-box rounded-[2rem] bg-paper p-6 text-center ${i % 2 ? "tilt-right" : "tilt-left"}`}
            >
              <span className="font-display inline-flex h-14 w-14 items-center justify-center rounded-full border-4 border-border bg-sunshine text-3xl text-sunshine-foreground">
                {s.n}
              </span>
              <h3 className="mt-3 text-2xl text-primary">{s.title}</h3>
              <p className="mt-1 text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-14">
        <div className="ink-box rounded-[2.5rem] bg-paper p-8">
          <h2 className="text-3xl text-primary">Submit a dog</h2>
          {sent ? (
            <div className="mt-6 text-center">
              <p className="text-6xl">🐾</p>
              <p className="font-display mt-3 text-2xl text-primary">Thank you!</p>
              <p className="mt-2 text-muted-foreground">
                We&apos;ll be in touch within 3 working days.
              </p>
            </div>
          ) : (
            <form
              className="mt-5 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              {[
                { label: "Organisation name", type: "text" },
                { label: "Contact email", type: "email" },
                { label: "Dog's name", type: "text" },
                { label: "Town or city (UK)", type: "text" },
              ].map((f) => (
                <label key={f.label} className="block text-primary">
                  {f.label}
                  <input
                    required
                    type={f.type}
                    className="mt-1 w-full rounded-xl border-4 border-border bg-card px-3 py-2 text-base outline-none focus:border-magenta"
                  />
                </label>
              ))}
              <label className="block text-primary">
                Tell us about them
                <textarea
                  required
                  rows={4}
                  className="mt-1 w-full rounded-xl border-4 border-border bg-card px-3 py-2 text-base outline-none focus:border-magenta"
                />
              </label>
              <StickerButton className="w-full" color="magenta" size="lg" type="submit">
                💗 Send to Bailey&apos;s team
              </StickerButton>
            </form>
          )}
        </div>
      </section>
    </PageShell>
  );
}
