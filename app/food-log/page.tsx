"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Food {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

export default function FoodLog() {
  const [foods, setFoods] = useState<Food[]>([])
  const [newFood, setNewFood] = useState({ name: "", calories: 0, protein: 0, carbs: 0, fat: 0 })

  useEffect(() => {
    fetchFoods()
  }, [])

  const fetchFoods = async () => {
    const response = await fetch("/api/food")
    const data = await response.json()
    setFoods(data)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewFood((prev) => ({ ...prev, [name]: name === "name" ? value : Number(value) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch("/api/food", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFood),
    })
    if (response.ok) {
      fetchFoods()
      setNewFood({ name: "", calories: 0, protein: 0, carbs: 0, fat: 0 })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Food Log</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add Food</CardTitle>
          <CardDescription>Enter the details of the food you've eaten</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="name" value={newFood.name} onChange={handleInputChange} placeholder="Food name" required />
            <Input
              name="calories"
              type="number"
              value={newFood.calories}
              onChange={handleInputChange}
              placeholder="Calories"
              required
            />
            <Input
              name="protein"
              type="number"
              value={newFood.protein}
              onChange={handleInputChange}
              placeholder="Protein (g)"
              required
            />
            <Input
              name="carbs"
              type="number"
              value={newFood.carbs}
              onChange={handleInputChange}
              placeholder="Carbs (g)"
              required
            />
            <Input
              name="fat"
              type="number"
              value={newFood.fat}
              onChange={handleInputChange}
              placeholder="Fat (g)"
              required
            />
            <Button type="submit">Add Food</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Today's Log</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Food</TableHead>
                <TableHead>Calories</TableHead>
                <TableHead>Protein</TableHead>
                <TableHead>Carbs</TableHead>
                <TableHead>Fat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {foods.map((food) => (
                <TableRow key={food.id}>
                  <TableCell>{food.name}</TableCell>
                  <TableCell>{food.calories}</TableCell>
                  <TableCell>{food.protein}g</TableCell>
                  <TableCell>{food.carbs}g</TableCell>
                  <TableCell>{food.fat}g</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

