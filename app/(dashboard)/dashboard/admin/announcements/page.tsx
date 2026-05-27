import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { RBAC } from "@/lib/rbac"
import { AdminAnnouncementsClient } from "@/components/dashboard/admin-announcements-client"

export default async function AdminAnnouncementsPage() {
  const session = await auth()
  if (!session || !RBAC.canAccessAdminDashboard((session.user as any).role)) redirect("/dashboard")

  return <AdminAnnouncementsClient />
}
