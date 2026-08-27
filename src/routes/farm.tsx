import { createFileRoute } from "@tanstack/react-router";
import farmImg from "@/assets/shelter-farm.jpg";
import baileyHero from "@/assets/bailey-hero.png";
import { PageShell } from "@/components/site-chrome";
import {
  BaileySays,
  PawDivider,
  SectionTitle,
  StickerLink,
  useEarnBadge,
} from "@/components/bailey";

export const Route = createFileRoute("/farm")({
  head: () => ({
    meta: [
      { title: "The Shelter Farm — Bailey's World" },
      {
        name: "description",
        content:
          "Meet the animals at Bailey's Shelter Farm: wobbly lambs, bossy chickens and one very muddy dog. A story visit for kids.",
      },
      { property: "og:title", content: "The Shelter Farm — Bailey's World" },
      {
        property: "og:description",
        content: "Bailey visits the Shelter Farm — lambs, chickens, mud and mayhem.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FarmPage,
});

const story = [
  { emoji: "🚗", text: "Bailey got in the car. Bailey sang the whole way. Badly." },
  { emoji: "🐑", text: "The lambs were wobbly. Bailey tried to herd them. They herded her." },
  { emoji: "🐓", text: "A chicken stared at Bailey. Bailey blinked first." },
  { emoji: "💦", text: "Then came the puddle. Then came the bath. Woof!" },
];

function FarmPage() {
  useEarnBadge("farm");

  return (
    <PageShell>
      <section className="px-6 py-12">
        <SectionTitle>The Shelter Farm</SectionTitle>
        <div className="mx-auto mt-8 max-w-5xl">
          <img
            src={farmImg}
            alt="Red barn on green hills with sheep, chickens and Bailey running"
            width={1280}
            height={768}
            className="ink-box w-full rounded-[2.5rem] object-cover"
          />
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-2xl text-primary">
          A big green place where rescued animals rest, munch and make new friends.
        </p>
      </section>

      <PawDivider />

      <section className="mx-auto max-w-4xl px-6">
        <h2 className="outlined-text-sm text-center text-4xl text-paper">
          Bailey visits the farm
        </h2>
        <div className="mt-8 space-y-6">
          {story.map((s, i) => (
            <div
              key={s.text}
              className={`ink-box flex items-center gap-5 rounded-[2rem] bg-paper p-6 ${
                i % 2 ? "sm:ml-12" : "sm:mr-12"
              }`}
            >
              <span className="text-5xl">{s.emoji}</span>
              <p className="font-display text-2xl text-primary">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <BaileySays>Mud is basically a bath with extra flavour.</BaileySays>
        </div>
      </section>

      <section className="px-6 py-14 text-center">
        <img
          src={baileyHero}
          alt="Bailey waving goodbye from the farm"
          width={1024}
          height={1024}
          loading="lazy"
          className="animate-bob mx-auto w-40"
        />
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <StickerLink to="/adopt" color="magenta" size="lg">
            💗 Help a farm friend
          </StickerLink>
          <StickerLink to="/activities" color="sunshine" size="lg">
            🎨 Fun zone
          </StickerLink>
        </div>
      </section>
    </PageShell>
  );
}
