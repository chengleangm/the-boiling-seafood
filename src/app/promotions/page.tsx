import { SiteHeader } from "@/components/site-header";
const offers = [
  {
    tag: "WEEKDAY FEAST",
    title: "20% OFF SEAFOOD BOILS",
    copy: "Monday to Thursday, 2–5pm. Use code BOIL20.",
    code: "BOIL20",
  },
  {
    tag: "FAMILY TABLE",
    title: "FREE CAJUN FRIES",
    copy: "With any Family Ocean Feast order.",
    code: "FAMILY",
  },
  {
    tag: "PICKUP SPECIAL",
    title: "$5 OFF $50",
    copy: "Order ahead and collect from BKK1.",
    code: "PICKUP5",
  },
];
export default function Page() {
  return (
    <main>
      <SiteHeader />
      <section className="simple-page section-pad promos">
        <p className="eyebrow">Current offers</p>
        <h1>
          MORE FEAST.
          <br />
          MORE JOY.
        </h1>
        <div>
          {offers.map((o, i) => (
            <article key={o.code} className={i === 0 ? "featured" : ""}>
              <span>{o.tag}</span>
              <h2>{o.title}</h2>
              <p>{o.copy}</p>
              <code>{o.code}</code>
              <a className="red-button" href="/order">
                Order with offer
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
