"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, MessageSquare, GraduationCap, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"

interface Stats {
  totalNotes: number
  activeUsers: number
  totalDiscussions: number
  totalUniversities: number
}

export function QuickStats() {
  const [stats, setStats] = useState<Stats>({
    totalNotes: 0,
    activeUsers: 0,
    totalDiscussions: 0,
    totalUniversities: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // In a real app, you'd call a server action or API route
        // For now, we'll use mock data that updates
        const mockStats = {
          totalNotes: Math.floor(Math.random() * 1000) + 12000,
          activeUsers: Math.floor(Math.random() * 500) + 8500,
          totalDiscussions: Math.floor(Math.random() * 200) + 3200,
          totalUniversities: Math.floor(Math.random() * 10) + 240,
        }
        setStats(mockStats)
      } catch (error) {
        console.error("Error fetching stats:", error)
      }
    }

    fetchStats()
    // Update stats every 30 seconds
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const statsData = [
    {
      title: "Total Notes",
      value: stats.totalNotes.toLocaleString(),
      change: "+12%",
      changeValue: "+1,234",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Active Users",
      value: stats.activeUsers.toLocaleString(),
      change: "+8%",
      changeValue: "+672",
      icon: Users,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      title: "Discussions",
      value: stats.totalDiscussions.toLocaleString(),
      change: "+15%",
      changeValue: "+456",
      icon: MessageSquare,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Universities",
      value: stats.totalUniversities.toLocaleString(),
      change: "+3%",
      changeValue: "+7",
      icon: GraduationCap,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat) => (
        <Card key={stat.title} className="shadow-sm border-slate-200 hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-600">{stat.change}</span>
                  </div>
                  <span className="text-sm text-slate-500">{stat.changeValue} this month</span>
                </div>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                <div className={`w-8 h-8 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
