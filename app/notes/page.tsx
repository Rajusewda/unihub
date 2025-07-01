"use client"

import { NotesBrowser } from "@/components/notes-browser"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SortAsc, Filter } from "lucide-react"
import { useState } from "react"

const subjects = [
  { value: "all", label: "All Subjects" },
  { value: "computer-science", label: "Computer Science" },
  { value: "electronics-communication", label: "Electronics & Communication" },
  { value: "mechanical-engineering", label: "Mechanical Engineering" },
  { value: "civil-engineering", label: "Civil Engineering" },
  { value: "electrical-engineering", label: "Electrical Engineering" },
  { value: "mathematics", label: "Mathematics" },
  { value: "physics", label: "Physics" },
  { value: "chemistry", label: "Chemistry" },
  { value: "biology", label: "Biology" },
  { value: "medicine-mbbs", label: "Medicine (MBBS)" },
  { value: "commerce-accounting", label: "Commerce & Accounting" },
]

const universities = [
  { value: "all", label: "All Universities" },
  { value: "iit-delhi", label: "IIT Delhi" },
  { value: "iit-bombay", label: "IIT Bombay" },
  { value: "iit-madras", label: "IIT Madras" },
  { value: "nit-trichy", label: "NIT Trichy" },
  { value: "nit-warangal", label: "NIT Warangal" },
  { value: "iisc-bangalore", label: "IISC Bangalore" },
  { value: "aiims-delhi", label: "AIIMS Delhi" },
  { value: "delhi-university", label: "Delhi University" },
  { value: "vit-vellore", label: "VIT Vellore" },
  { value: "bits-pilani", label: "BITS Pilani" },
]

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedUniversity, setSelectedUniversity] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Browse Notes</h1>
              <p className="text-slate-600">Discover study materials from students across India</p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search notes by title, tags, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-2 flex-wrap lg:flex-nowrap">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-full lg:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.value} value={subject.value}>
                      {subject.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="University" />
                </SelectTrigger>
                <SelectContent>
                  {universities.map((university) => (
                    <SelectItem key={university.value} value={university.value}>
                      {university.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-36">
                  <SortAsc className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="downloads">Downloads</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6">
        <NotesBrowser
          searchQuery={searchQuery}
          selectedSubject={selectedSubject}
          selectedUniversity={selectedUniversity}
          sortBy={sortBy}
        />
      </div>
    </div>
  )
}
