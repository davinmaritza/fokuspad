import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await auth()
    const role = (session?.user as any)?.role
    
    if (role !== "PUSTAKAWAN" && role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { bookId, studentId, dueDate } = body

    if (!bookId || !studentId || !dueDate) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 })
    }

    const book = await prisma.book.findUnique({ where: { id: bookId } })
    if (!book || book.stock <= 0) {
      return NextResponse.json({ error: "Stok buku habis" }, { status: 400 })
    }

    // Use transaction to create circulation and decrease book stock
    const circulation = await prisma.$transaction(async (tx) => {
      const circ = await tx.bookCirculation.create({
        data: {
          bookId,
          studentId,
          dueDate: new Date(dueDate),
          status: "BORROWED"
        },
        include: {
          book: true,
          student: { select: { name: true, nis: true, email: true } }
        }
      })

      await tx.book.update({
        where: { id: bookId },
        data: { stock: { decrement: 1 } }
      })

      return circ
    })

    return NextResponse.json({ circulation })
  } catch (error) {
    console.error("Create circulation error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan internal" }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth()
    const role = (session?.user as any)?.role
    
    if (role !== "PUSTAKAWAN" && role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) return NextResponse.json({ error: "ID peminjaman tidak valid" }, { status: 400 })

    const circulation = await prisma.bookCirculation.findUnique({ where: { id } })
    if (!circulation) return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 })
    if (circulation.status === "RETURNED") return NextResponse.json({ error: "Sudah dikembalikan" }, { status: 400 })

    await prisma.$transaction(async (tx) => {
      await tx.bookCirculation.update({
        where: { id },
        data: {
          status: "RETURNED",
          returnDate: new Date()
        }
      })

      await tx.book.update({
        where: { id: circulation.bookId },
        data: { stock: { increment: 1 } }
      })
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Return book error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan internal" }, { status: 500 })
  }
}
