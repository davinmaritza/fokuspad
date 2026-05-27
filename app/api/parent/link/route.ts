import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session || (session.user as any).role !== "PARENT") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { nis, parentPin } = body

    if (!nis || !parentPin) {
      return new NextResponse("NIS dan PIN diperlukan", { status: 400 })
    }

    const student = await prisma.user.findUnique({
      where: { nis }
    })

    if (!student || student.role !== "STUDENT") {
      return new NextResponse("Siswa tidak ditemukan", { status: 404 })
    }

    if (student.parentPin !== parentPin) {
      return new NextResponse("PIN Orang Tua tidak valid", { status: 403 })
    }

    // Link the student to this parent
    await prisma.user.update({
      where: { id: student.id },
      data: { parentId: (session.user as any).id }
    })

    return NextResponse.json({ message: "Berhasil menautkan akun siswa" })
  } catch (error) {
    console.error("[PARENT_LINK_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
