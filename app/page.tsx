import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Utensils, User } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calories Remaining</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <Progress value={33} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Goal: 2,000 | Consumed: 766</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Steps</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7,543</div>
            <Progress value={75} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Goal: 10,000</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Water</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v6m0 0v14m0-14l7 3-7 3-7-3 7-3z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4 / 8</div>
            <Progress value={50} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Goal: 8 glasses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weight</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">165 lbs</div>
            <p className="text-xs text-muted-foreground mt-2">Goal: 150 lbs</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="nutrition" className="w-full">
          <TabsList>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="nutrition">
            <Card>
              <CardHeader>
                <CardTitle>Nutrition Overview</CardTitle>
                <CardDescription>Your macronutrient breakdown for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-1/4">Protein</div>
                    <div className="w-3/4">
                      <Progress value={60} className="h-2" />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1/4">Carbs</div>
                    <div className="w-3/4">
                      <Progress value={40} className="h-2" />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1/4">Fat</div>
                    <div className="w-3/4">
                      <Progress value={20} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="/food-log">Log Food</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Activity Summary</CardTitle>
                <CardDescription>Your activity for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Steps</span>
                    <span>7,543 / 10,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Active Minutes</span>
                    <span>45 / 60</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Calories Burned</span>
                    <span>320</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="/exercise-log">Log Exercise</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

