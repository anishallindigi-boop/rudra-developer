import { connection } from "next/server";
import AdminShell from "@/components/admin/AdminShell";

export const instant = false;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await connection();
  return <AdminShell>{children}</AdminShell>;
}
