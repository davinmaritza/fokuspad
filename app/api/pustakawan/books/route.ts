import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { RBAC } from "@/lib/rbac"

export async function POST(req: Request) {
  try {
    const session = await auth()
    const role = (session?.user as any)?.role
    
    if (role !== "PUSTAKAWAN" && role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { title, author, isbn, stock } = body

    if (!title || !author) {
      return NextResponse.json({ error: "Judul dan pengarang wajib diisi" }, { status: 400 })
    }

    const book = await prisma.book.create({
      data: {
        title,
        author,
        isbn,
        stock: Number(stock) || 1
      }
    })

    return NextResponse.json(book)
  } catch (error) {
    console.error("Create book error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan internal" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth()
    const role = (session?.user as any)?.role
    
    if (role !== "PUSTAKAWAN" && role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) return NextResponse.json({ error: "ID buku tidak valid" }, { status: 400 })

    await prisma.book.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete book error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan internal" }, { status: 500 })
  }
}
