import { RequestList } from "@/components/request-list"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function RequestsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold">Note Requests</h1>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Request Notes
          </Button>
        </div>
      </header>

      <div className="flex-1 p-6">
        <RequestList />
      </div>
    </div>
  )
}
