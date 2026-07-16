import { Suspense } from "react";
import { Confirmation } from "@/components/confirmation";
export default function Page() {
  return (
    <main className="confirm-page">
      <Suspense>
        <Confirmation />
      </Suspense>
    </main>
  );
}
