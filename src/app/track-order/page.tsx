import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { Tracking } from "@/components/tracking";
export const metadata: Metadata = {
  title: "Track Order | The Boiling Seafood",
  description: "Track the progress of your demo seafood order.",
};
export default function Page() {
  return (
    <main>
      <SiteHeader />
      <section className="simple-page section-pad">
        <Suspense>
          <Tracking />
        </Suspense>
      </section>
    </main>
  );
}
