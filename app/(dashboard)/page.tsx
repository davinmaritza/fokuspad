import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { RBAC } from "@/lib/rbac"

export default async function DashboardRedirect() {
  const session = await auth()
  
  if (!session) {
    redirect("/login")
  }

  const role = (session.user as any)?.role

  if (RBAC.canAccessAdminDashboard(role)) {
    redirect("/dashboard/admin?v=2")
  }

  redirect("/dashboard")
}
