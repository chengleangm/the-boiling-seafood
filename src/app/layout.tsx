import type { Metadata } from "next";
import "./globals.css";
import { MotionProvider } from "@/components/motion-provider";
import { DemoStore } from "@/components/demo-store";
import { SiteFooter } from "@/components/site-footer";
export const metadata: Metadata = {
  metadataBase: new URL("https://theboilingseafood.demo"),
  title: {
    default: "The Boiling Seafood | Fresh Seafood in Phnom Penh",
    template: "%s · The Boiling Seafood",
  },
  description:
    "Fresh Cajun seafood boils in Phnom Penh. Order delivery, pickup, or dine in with table QR.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "The Boiling Seafood",
    description: "Fresh seafood. Bold flavour. Unforgettable dining.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/seafood-feast.png",
        width: 1200,
        height: 630,
        alt: "The Boiling Seafood signature feast",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};
const restaurant = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "The Boiling Seafood",
  image: "https://theboilingseafood.demo/images/seafood-feast.png",
  servesCuisine: ["Seafood", "Cajun"],
  telephone: "+85561798383",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "#20 Street 302, BKK1",
    addressLocality: "Phnom Penh",
    addressCountry: "KH",
  },
  openingHours: "Mo-Su 11:00-23:00",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DemoStore>
          <MotionProvider>{children}</MotionProvider>
          <SiteFooter />
        </DemoStore>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurant) }}
        />
      </body>
    </html>
  );
}
