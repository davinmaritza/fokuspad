import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

// Upload Proof of Payment
export async function PUT(req: Request) {
  try {
    const session = await auth()
    const role = (session?.user as any)?.role
    const studentId = (session?.user as any)?.id

    if (!session || role !== "PARENT" || !studentId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id, proofFilename } = await req.json()

    if (!id || !proofFilename) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 })
    }

    // Verify bill belongs to student
    const bill = await prisma.billing.findFirst({
      where: { id, studentId }
    })

    if (!bill) {
      return NextResponse.json({ error: "Tagihan tidak ditemukan" }, { status: 404 })
    }

    const proofUrl = `https://bivafymwpctapaumpuhy.supabase.co/storage/v1/object/public/uploads/${proofFilename}`

    await prisma.billing.update({
      where: { id },
      data: {
        proofUrl,
        status: "PENDING" // Menunggu verifikasi admin
      }
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Billing update error:", error)
    return NextResponse.json(
      { error: "Terjadi kesalahan internal" },
      { status: 500 }
    )
  }
}
