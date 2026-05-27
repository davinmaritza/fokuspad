import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await auth()
    const role = (session?.user as any)?.role
    const userId = (session?.user as any)?.id
    
    // Only WAKASEK_HUBIN, SUPER_ADMIN, and ALUMNI can post jobs
    if (role !== "ALUMNI" && role !== "SUPER_ADMIN" && role !== "WAKASEK_HUBIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { title, company, location, type, description, link } = body

    if (!title || !company || !link) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 })
    }

    const job = await prisma.jobPosting.create({
      data: {
        title,
        company,
        location,
        type,
        description,
        link,
        postedById: userId
      }
    })

    return NextResponse.json(job)
  } catch (error) {
    console.error("Create job error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan internal" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth()
    const role = (session?.user as any)?.role
    const userId = (session?.user as any)?.id
    
    if (!role) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) return NextResponse.json({ error: "ID tidak valid" }, { status: 400 })

    const job = await prisma.jobPosting.findUnique({ where: { id } })
    if (!job) return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 })

    // Only WAKASEK_HUBIN, SUPER_ADMIN or the poster can delete
    if (role !== "SUPER_ADMIN" && role !== "WAKASEK_HUBIN" && job.postedById !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    await prisma.jobPosting.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete job error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan internal" }, { status: 500 })
  }
}
