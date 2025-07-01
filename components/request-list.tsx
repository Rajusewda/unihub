"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, User, BookOpen, DollarSign, CheckCircle, AlertCircle } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface Request {
  id: number
  title: string
  description: string
  requester: string
  requesterInitials: string
  subject: string
  university: string
  timeAgo: string
  bounty: number
  status: "open" | "in-progress" | "fulfilled"
  urgency: "low" | "medium" | "high"
  tags: string[]
  applicants: number
}

const initialRequests: Request[] = [
  {
    id: 1,
    title: "Advanced Linear Algebra Notes",
    description:
      "Looking for comprehensive notes on eigenvalues, eigenvectors, matrix decomposition, and applications in machine learning. Need detailed explanations with examples.",
    requester: "Sarah Johnson",
    requesterInitials: "SJ",
    subject: "Mathematics",
    university: "MIT",
    timeAgo: "1 hour ago",
    bounty: 50,
    status: "open",
    urgency: "high",
    tags: ["linear-algebra", "eigenvalues", "matrix-decomposition", "machine-learning"],
    applicants: 3,
  },
  {
    id: 2,
    title: "Machine Learning Algorithms Summary",
    description:
      "Need detailed notes on supervised and unsupervised learning algorithms including decision trees, SVM, clustering, and neural networks with implementation examples.",
    requester: "Mike Chen",
    requesterInitials: "MC",
    subject: "Computer Science",
    university: "Stanford",
    timeAgo: "3 hours ago",
    bounty: 75,
    status: "in-progress",
    urgency: "medium",
    tags: ["machine-learning", "algorithms", "supervised", "unsupervised", "neural-networks"],
    applicants: 7,
  },
  {
    id: 3,
    title: "Quantum Mechanics Problem Sets",
    description:
      "Looking for solved problem sets covering wave functions, quantum operators, and the time-dependent Schrödinger equation. Need step-by-step solutions.",
    requester: "Emma Wilson",
    requesterInitials: "EW",
    subject: "Physics",
    university: "Caltech",
    timeAgo: "5 hours ago",
    bounty: 60,
    status: "fulfilled",
    urgency: "low",
    tags: ["quantum-mechanics", "wave-functions", "operators", "schrodinger-equation"],
    applicants: 12,
  },
  {
    id: 4,
    title: "Organic Chemistry Synthesis Pathways",
    description:
      "Need comprehensive notes on multi-step organic synthesis including retrosynthetic analysis, protecting groups, and reaction selectivity.",
    requester: "David Rodriguez",
    requesterInitials: "DR",
    subject: "Chemistry",
    university: "Harvard",
    timeAgo: "8 hours ago",
    bounty: 85,
    status: "open",
    urgency: "high",
    tags: ["organic-chemistry", "synthesis", "retrosynthesis", "protecting-groups"],
    applicants: 5,
  },
  {
    id: 5,
    title: "Macroeconomics Policy Analysis",
    description:
      "Looking for detailed notes on fiscal and monetary policy tools, their economic impacts, and case studies from recent economic events.",
    requester: "Lisa Park",
    requesterInitials: "LP",
    subject: "Economics",
    university: "University of Chicago",
    timeAgo: "12 hours ago",
    bounty: 40,
    status: "open",
    urgency: "medium",
    tags: ["macroeconomics", "fiscal-policy", "monetary-policy", "case-studies"],
    applicants: 2,
  },
]

export function RequestList() {
  const [requests, setRequests] = useState(initialRequests)
  const { toast } = useToast()

  const handleFulfillRequest = (requestId: number) => {
    setRequests(
      requests.map((request) =>
        request.id === requestId
          ? { ...request, status: "in-progress" as const, applicants: request.applicants + 1 }
          : request,
      ),
    )
    toast({
      title: "Application submitted!",
      description: "You've applied to fulfill this request. The requester will be notified.",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "in-progress":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "fulfilled":
        return "bg-slate-50 text-slate-700 border-slate-200"
      default:
        return "bg-slate-50 text-slate-700 border-slate-200"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-slate-600"
    }
  }

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case "high":
        return <AlertCircle className="h-4 w-4" />
      case "medium":
        return <Clock className="h-4 w-4" />
      case "low":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <Card key={request.id} className="shadow-sm border-slate-200 hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-semibold">
                    {request.requesterInitials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-slate-900">{request.requester}</p>
                  <p className="text-sm text-slate-500">{request.university}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center gap-1 text-2xl font-bold text-emerald-600">
                    <DollarSign className="h-5 w-5" />
                    {request.bounty}
                  </div>
                  <Badge variant="outline" className={getStatusColor(request.status)}>
                    {request.status.replace("-", " ")}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-sm text-slate-500">
                  <Clock className="h-4 w-4" />
                  {request.timeAgo}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-slate-900">{request.title}</h3>
                <div className={`flex items-center gap-1 text-sm ${getUrgencyColor(request.urgency)}`}>
                  {getUrgencyIcon(request.urgency)}
                  <span className="capitalize">{request.urgency} priority</span>
                </div>
              </div>

              <p className="text-slate-600 mb-4">{request.description}</p>

              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                  {request.subject}
                </Badge>
                <span className="text-sm text-slate-500">• {request.applicants} applicants</span>
              </div>

              <div className="flex flex-wrap gap-1">
                {request.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs bg-slate-100 text-slate-700">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {request.requester}
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {request.subject}
                </div>
              </div>

              <Button
                onClick={() => handleFulfillRequest(request.id)}
                disabled={request.status === "fulfilled"}
                className={
                  request.status === "open"
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : request.status === "in-progress"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-slate-400 text-white cursor-not-allowed"
                }
              >
                {request.status === "open" && "Apply to Fulfill"}
                {request.status === "in-progress" && "In Progress"}
                {request.status === "fulfilled" && "Fulfilled"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
