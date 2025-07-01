"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FileText, Download, ThumbsUp, Star, Eye, Calendar } from "lucide-react"
import { useState, useEffect, useTransition } from "react"
import { useToast } from "@/hooks/use-toast"
import { getNotes, upvoteNote, bookmarkNote, downloadNote, type Note } from "@/app/actions/notes"

interface NotesBrowserProps {
  searchQuery: string
  selectedSubject: string
  selectedUniversity: string
  sortBy: string
}

export function NotesBrowser({ searchQuery, selectedSubject, selectedUniversity, sortBy }: NotesBrowserProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true)
      try {
        const fetchedNotes = await getNotes({
          search: searchQuery,
          subject: selectedSubject,
          university: selectedUniversity,
          sortBy: sortBy,
        })
        setNotes(fetchedNotes)
      } catch (error) {
        toast({
          title: "Error loading notes",
          description: "Failed to load notes. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [searchQuery, selectedSubject, selectedUniversity, sortBy, toast])

  const handleUpvote = (noteId: number) => {
    startTransition(async () => {
      try {
        await upvoteNote(noteId)
        // Optimistically update UI
        setNotes(
          notes.map((note) =>
            note.id === noteId
              ? {
                  ...note,
                  upvotes: note.is_upvoted ? note.upvotes - 1 : note.upvotes + 1,
                  is_upvoted: !note.is_upvoted,
                }
              : note,
          ),
        )
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update vote. Please try again.",
          variant: "destructive",
        })
      }
    })
  }

  const handleBookmark = (noteId: number) => {
    startTransition(async () => {
      try {
        await bookmarkNote(noteId)
        setNotes(notes.map((note) => (note.id === noteId ? { ...note, is_bookmarked: !note.is_bookmarked } : note)))
        toast({
          title: "Bookmark updated",
          description: "Note bookmark status has been updated.",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update bookmark. Please try again.",
          variant: "destructive",
        })
      }
    })
  }

  const handleDownload = (note: Note) => {
    startTransition(async () => {
      try {
        await downloadNote(note.id)
        setNotes(notes.map((n) => (n.id === note.id ? { ...n, downloads: n.downloads + 1 } : n)))
        toast({
          title: "Download started",
          description: `Downloading "${note.title}"...`,
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to download note. Please try again.",
          variant: "destructive",
        })
      }
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return `${Math.ceil(diffDays / 30)} months ago`
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="shadow-sm border-slate-200">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-24"></div>
                    <div className="h-3 bg-slate-200 rounded w-20"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-5 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-slate-600">Showing {notes.length} notes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {notes.map((note) => (
          <Card key={note.id} className="shadow-sm border-slate-200 hover:shadow-md transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
                      {note.author_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-slate-900">{note.author_name}</p>
                    <p className="text-sm text-slate-500">{note.university}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleBookmark(note.id)}
                  disabled={isPending}
                  className={`${
                    note.is_bookmarked
                      ? "text-yellow-600 bg-yellow-50 hover:bg-yellow-100"
                      : "text-slate-400 hover:text-yellow-600 hover:bg-yellow-50"
                  }`}
                >
                  <Star className={`h-4 w-4 ${note.is_bookmarked ? "fill-current" : ""}`} />
                </Button>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-900 mb-2 hover:text-blue-600 cursor-pointer transition-colors">
                  {note.title}
                </h3>
                <p className="text-slate-600 text-sm line-clamp-2 mb-3">{note.description}</p>

                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                    {note.subject}
                  </Badge>
                  <Badge variant="outline" className="text-slate-600">
                    {note.file_type} • {note.file_size}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {note.tags.slice(0, 4).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-slate-100 text-slate-700">
                      {tag}
                    </Badge>
                  ))}
                  {note.tags.length > 4 && (
                    <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700">
                      +{note.tags.length - 4} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-1 mb-4">
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
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {note.views.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    {note.downloads}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(note.created_at)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUpvote(note.id)}
                    disabled={isPending}
                    className={`${
                      note.is_upvoted
                        ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                        : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <ThumbsUp className={`h-4 w-4 mr-1 ${note.is_upvoted ? "fill-current" : ""}`} />
                    {note.upvotes}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDownload(note)}
                    disabled={isPending}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {notes.length === 0 && !loading && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No notes found</h3>
          <p className="text-slate-600">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  )
}
