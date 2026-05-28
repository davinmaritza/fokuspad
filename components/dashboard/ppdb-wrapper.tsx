'use client'

import dynamic from 'next/dynamic'

const PpdbDashboardClient = dynamic(
  () => import('./ppdb-client').then((mod) => mod.PpdbDashboardClient),
  { ssr: false }
)

export default function PpdbDashboardWrapper(props: any) {
  return <PpdbDashboardClient {...props} />
}
