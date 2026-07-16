import type { Metadata } from "next";
import { AdminLogin } from "@/components/admin-login";
export const metadata: Metadata = {
  title: "Demo Admin Login | The Boiling Seafood",
  robots: { index: false, follow: false },
};
export default function Page() {
  return <AdminLogin />;
}
