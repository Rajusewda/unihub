"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Download, ThumbsUp, MessageSquare, Star } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const initialNotes = [
  {
    id: 1,
    title: "Linear Algebra Cheat Sheet",
    subject: "Mathematics",
    university: "MIT",
    author: "Sarah Chen",
    uploadDate: "2 hours ago",
    downloads: 45,
    upvotes: 23,
    comments: 8,
    rating: 4.8,
    tags: ["linear-algebra", "matrices", "vectors"],
    isUpvoted: false,
    isBookmarked: false,
  },
  {
    id: 2,
    title: "React Hooks Complete Guide",
    subject: "Computer Science",
    university: "Stanford",
    author: "Mike Johnson",
    uploadDate: "5 hours ago",
    downloads: 67,
    upvotes: 34,
    comments: 12,
    rating: 4.9,
    tags: ["react", "hooks", "javascript"],
    isUpvoted: true,
    isBookmarked: true,
  },
  {
    id: 3,
    title: "Thermodynamics Laws Summary",
    subject: "Physics",
    university: "Caltech",
    author: "Emma Wilson",
    uploadDate: "1 day ago",
    downloads: 89,
    upvotes: 56,
    comments: 15,
    rating: 4.7,
    tags: ["thermodynamics", "physics", "laws"],
    isUpvoted: false,
    isBookmarked: false,
  },
]

export function RecentNotes() {
  const [notes, setNotes] = useState(initialNotes)
  const { toast } = useToast()

  const handleUpvote = (noteId: number) => {
    setNotes(
      notes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              upvotes: note.isUpvoted ? note.upvotes - 1 : note.upvotes + 1,
              isUpvoted: !note.isUpvoted,
            }
          : note,
      ),
    )
  }

  const handleBookmark = (noteId: number) => {
    setNotes(notes.map((note) => (note.id === noteId ? { ...note, isBookmarked: !note.isBookmarked } : note)))
    toast({
      title: "Bookmark updated",
      description: "Note has been added to your bookmarks.",
    })
  }

  const handleDownload = (noteTitle: string) => {
    toast({
      title: "Download started",
      description: `Downloading "${noteTitle}"...`,
    })
  }

  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <FileText className="h-4 w-4 text-white" />
          </div>
          Recent Notes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all duration-200"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors">
                  {note.title}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-sm text-slate-600">
                  <span>{note.subject}</span>
                  <span>•</span>
                  <span>{note.university}</span>
                  <span>•</span>
                  <span>by {note.author}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleBookmark(note.id)}
                  className={`h-8 w-8 ${
                    note.isBookmarked
                      ? "text-yellow-600 bg-yellow-50 hover:bg-yellow-100"
                      : "text-slate-400 hover:text-yellow-600 hover:bg-yellow-50"
                  }`}
                >
                  <Star className={`h-4 w-4 ${note.isBookmarked ? "fill-current" : ""}`} />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(note.rating) ? "text-yellow-400 fill-current" : "text-slate-300"
                  }`}
                />
              ))}
              <span className="text-sm text-slate-600 ml-1">({note.rating})</span>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {note.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">{note.uploadDate}</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    {note.downloads}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    {note.comments}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUpvote(note.id)}
                    className={`${
                      note.isUpvoted
                        ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                        : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <ThumbsUp className={`h-4 w-4 mr-1 ${note.isUpvoted ? "fill-current" : ""}`} />
                    {note.upvotes}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDownload(note.title)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
