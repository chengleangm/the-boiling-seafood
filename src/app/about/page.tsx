import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
export const metadata: Metadata = {
  title: "Our Story | The Boiling Seafood",
  description: "Meet The Boiling Seafood and our generous approach to bold Cajun seafood.",
};
export default function Page() {
  return (
    <main>
      <SiteHeader />
      <section className="content-hero about-hero">
        <p className="eyebrow light">Phnom Penh · Est. 2026</p>
        <h1>
          BOLD FLAVOUR.
          <br />
          OPEN TABLES.
        </h1>
      </section>
      <section className="content-split section-pad">
        <div>
          <p className="eyebrow">Our story</p>
          <h2>
            FROM THE COAST
            <br />
            TO THE CAPITAL.
          </h2>
        </div>
        <div className="editorial-copy">
          <p>
            The Boiling Seafood was imagined around one simple idea: exceptional seafood should feel
            generous, energetic and made for sharing.
          </p>
          <p>
            Every boil is cooked to order with quality catch, fresh ingredients and sauces full of
            character. The room is warm, the portions are generous, and getting your hands messy is
            encouraged.
          </p>
        </div>
      </section>
      <section className="about-image">
        <Image
          src="/images/restaurant-interior.png"
          alt="Warm dining room at The Boiling Seafood"
          fill
          sizes="100vw"
          className="cover"
        />
      </section>
      <section className="values">
        <article>
          <span>01</span>
          <h3>Fresh first</h3>
          <p>Quality seafood, prepared to order.</p>
        </article>
        <article>
          <span>02</span>
          <h3>Flavor forward</h3>
          <p>House sauces with real personality.</p>
        </article>
        <article>
          <span>03</span>
          <h3>Made to share</h3>
          <p>Generous tables and warm hospitality.</p>
        </article>
      </section>
    </main>
  );
}
