import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await auth()
    const role = (session?.user as any)?.role
    const userId = (session?.user as any)?.id
    
    if (role !== "PETUGAS_UKS" && role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { studentId, medicineId, complaint, actionTaken } = body

    if (!studentId || !complaint || !actionTaken) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 })
    }

    if (medicineId) {
      const medicine = await prisma.medicalInventory.findUnique({ where: { id: medicineId } })
      if (!medicine || medicine.stock <= 0) {
        return NextResponse.json({ error: "Stok obat habis" }, { status: 400 })
      }
    }

    const record = await prisma.$transaction(async (tx) => {
      const rec = await tx.medicalRecord.create({
        data: {
          studentId,
          handledById: userId,
          medicineId,
          complaint,
          actionTaken
        },
        include: {
          student: { select: { name: true, nis: true, class: { select: { name: true } } } },
          handledBy: { select: { name: true } },
          medicine: true
        }
      })

      if (medicineId) {
        await tx.medicalInventory.update({
          where: { id: medicineId },
          data: { stock: { decrement: 1 } }
        })
      }

      return rec
    })

    return NextResponse.json({ record })
  } catch (error) {
    console.error("Create record error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan internal" }, { status: 500 })
  }
}
