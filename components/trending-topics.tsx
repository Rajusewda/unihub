"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, MessageSquare, ThumbsUp, Eye, ArrowUp } from "lucide-react"
import { useState } from "react"

const initialTopics = [
  {
    id: 1,
    title: "Calculus Integration Techniques",
    subject: "Mathematics",
    university: "MIT",
    discussions: 45,
    upvotes: 128,
    views: 1250,
    trend: 15,
    isUpvoted: false,
  },
  {
    id: 2,
    title: "Organic Chemistry Reactions",
    subject: "Chemistry",
    university: "Stanford",
    discussions: 32,
    upvotes: 95,
    views: 890,
    trend: 12,
    isUpvoted: true,
  },
  {
    id: 3,
    title: "Data Structures & Algorithms",
    subject: "Computer Science",
    university: "Berkeley",
    discussions: 67,
    upvotes: 203,
    views: 2100,
    trend: 8,
    isUpvoted: false,
  },
  {
    id: 4,
    title: "Quantum Physics Fundamentals",
    subject: "Physics",
    university: "Caltech",
    discussions: 28,
    upvotes: 87,
    views: 650,
    trend: 6,
    isUpvoted: false,
  },
]

export function TrendingTopics() {
  const [topics, setTopics] = useState(initialTopics)

  const handleUpvote = (topicId: number) => {
    setTopics(
      topics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              upvotes: topic.isUpvoted ? topic.upvotes - 1 : topic.upvotes + 1,
              isUpvoted: !topic.isUpvoted,
            }
          : topic,
      ),
    )
  }

  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          Trending Topics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topics.map((topic, index) => (
          <div
            key={topic.id}
            className="p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-sm font-bold text-slate-600">
                  #{index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 cursor-pointer transition-colors">
                    {topic.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                      {topic.subject}
                    </Badge>
                    <span className="text-sm text-slate-500">• {topic.university}</span>
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
                <ArrowUp className="h-3 w-3 mr-1" />+{topic.trend}%
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {topic.views.toLocaleString()}
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  {topic.discussions}
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleUpvote(topic.id)}
                className={`flex items-center gap-1 ${
                  topic.isUpvoted
                    ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                    : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <ThumbsUp className={`h-4 w-4 ${topic.isUpvoted ? "fill-current" : ""}`} />
                {topic.upvotes}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
