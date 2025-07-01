"use server"

import { sql } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export interface Discussion {
  id: number
  title: string
  content: string
  author_id: number
  author_name: string
  subject: string
  university: string
  tags: string[]
  upvotes: number
  replies: number
  views: number
  is_pinned: boolean
  created_at: string
  is_upvoted?: boolean
}

export async function createDiscussion(formData: FormData) {
  const user = getCurrentUser()
  if (!user) {
    throw new Error("User not authenticated")
  }

  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const subject = formData.get("subject") as string
  const tags = JSON.parse((formData.get("tags") as string) || "[]")

  if (!title || !content || !subject) {
    throw new Error("Missing required fields")
  }

  const result = await sql`
    INSERT INTO discussions (title, content, author_id, author_name, subject, university, tags)
    VALUES (${title}, ${content}, ${user.id}, ${user.name}, ${subject}, ${user.university || "Unknown"}, ${tags})
    RETURNING *
  `

  revalidatePath("/discussions")

  return { success: true, discussion: result[0] }
}

export async function getDiscussions() {
  const user = getCurrentUser()

  const result = await sql`
    SELECT d.*, 
           CASE WHEN v.id IS NOT NULL THEN true ELSE false END as is_upvoted
    FROM discussions d
    LEFT JOIN votes v ON d.id = v.item_id AND v.item_type = 'discussion' AND v.user_id = ${user?.id || 0}
    ORDER BY d.is_pinned DESC, d.updated_at DESC
  `

  return result as Discussion[]
}

export async function upvoteDiscussion(discussionId: number) {
  const user = getCurrentUser()
  if (!user) {
    throw new Error("User not authenticated")
  }

  try {
    const existingVote = await sql`
      SELECT * FROM votes 
      WHERE user_id = ${user.id} AND item_id = ${discussionId} AND item_type = 'discussion'
    `

    if (existingVote.length > 0) {
      await sql`
        DELETE FROM votes 
        WHERE user_id = ${user.id} AND item_id = ${discussionId} AND item_type = 'discussion'
      `
      await sql`
        UPDATE discussions SET upvotes = upvotes - 1 WHERE id = ${discussionId}
      `
    } else {
      await sql`
        INSERT INTO votes (user_id, item_id, item_type, vote_type)
        VALUES (${user.id}, ${discussionId}, 'discussion', 'upvote')
      `
      await sql`
        UPDATE discussions SET upvotes = upvotes + 1 WHERE id = ${discussionId}
      `
    }

    revalidatePath("/discussions")

    return { success: true }
  } catch (error) {
    console.error("Error voting on discussion:", error)
    throw new Error("Failed to vote on discussion")
  }
}

export async function incrementDiscussionViews(discussionId: number) {
  await sql`
    UPDATE discussions SET views = views + 1 WHERE id = ${discussionId}
  `
  revalidatePath("/discussions")
}
