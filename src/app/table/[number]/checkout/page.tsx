import { CheckoutFlow } from "@/components/checkout-flow";
export default async function Page({ params }: PageProps<"/table/[number]/checkout">) {
  const { number } = await params;
  return (
    <main>
      <div className="table-bar">
        <b>THE BOILING SEAFOOD</b>
        <span>Table {number} checkout</span>
      </div>
      <section className="simple-page section-pad">
        <h1>TABLE {number} ORDER</h1>
        <CheckoutFlow table={Number(number)} />
      </section>
    </main>
  );
}
