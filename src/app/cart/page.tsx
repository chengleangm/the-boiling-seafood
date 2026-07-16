import { SiteHeader } from "@/components/site-header";
import { CartPanel } from "@/components/order-ui";
export default function Page() {
  return (
    <main>
      <SiteHeader />
      <section className="simple-page section-pad">
        <p className="eyebrow">Your feast</p>
        <h1>SHOPPING CART</h1>
        <CartPanel />
      </section>
    </main>
  );
}
