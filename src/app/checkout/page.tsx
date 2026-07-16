import { SiteHeader } from "@/components/site-header";
import { CheckoutFlow } from "@/components/checkout-flow";
export default function Page() {
  return (
    <main>
      <SiteHeader />
      <section className="simple-page section-pad">
        <p className="eyebrow">Secure demo checkout</p>
        <h1>CHECKOUT</h1>
        <CheckoutFlow />
      </section>
    </main>
  );
}
