import type { Metadata } from "next";
import { InhouseMenu } from "@/components/inhouse-menu";

export const metadata: Metadata = {
  title: "In-House Menu",
  description: "Browse The Boiling Seafood menu while dining in the restaurant.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <InhouseMenu />;
}
