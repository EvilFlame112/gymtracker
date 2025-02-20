import Link from "next/link"
import { Home, Utensils, Activity, User } from "lucide-react"

export function MainNav() {
  return (
    <nav className="flex justify-between items-center p-4 bg-background border-b">
      <Link href="/" className="font-bold text-xl">
        FitTrack
      </Link>
      <div className="flex space-x-4">
        <Link href="/" className="flex items-center space-x-1">
          <Home className="h-4 w-4" />
          <span>Home</span>
        </Link>
        <Link href="/food-log" className="flex items-center space-x-1">
          <Utensils className="h-4 w-4" />
          <span>Food</span>
        </Link>
        <Link href="/exercise-log" className="flex items-center space-x-1">
          <Activity className="h-4 w-4" />
          <span>Exercise</span>
        </Link>
        <Link href="/profile" className="flex items-center space-x-1">
          <User className="h-4 w-4" />
          <span>Profile</span>
        </Link>
      </div>
    </nav>
  )
}

