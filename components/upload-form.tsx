"use client"

import type React from "react"
import { useState, useTransition } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, X, FileText, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const subjects = [
  "Computer Science",
  "Electronics & Communication",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Chemical Engineering",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Medicine (MBBS)",
  "Commerce & Accounting",
  "Business Administration",
  "Economics",
  "Law",
  "Arts & Literature",
  "Psychology",
  "Pharmacy",
  "Architecture",
  "Agriculture",
]

const indianUniversities = [
  // IITs
  "IIT Delhi",
  "IIT Bombay",
  "IIT Madras",
  "IIT Kanpur",
  "IIT Kharagpur",
  "IIT Roorkee",
  "IIT Guwahati",
  "IIT Hyderabad",
  "IIT Indore",
  "IIT Mandi",
  "IIT Patna",
  "IIT Bhubaneswar",
  "IIT Gandhinagar",
  "IIT Jodhpur",
  "IIT Varanasi (BHU)",

  // NITs
  "NIT Trichy",
  "NIT Warangal",
  "NIT Surathkal",
  "NIT Calicut",
  "NIT Rourkela",
  "NIT Durgapur",
  "NIT Jaipur",
  "NIT Kurukshetra",
  "NIT Allahabad",
  "NIT Bhopal",

  // IIITs
  "IIIT Hyderabad",
  "IIIT Bangalore",
  "IIIT Delhi",
  "IIIT Allahabad",
  "IIIT Gwalior",

  // IIMs
  "IIM Ahmedabad",
  "IIM Bangalore",
  "IIM Calcutta",
  "IIM Lucknow",
  "IIM Kozhikode",
  "IIM Indore",

  // Medical Colleges
  "AIIMS Delhi",
  "AIIMS Rishikesh",
  "AIIMS Jodhpur",
  "AIIMS Bhubaneswar",
  "JIPMER Puducherry",
  "CMC Vellore",
  "Armed Forces Medical College",

  // Central Universities
  "Delhi University",
  "Jawaharlal Nehru University",
  "Banaras Hindu University",
  "Jamia Millia Islamia",
  "Aligarh Muslim University",
  "University of Hyderabad",

  // State Universities
  "Anna University",
  "Pune University",
  "Mumbai University",
  "Calcutta University",
  "Madras University",
  "Osmania University",
  "Bangalore University",

  // Deemed Universities
  "VIT Vellore",
  "SRM University",
  "Manipal University",
  "BITS Pilani",
  "Thapar University",
  "Amity University",

  // Professional Institutes
  "ICAI (CA Institute)",
  "ICSI (CS Institute)",
  "ICMAI (CMA Institute)",
  "National Law School",
  "NLSIU Bangalore",

  // Coaching Institutes
  "Kota Coaching",
  "Aakash Institute",
  "Allen Career Institute",
  "Narayana College",
  "Chaitanya Bharathi",

  "Other",
]

// Simple client-side note creation (mock)
async function createNoteClient(formData: {
  title: string
  description: string
  subject: string
  university: string
  tags: string[]
  file: File
}) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Simulate success (in real app, this would call an API endpoint)
  return {
    success: true,
    note: {
      id: Math.floor(Math.random() * 1000),
      ...formData,
      author_name: "Demo User",
      created_at: new Date().toISOString(),
    },
  }
}

export function UploadForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    university: "",
  })
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim()) && tags.length < 10) {
      setTags([...tags, currentTag.trim().toLowerCase()])
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB.",
          variant: "destructive",
        })
        return
      }

      // Check file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "text/markdown",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      ]

      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please select a PDF, DOC, DOCX, TXT, MD, PPT, or PPTX file.",
          variant: "destructive",
        })
        return
      }

      setSelectedFile(file)
      setUploadError(null)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setUploadError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploadError(null)

    // Validation
    if (!formData.title.trim()) {
      setUploadError("Title is required")
      return
    }
    if (!formData.subject) {
      setUploadError("Subject is required")
      return
    }
    if (!formData.university) {
      setUploadError("University is required")
      return
    }
    if (!selectedFile) {
      setUploadError("Please select a file to upload")
      return
    }

    startTransition(async () => {
      try {
        const result = await createNoteClient({
          title: formData.title,
          description: formData.description,
          subject: formData.subject,
          university: formData.university,
          tags: tags,
          file: selectedFile,
        })

        if (result.success) {
          setIsSuccess(true)
          toast({
            title: "Upload successful!",
            description: "Your notes have been shared with the UniHub community.",
          })
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Upload failed. Please try again."
        setUploadError(errorMessage)
        toast({
          title: "Upload failed",
          description: errorMessage,
          variant: "destructive",
        })
      }
    })
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      subject: "",
      university: "",
    })
    setTags([])
    setCurrentTag("")
    setSelectedFile(null)
    setIsSuccess(false)
    setUploadError(null)
  }

  if (isSuccess) {
    return (
      <Card className="max-w-2xl mx-auto shadow-sm border-slate-200">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Upload Successful!</h3>
          <p className="text-slate-600 mb-6">
            Your notes have been shared with the UniHub community and are now available for other students.
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={resetForm} variant="outline">
              Upload Another
            </Button>
            <Button onClick={() => (window.location.href = "/notes")}>Browse Notes</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-sm border-slate-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <Upload className="h-4 w-4 text-white" />
          </div>
          Upload Study Notes
        </CardTitle>
        <p className="text-slate-600">Share your study materials with students across India</p>
      </CardHeader>
      <CardContent>
        {uploadError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <span className="text-red-700">{uploadError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-slate-700 font-medium">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., Data Structures and Algorithms - Complete Notes"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-700 font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe what your notes cover, key topics, exam relevance, etc..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-700 font-medium">
                Subject <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)} required>
                <SelectTrigger className="border-slate-200 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-700 font-medium">
                University/Institute <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.university}
                onValueChange={(value) => handleInputChange("university", value)}
                required
              >
                <SelectTrigger className="border-slate-200 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Select university/institute" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {indianUniversities.map((university) => (
                    <SelectItem key={university} value={university}>
                      {university}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700 font-medium">Tags</Label>
            <div className="flex gap-2">
              <Input
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="Add tags (e.g., jee, neet, gate, semester-exam)..."
                className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline" disabled={tags.length >= 10}>
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {tag}
                    <X className="h-3 w-3 cursor-pointer hover:text-red-600" onClick={() => removeTag(tag)} />
                  </Badge>
                ))}
              </div>
            )}
            <p className="text-sm text-slate-500">
              Add up to 10 tags to help others find your notes (e.g., exam names, topics, difficulty level)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file" className="text-slate-700 font-medium">
              Upload File <span className="text-red-500">*</span>
            </Label>
            <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:border-blue-300 transition-colors">
              <input
                id="file"
                type="file"
                accept=".pdf,.doc,.docx,.txt,.md,.ppt,.pptx"
                onChange={handleFileChange}
                className="hidden"
                required
              />
              <label htmlFor="file" className="cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  {selectedFile ? (
                    <>
                      <FileText className="h-8 w-8 text-blue-600" />
                      <p className="font-medium text-slate-900">{selectedFile.name}</p>
                      <p className="text-sm text-slate-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-slate-400" />
                      <p className="font-medium text-slate-900">Click to upload or drag and drop</p>
                      <p className="text-sm text-slate-500">PDF, DOC, DOCX, TXT, MD, PPT, PPTX (Max 10MB)</p>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isPending}>
            {isPending ? "Uploading..." : "Upload Notes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
