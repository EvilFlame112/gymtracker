import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const exercises = await prisma.exercise.findMany()
    return NextResponse.json(exercises)
  } catch (error) {
    console.error("Error fetching exercises:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, duration, caloriesBurned } = body

    const newExercise = await prisma.exercise.create({
      data: {
        name,
        duration,
        caloriesBurned,
      },
    })

    return NextResponse.json(newExercise, { status: 201 })
  } catch (error) {
    console.error("Error creating exercise:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

