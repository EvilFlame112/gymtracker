"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Exercise {
  id: string
  name: string
  duration: number
  caloriesBurned: number
}

export default function ExerciseLog() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [newExercise, setNewExercise] = useState({ name: "", duration: 0, caloriesBurned: 0 })

  useEffect(() => {
    fetchExercises()
  }, [])

  const fetchExercises = async () => {
    const response = await fetch("/api/exercise")
    const data = await response.json()
    setExercises(data)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewExercise((prev) => ({ ...prev, [name]: name === "name" ? value : Number(value) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch("/api/exercise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newExercise),
    })
    if (response.ok) {
      fetchExercises()
      setNewExercise({ name: "", duration: 0, caloriesBurned: 0 })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Exercise Log</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add Exercise</CardTitle>
          <CardDescription>Enter the details of your exercise</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              value={newExercise.name}
              onChange={handleInputChange}
              placeholder="Exercise name"
              required
            />
            <Input
              name="duration"
              type="number"
              value={newExercise.duration}
              onChange={handleInputChange}
              placeholder="Duration (minutes)"
              required
            />
            <Input
              name="caloriesBurned"
              type="number"
              value={newExercise.caloriesBurned}
              onChange={handleInputChange}
              placeholder="Calories burned"
              required
            />
            <Button type="submit">Add Exercise</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Today's Exercise Log</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exercise</TableHead>
                <TableHead>Duration (min)</TableHead>
                <TableHead>Calories Burned</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercises.map((exercise) => (
                <TableRow key={exercise.id}>
                  <TableCell>{exercise.name}</TableCell>
                  <TableCell>{exercise.duration}</TableCell>
                  <TableCell>{exercise.caloriesBurned}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

