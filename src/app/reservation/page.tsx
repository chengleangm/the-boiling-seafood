import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { ReservationForm } from "@/components/public-forms";
export const metadata: Metadata = {
  title: "Reserve a Table | The Boiling Seafood",
  description: "Request a table for a seafood feast in BKK1, Phnom Penh.",
};
export default function Page() {
  return (
    <main>
      <SiteHeader />
      <section className="content-hero">
        <p className="eyebrow light">Gather around</p>
        <h1>
          RESERVE
          <br />
          YOUR TABLE.
        </h1>
        <p>Dinner gets better when everyone is together.</p>
      </section>
      <section className="content-split section-pad">
        <div>
          <p className="eyebrow">Reservation inquiry</p>
          <h2>
            PLAN YOUR
            <br />
            SEAFOOD FEAST.
          </h2>
          <p>
            Open daily from 11:00 AM to 11:00 PM. For this interactive demo, requests are confirmed
            on screen only.
          </p>
        </div>
        <ReservationForm />
      </section>
    </main>
  );
}
