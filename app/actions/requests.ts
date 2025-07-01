"use server"

import { sql } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export interface Request {
  id: number
  title: string
  description: string
  requester_id: number
  requester_name: string
  subject: string
  university: string
  bounty: number
  status: string
  urgency: string
  tags: string[]
  applicants: number
  created_at: string
}

export async function createRequest(formData: FormData) {
  const user = getCurrentUser()
  if (!user) {
    throw new Error("User not authenticated")
  }

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const subject = formData.get("subject") as string
  const bounty = Number.parseInt(formData.get("bounty") as string)
  const urgency = formData.get("urgency") as string
  const tags = JSON.parse((formData.get("tags") as string) || "[]")

  if (!title || !description || !subject || !bounty) {
    throw new Error("Missing required fields")
  }

  const result = await sql`
    INSERT INTO requests (title, description, requester_id, requester_name, subject, university, bounty, urgency, tags)
    VALUES (${title}, ${description}, ${user.id}, ${user.name}, ${subject}, ${user.university || "Unknown"}, ${bounty}, ${urgency}, ${tags})
    RETURNING *
  `

  revalidatePath("/requests")

  return { success: true, request: result[0] }
}

export async function getRequests() {
  const result = await sql`
    SELECT * FROM requests
    ORDER BY 
      CASE WHEN status = 'open' THEN 1 
           WHEN status = 'in-progress' THEN 2 
           ELSE 3 END,
      CASE WHEN urgency = 'high' THEN 1 
           WHEN urgency = 'medium' THEN 2 
           ELSE 3 END,
      created_at DESC
  `

  return result as Request[]
}

export async function applyToRequest(requestId: number) {
  const user = getCurrentUser()
  if (!user) {
    throw new Error("User not authenticated")
  }

  try {
    await sql`
      UPDATE requests 
      SET applicants = applicants + 1, 
          status = CASE WHEN status = 'open' THEN 'in-progress' ELSE status END,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${requestId}
    `

    revalidatePath("/requests")

    return { success: true }
  } catch (error) {
    console.error("Error applying to request:", error)
    throw new Error("Failed to apply to request")
  }
}
