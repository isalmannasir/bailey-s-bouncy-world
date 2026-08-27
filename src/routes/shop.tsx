import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import baileyShop from "@/assets/bailey-shop.png";
import bookCover from "@/assets/book-cover.jpg";
import { PageShell } from "@/components/site-chrome";
import { SectionTitle, StickerButton, useEarnBadge } from "@/components/bailey";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Bailey's Shop — Books, Toys & Tees" },
      {
        name: "description",
        content:
          "Shop The Dog With No Chill picture books, plush Bailey, t-shirts and sticker packs. Simple UK checkout for grown-ups.",
      },
      { property: "og:title", content: "Bailey's Shop — Books, Toys & Tees" },
      {
        property: "og:description",
        content: "Books, plush toys, tees and stickers from Bailey's World.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

type Product = { id: string; name: string; price: number; emoji: string; blurb: string };

const products: Product[] = [
  { id: "book1", name: "The Dog With No Chill (Hardback)", price: 12.99, emoji: "📕", blurb: "32 bouncy pages." },
  { id: "plush", name: "Plush Bailey", price: 19.99, emoji: "🧸", blurb: "Extra fluffy. Zero chill." },
  { id: "tee", name: "No Chill Kids' T-Shirt", price: 14.5, emoji: "👕", blurb: "Ages 3–10." },
  { id: "stickers", name: "Paw Print Sticker Pack", price: 4.99, emoji: "✨", blurb: "40 shiny stickers." },
  { id: "mug", name: "Grown-Up Coffee Mug", price: 11.0, emoji: "☕", blurb: "For tired dog parents." },
  { id: "bundle", name: "Bailey Bundle", price: 29.99, emoji: "🎁", blurb: "Book + plush + stickers." },
];

function ShopPage() {
  useEarnBadge("shop");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [stage, setStage] = useState<"shop" | "details" | "done">("shop");

  const lines = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({ product: products.find((p) => p.id === id)!, qty }))
        .filter((l) => l.qty > 0),
    [cart],
  );
  const total = lines.reduce((s, l) => s + l.product.price * l.qty, 0);

  const add = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const remove = (id: string) =>
    setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) - 1) }));

  return (
    <PageShell>
      <section className="px-6 py-12">
        <SectionTitle>Bailey&apos;s Shop</SectionTitle>
        <img
          src={baileyShop}
          alt="Bailey holding a shopping bag"
          width={768}
          height={768}
          className="animate-bob mx-auto mt-6 w-40"
        />

        <div className="mx-auto mt-10 grid max-w-6xl gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="grid gap-6 sm:grid-cols-2">
            {products.map((p) => (
              <article key={p.id} className="ink-box rounded-[2rem] bg-paper p-6">
                {p.id === "book1" ? (
                  <img
                    src={bookCover}
                    alt="The Dog With No Chill hardback cover"
                    width={896}
                    height={1152}
                    loading="lazy"
                    className="mx-auto h-40 w-auto rounded-xl border-4 border-border object-cover"
                  />
                ) : (
                  <div className="flex h-40 items-center justify-center rounded-xl border-4 border-dashed border-teal text-7xl">
                    {p.emoji}
                  </div>
                )}
                <h3 className="mt-4 text-2xl text-primary">{p.name}</h3>
                <p className="text-muted-foreground">{p.blurb}</p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="font-display text-2xl text-primary">£{p.price.toFixed(2)}</span>
                  <StickerButton color="magenta" onClick={() => add(p.id)}>
                    Add to cart
                  </StickerButton>
                </div>
              </article>
            ))}
          </div>

          <aside className="ink-box h-fit rounded-[2rem] bg-paper p-6 lg:sticky lg:top-28">
            <h2 className="text-3xl text-primary">🛒 Your basket</h2>
            {stage === "done" ? (
              <div className="mt-6 text-center">
                <p className="text-6xl">🎉</p>
                <p className="font-display mt-3 text-2xl text-primary">Order placed!</p>
                <p className="mt-2 text-muted-foreground">
                  A confirmation email is on its way. Bailey is already wagging.
                </p>
                <StickerButton
                  className="mt-5"
                  color="grass"
                  onClick={() => {
                    setCart({});
                    setStage("shop");
                  }}
                >
                  Keep shopping
                </StickerButton>
              </div>
            ) : lines.length === 0 ? (
              <p className="mt-4 text-muted-foreground">
                Empty! Bailey ate the receipts. Add something fun.
              </p>
            ) : (
              <>
                <ul className="mt-4 space-y-3">
                  {lines.map((l) => (
                    <li key={l.product.id} className="flex items-center justify-between gap-3">
                      <span className="text-primary">
                        {l.product.emoji} {l.product.name}
                      </span>
                      <span className="flex items-center gap-2">
                        <button
                          onClick={() => remove(l.product.id)}
                          aria-label={`Remove one ${l.product.name}`}
                          className="font-display h-8 w-8 rounded-full border-4 border-border bg-muted text-primary"
                        >
                          −
                        </button>
                        <span className="font-display text-primary">{l.qty}</span>
                        <button
                          onClick={() => add(l.product.id)}
                          aria-label={`Add one ${l.product.name}`}
                          className="font-display h-8 w-8 rounded-full border-4 border-border bg-sunshine text-primary"
                        >
                          +
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="font-display mt-5 flex justify-between text-2xl text-primary">
                  <span>Total</span>
                  <span>£{total.toFixed(2)}</span>
                </p>
                {stage === "shop" ? (
                  <StickerButton
                    className="mt-5 w-full"
                    color="grass"
                    size="lg"
                    onClick={() => setStage("details")}
                  >
                    Checkout
                  </StickerButton>
                ) : (
                  <form
                    className="mt-5 space-y-3"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setStage("done");
                    }}
                  >
                    {[
                      { label: "Grown-up name", type: "text", auto: "name" },
                      { label: "Email", type: "email", auto: "email" },
                      { label: "Delivery address", type: "text", auto: "street-address" },
                      { label: "Postcode", type: "text", auto: "postal-code" },
                    ].map((f) => (
                      <label key={f.label} className="block text-sm text-primary">
                        {f.label}
                        <input
                          required
                          type={f.type}
                          autoComplete={f.auto}
                          className="mt-1 w-full rounded-xl border-4 border-border bg-card px-3 py-2 text-base outline-none focus:border-magenta"
                        />
                      </label>
                    ))}
                    <p className="text-xs text-muted-foreground">
                      Secure UK checkout. Card details are collected on the payment step.
                    </p>
                    <StickerButton className="w-full" color="magenta" size="lg" type="submit">
                      Pay £{total.toFixed(2)}
                    </StickerButton>
                  </form>
                )}
              </>
            )}
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
