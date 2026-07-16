import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { Tracking } from "@/components/tracking";
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
