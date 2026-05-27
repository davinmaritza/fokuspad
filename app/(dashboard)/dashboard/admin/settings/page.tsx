import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { RBAC } from "@/lib/rbac"
import { AdminSettingsClient } from "@/components/dashboard/admin-settings-client"

export default async function AdminSettingsPage() {
  const session = await auth()
  if (!session || !RBAC.canAccessAdminDashboard((session.user as any).role)) redirect("/dashboard")

  const settings = await prisma.settings.findUnique({
    where: { id: 'global' }
  })

  return <AdminSettingsClient initialSettings={settings} />
}
