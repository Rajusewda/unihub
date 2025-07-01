"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, ThumbsUp, Clock, Eye, Pin } from "lucide-react"
import { useState } from "react"

interface Discussion {
  id: number
  title: string
  content: string
  author: string
  authorInitials: string
  subject: string
  university: string
  replies: number
  upvotes: number
  views: number
  timeAgo: string
  tags: string[]
  isUpvoted: boolean
  isPinned: boolean
  lastActivity: string
}

const initialDiscussions: Discussion[] = [
  {
    id: 1,
    title: "Help with Calculus Integration by Parts",
    content:
      "I'm struggling with integration by parts problems, especially when dealing with logarithmic and exponential functions. Can someone explain the LIATE rule and provide some examples?",
    author: "Alex Thompson",
    authorInitials: "AT",
    subject: "Mathematics",
    university: "MIT",
    replies: 12,
    upvotes: 8,
    views: 245,
    timeAgo: "2 hours ago",
    lastActivity: "30 minutes ago",
    tags: ["calculus", "integration", "help", "liate-rule"],
    isUpvoted: false,
    isPinned: false,
  },
  {
    id: 2,
    title: "Best Resources for Organic Chemistry",
    content:
      "What are the best textbooks and online resources for learning organic chemistry reactions? I'm particularly interested in mechanism-focused materials.",
    author: "Maria Garcia",
    authorInitials: "MG",
    subject: "Chemistry",
    university: "Stanford",
    replies: 18,
    upvotes: 15,
    views: 567,
    timeAgo: "4 hours ago",
    lastActivity: "1 hour ago",
    tags: ["organic-chemistry", "resources", "textbooks", "mechanisms"],
    isUpvoted: true,
    isPinned: true,
  },
  {
    id: 3,
    title: "Data Structures Interview Prep Study Group",
    content:
      "Looking for study partners to practice data structures and algorithms for tech interviews. We can meet virtually and solve problems together.",
    author: "David Kim",
    authorInitials: "DK",
    subject: "Computer Science",
    university: "Berkeley",
    replies: 25,
    upvotes: 22,
    views: 892,
    timeAgo: "6 hours ago",
    lastActivity: "2 hours ago",
    tags: ["data-structures", "algorithms", "interview-prep", "study-group"],
    isUpvoted: true,
    isPinned: false,
  },
  {
    id: 4,
    title: "Quantum Mechanics Problem Set Solutions",
    content:
      "Has anyone worked through the quantum mechanics problem set from Chapter 3? I'm stuck on problems 3.15 and 3.18 dealing with the harmonic oscillator.",
    author: "Sarah Johnson",
    authorInitials: "SJ",
    subject: "Physics",
    university: "Caltech",
    replies: 7,
    upvotes: 5,
    views: 189,
    timeAgo: "8 hours ago",
    lastActivity: "3 hours ago",
    tags: ["quantum-mechanics", "problem-set", "harmonic-oscillator", "help"],
    isUpvoted: false,
    isPinned: false,
  },
  {
    id: 5,
    title: "Machine Learning Study Resources Compilation",
    content:
      "I've compiled a list of the best free resources for learning machine learning. Includes courses, books, and practical projects. What would you add to this list?",
    author: "Emma Wilson",
    authorInitials: "EW",
    subject: "Computer Science",
    university: "Stanford",
    replies: 34,
    upvotes: 45,
    views: 1234,
    timeAgo: "1 day ago",
    lastActivity: "4 hours ago",
    tags: ["machine-learning", "resources", "compilation", "free"],
    isUpvoted: false,
    isPinned: true,
  },
]

export function DiscussionList() {
  const [discussions, setDiscussions] = useState(initialDiscussions)

  const handleUpvote = (discussionId: number) => {
    setDiscussions(
      discussions.map((discussion) =>
        discussion.id === discussionId
          ? {
              ...discussion,
              upvotes: discussion.isUpvoted ? discussion.upvotes - 1 : discussion.upvotes + 1,
              isUpvoted: !discussion.isUpvoted,
            }
          : discussion,
      ),
    )
  }

  const sortedDiscussions = [...discussions].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
  })

  return (
    <div className="space-y-4">
      {sortedDiscussions.map((discussion) => (
        <Card
          key={discussion.id}
          className="shadow-sm border-slate-200 hover:shadow-md transition-all duration-200 cursor-pointer"
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-semibold">
                    {discussion.authorInitials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-slate-900">{discussion.author}</p>
                  <p className="text-sm text-slate-500">{discussion.university}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {discussion.isPinned && (
                  <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    <Pin className="h-3 w-3 mr-1" />
                    Pinned
                  </Badge>
                )}
                <div className="flex items-center gap-1 text-sm text-slate-500">
                  <Clock className="h-4 w-4" />
                  {discussion.timeAgo}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors mb-2">
                {discussion.title}
              </h3>
              <p className="text-slate-600 line-clamp-2 mb-3">{discussion.content}</p>

              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                  {discussion.subject}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {discussion.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {discussion.views}
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  {discussion.replies} replies
                </div>
                <span>Last activity: {discussion.lastActivity}</span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleUpvote(discussion.id)
                }}
                className={`${
                  discussion.isUpvoted
                    ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                    : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <ThumbsUp className={`h-4 w-4 mr-1 ${discussion.isUpvoted ? "fill-current" : ""}`} />
                {discussion.upvotes}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
