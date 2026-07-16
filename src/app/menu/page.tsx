import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { OrderCatalog } from "@/components/order-catalog";
export const metadata: Metadata = {
  title: "Digital Menu",
  description:
    "Browse more than 20 seafood boils, crab, shrimp, lobster, sides, drinks and desserts.",
};
export default function Page() {
  return (
    <main>
      <SiteHeader />
      <section className="order-page section-pad">
        <OrderCatalog />
      </section>
    </main>
  );
}
