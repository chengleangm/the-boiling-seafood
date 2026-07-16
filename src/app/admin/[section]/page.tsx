import { notFound } from "next/navigation";
import { AdminDashboard } from "@/components/admin-dashboard";
const labels: { [key: string]: string } = {
  orders: "Orders",
  menu: "Menu",
  categories: "Categories",
  promotions: "Promotions",
  tables: "Table QR",
  payments: "Payments",
  reservations: "Reservations",
  customers: "Customers",
  reports: "Reports",
  gallery: "Gallery",
  content: "Website Content",
  settings: "Settings",
};
export default async function Page({ params }: PageProps<"/admin/[section]">) {
  const { section } = await params;
  const label = labels[section];
  if (!label) notFound();
  return <AdminDashboard initialTab={label} />;
}
