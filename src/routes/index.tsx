import { createFileRoute } from "@tanstack/react-router";
import baileyHero from "@/assets/bailey-hero.png";
import bookCover from "@/assets/book-cover.jpg";
import farmImg from "@/assets/shelter-farm.jpg";
import { PageShell } from "@/components/site-chrome";
import {
  BadgeTray,
  BaileySays,
  PawDivider,
  SectionTitle,
  SpeechBubble,
  Star,
  StickerLink,
  useEarnBadge,
} from "@/components/bailey";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bailey's World — The Dog With No Chill" },
      {
        name: "description",
        content:
          "Hi, I'm Bailey! Bounce into my world: picture books, silly merch, UK dog adoption and the Shelter Farm. Games and colouring pages too!",
      },
      { property: "og:title", content: "Bailey's World — The Dog With No Chill" },
      {
        property: "og:description",
        content: "Books, merch, adoption and the Shelter Farm, hosted by one very excited dog.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  useEarnBadge("home");

  return (
    <PageShell>
      <section className="relative overflow-hidden px-6 pt-10 pb-16">
        <Star className="absolute top-16 left-8 h-10 w-10 text-sunshine" />
        <Star className="absolute top-40 right-12 h-14 w-14 text-orange" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="outlined-text text-6xl text-paper sm:text-7xl">
              <span className="tilt-left inline-block">The Dog</span>{" "}
              <span className="inline-block text-sunshine">With</span>{" "}
              <span className="tilt-right inline-block text-magenta">No Chill!</span>
            </h1>
            <SpeechBubble className="mt-10 max-w-md">
              <p className="font-display text-2xl">
                Hi, I&apos;m Bailey! I run, I bounce, I never ever sit still. Wanna come play?
              </p>
            </SpeechBubble>
            <div className="mt-12 flex flex-wrap gap-4">
              <StickerLink to="/book" color="magenta" size="lg">
                📖 Meet Bailey
              </StickerLink>
              <StickerLink to="/activities" color="sunshine" size="lg">
                🎾 Play a game
              </StickerLink>
            </div>
          </div>
          <img
            src={baileyHero}
            alt="Bailey the fluffy white dog bouncing with excitement"
            width={1024}
            height={1024}
            className="animate-bob mx-auto w-full max-w-md drop-shadow-2xl"
          />
        </div>
      </section>

      <div className="bg-grass py-16">
        <div className="mx-auto max-w-6xl px-6">
          <SectionTitle>Where do you want to go?</SectionTitle>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { to: "/book", icon: "📖", title: "Meet the Book", text: "Peek inside the story!" },
              { to: "/shop", icon: "🦴", title: "Bailey's Shop", text: "Books, toys and tees." },
              { to: "/adopt", icon: "💗", title: "Adopt a Dog", text: "For UK rescue teams." },
              { to: "/farm", icon: "🏡", title: "Shelter Farm", text: "Bailey's favourite place." },
            ].map((card, i) => (
              <a
                key={card.to}
                href={card.to}
                className={`ink-box block rounded-[2rem] bg-paper p-6 text-center transition-transform hover:-translate-y-2 hover:rotate-1 ${
                  i % 2 ? "tilt-right" : "tilt-left"
                }`}
              >
                <span className="text-6xl">{card.icon}</span>
                <h3 className="mt-3 text-2xl text-primary">{card.title}</h3>
                <p className="mt-1 text-muted-foreground">{card.text}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      <PawDivider />

      <section className="mx-auto grid max-w-5xl items-center gap-10 px-6 md:grid-cols-2">
        <img
          src={bookCover}
          alt="Cover of the picture book The Dog With No Chill"
          width={896}
          height={1152}
          loading="lazy"
          className="ink-box tilt-left mx-auto w-full max-w-xs rounded-[1.5rem]"
        />
        <div>
          <h2 className="outlined-text-sm text-5xl text-paper">A brand new book!</h2>
          <p className="mt-4 text-xl text-primary">
            Bailey chases a bee, wrecks the kitchen and hugs everybody. Twice.
          </p>
          <div className="mt-6">
            <BaileySays>
              I tried to be calm for a whole minute. It lasted three seconds!
            </BaileySays>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <StickerLink to="/book" color="teal">Flip through it</StickerLink>
            <StickerLink to="/shop" color="grass">Get a copy</StickerLink>
          </div>
        </div>
      </section>

      <PawDivider />

      <section className="mx-auto max-w-6xl px-6 pb-4">
        <div className="ink-box overflow-hidden rounded-[2.5rem] bg-paper">
          <img
            src={farmImg}
            alt="The Shelter Farm with a red barn, green hills and Bailey running"
            width={1280}
            height={768}
            loading="lazy"
            className="h-64 w-full object-cover sm:h-80"
          />
          <div className="p-8 text-center">
            <h2 className="text-4xl text-primary">Bailey visits the Shelter Farm 🐑</h2>
            <p className="mx-auto mt-3 max-w-xl text-xl text-muted-foreground">
              Big fields, wobbly lambs and a very muddy dog. Come and see!
            </p>
            <div className="mt-6">
              <StickerLink to="/farm" color="grass" size="lg">
                Visit the farm
              </StickerLink>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-14">
        <BadgeTray />
      </section>
    </PageShell>
  );
}
