import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await auth()
    const role = (session?.user as any)?.role
    
    if (role !== "PETUGAS_UKS" && role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { name, stock, unit } = body

    if (!name) {
      return NextResponse.json({ error: "Nama obat wajib diisi" }, { status: 400 })
    }

    const item = await prisma.medicalInventory.create({
      data: {
        name,
        stock: Number(stock) || 0,
        unit: unit || "Tablet"
      }
    })

    return NextResponse.json(item)
  } catch (error) {
    console.error("Create inventory error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan internal" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth()
    const role = (session?.user as any)?.role
    
    if (role !== "PETUGAS_UKS" && role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) return NextResponse.json({ error: "ID item tidak valid" }, { status: 400 })

    await prisma.medicalInventory.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete inventory error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan internal" }, { status: 500 })
  }
}
