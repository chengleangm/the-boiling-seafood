import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { ContactDetails, ContactForm } from "@/components/public-forms";
export const metadata: Metadata = {
  title: "Contact & Location | The Boiling Seafood",
  description: "Find The Boiling Seafood in BKK1, Phnom Penh. Open daily 11am–11pm.",
};
export default function Page() {
  return (
    <main>
      <SiteHeader />
      <section className="content-hero contact-hero">
        <p className="eyebrow light">BKK1 · Phnom Penh</p>
        <h1>
          COME
          <br />
          HUNGRY.
        </h1>
        <p>Open daily · 11:00 AM–11:00 PM</p>
      </section>
      <section className="content-split section-pad">
        <div>
          <p className="eyebrow">Location & contact</p>
          <h2>
            FIND YOUR
            <br />
            NEXT FEAST.
          </h2>
          <ContactDetails />
          <div className="social-copy">
            Facebook · Instagram · Telegram <small>Demo social links</small>
          </div>
        </div>
        <ContactForm />
      </section>
      <section className="map-placeholder">
        <span>Map placeholder</span>
        <strong>#20 Street 302 · BKK1 · Phnom Penh</strong>
        <a href="https://maps.google.com" target="_blank" rel="noreferrer">
          Open demo map ↗
        </a>
      </section>
    </main>
  );
}
