"use client"

import { UploadForm } from "@/components/upload-form"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function UploadPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Upload Notes</h1>
            <p className="text-slate-600">Share your study materials with students across India</p>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6">
        <UploadForm />
      </div>
    </div>
  )
}
