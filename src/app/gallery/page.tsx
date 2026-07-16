import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
export const metadata: Metadata = {
  title: "Gallery | The Boiling Seafood",
  description: "Seafood feasts, bold sauces and memorable tables in Phnom Penh.",
};
const photos = [
  "seafood-feast.png",
  "restaurant-interior.png",
  "seafood-feast.png",
  "restaurant-interior.png",
  "seafood-feast.png",
  "restaurant-interior.png",
];
export default function Page() {
  return (
    <main>
      <SiteHeader />
      <section className="simple-page section-pad gallery-page">
        <p className="eyebrow">A taste of the table</p>
        <h1>
          GET MESSY.
          <br />
          MAKE MEMORIES.
        </h1>
        <div className="gallery-grid">
          {photos.map((p, i) => (
            <figure key={i} className={i === 0 || i === 5 ? "wide" : ""}>
              <Image
                src={`/images/${p}`}
                fill
                sizes="(max-width:600px) 100vw, 50vw"
                className="cover"
                alt={
                  i % 2
                    ? "Warm restaurant dining room"
                    : "Seafood boil with lobster, crab and shrimp"
                }
              />
              <figcaption>
                {i % 2 ? "Made for gathering" : "Freshly boiled. Boldly sauced."}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
