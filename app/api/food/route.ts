import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const foods = await prisma.food.findMany()
    return NextResponse.json(foods)
  } catch (error) {
    console.error("Error fetching foods:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, calories, protein, carbs, fat } = body

    const newFood = await prisma.food.create({
      data: {
        name,
        calories,
        protein,
        carbs,
        fat,
      },
    })

    return NextResponse.json(newFood, { status: 201 })
  } catch (error) {
    console.error("Error creating food:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

