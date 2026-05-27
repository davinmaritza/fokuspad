import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await auth()
    
    // Only PARENT role can access this
    const role = (session?.user as any)?.role
    const studentId = (session?.user as any)?.id

    if (!session || role !== "PARENT" || !studentId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { pin } = await req.json()

    if (!pin || pin.length < 6) {
      return NextResponse.json({ error: "PIN tidak valid" }, { status: 400 })
    }

    if (pin === "123456") {
      return NextResponse.json({ error: "PIN tidak boleh sama dengan PIN bawaan" }, { status: 400 })
    }

    // Update parentPin for the student
    await prisma.user.update({
      where: { id: studentId },
      data: { parentPin: pin }
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Change PIN error:", error)
    return NextResponse.json(
      { error: "Terjadi kesalahan internal" },
      { status: 500 }
    )
  }
}
