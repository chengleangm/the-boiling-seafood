import { SiteHeader } from "@/components/site-header";
import { OrderCatalog } from "@/components/order-catalog";
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
