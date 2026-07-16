import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TableOrdering } from "@/components/table-ordering";
export const metadata: Metadata = {
  title: "Dine-In Table Menu",
  description: "Order directly from your table at The Boiling Seafood.",
};
export default async function Page({ params }: PageProps<"/table/[number]">) {
  const { number } = await params;
  const table = Number(number);
  if (!Number.isInteger(table) || table < 1 || table > 999) notFound();
  return <TableOrdering table={table} />;
}
