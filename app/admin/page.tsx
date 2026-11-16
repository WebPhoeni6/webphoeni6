import { redirect } from "next/navigation";
import Dashboard from "@/components/admin/Dashboard";
import { isAdmin } from "@/lib/auth";
import { getContent } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  return <Dashboard initial={await getContent()} />;
}
