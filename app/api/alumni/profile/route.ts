import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await auth()
    const role = (session?.user as any)?.role
    const userId = (session?.user as any)?.id
    
    if (role !== "ALUMNI" && role !== "SUPER_ADMIN" && role !== "WAKASEK_HUBIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { graduationYear, status, company, position, university, major } = body

    const profile = await prisma.alumniProfile.upsert({
      where: { userId },
      update: {
        graduationYear: Number(graduationYear),
        status,
        company,
        position,
        university,
        major
      },
      create: {
        userId,
        graduationYear: Number(graduationYear),
        status,
        company,
        position,
        university,
        major
      }
    })

    return NextResponse.json(profile)
  } catch (error) {
    console.error("Update profile error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan internal" }, { status: 500 })
  }
}
