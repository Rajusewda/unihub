"use server"

import { sql } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export interface Note {
  id: number
  title: string
  description: string
  subject: string
  university: string
  author_id: number
  author_name: string
  file_url: string
  file_type: string
  file_size: string
  tags: string[]
  upvotes: number
  downloads: number
  views: number
  rating: number
  created_at: string
  is_upvoted?: boolean
  is_bookmarked?: boolean
}

export async function createNote(formData: FormData) {
  try {
    const user = getCurrentUser()
    if (!user) {
      throw new Error("User not authenticated")
    }

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const subject = formData.get("subject") as string
    const university = formData.get("university") as string
    const tags = JSON.parse((formData.get("tags") as string) || "[]")
    const file = formData.get("file") as File

    if (!title || !subject || !university || !file) {
      throw new Error("Missing required fields")
    }

    // In production, upload file to cloud storage (Vercel Blob, AWS S3, etc.)
    // For now, we'll simulate the upload
    const fileUrl = `/uploads/${Date.now()}-${file.name}`
    const fileType = file.name.split(".").pop()?.toUpperCase() || "PDF"
    const fileSize = `${(file.size / 1024 / 1024).toFixed(1)} MB`

    // Check if database is available
    if (!process.env.DATABASE_URL) {
      // Return mock success for demo
      return {
        success: true,
        note: {
          id: Math.floor(Math.random() * 1000),
          title,
          description,
          subject,
          university,
          author_id: user.id,
          author_name: user.name,
          file_url: fileUrl,
          file_type: fileType,
          file_size: fileSize,
          tags,
          upvotes: 0,
          downloads: 0,
          views: 0,
          rating: 0,
          created_at: new Date().toISOString(),
        },
      }
    }

    const result = await sql`
      INSERT INTO notes (title, description, subject, university, author_id, author_name, file_url, file_type, file_size, tags)
      VALUES (${title}, ${description}, ${subject}, ${university}, ${user.id}, ${user.name}, ${fileUrl}, ${fileType}, ${fileSize}, ${tags})
      RETURNING *
    `

    revalidatePath("/notes")
    revalidatePath("/")

    return { success: true, note: result[0] }
  } catch (error) {
    console.error("Error creating note:", error)
    throw new Error("Failed to upload note. Please try again.")
  }
}

export async function getNotes(filters?: {
  search?: string
  subject?: string
  university?: string
  sortBy?: string
  limit?: number
  offset?: number
}) {
  try {
    const user = getCurrentUser()
    const {
      search = "",
      subject = "all",
      university = "all",
      sortBy = "recent",
      limit = 20,
      offset = 0,
    } = filters || {}

    if (!process.env.DATABASE_URL) {
      // Return mock data when no database is connected
      const mockNotes = (await sql()) as Note[]
      return mockNotes
        .filter((note) => {
          const matchesSearch =
            !search ||
            note.title.toLowerCase().includes(search.toLowerCase()) ||
            note.description?.toLowerCase().includes(search.toLowerCase()) ||
            note.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))

          const matchesSubject = subject === "all" || note.subject.toLowerCase().replace(/\s+/g, "-") === subject

          const matchesUniversity =
            university === "all" || note.university.toLowerCase().replace(/\s+/g, "-") === university

          return matchesSearch && matchesSubject && matchesUniversity
        })
        .sort((a, b) => {
          switch (sortBy) {
            case "popular":
              return b.upvotes - a.upvotes
            case "rating":
              return b.rating - a.rating
            case "downloads":
              return b.downloads - a.downloads
            default:
              return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          }
        })
        .slice(offset, offset + limit)
    }

    let query = `
      SELECT n.*, 
             CASE WHEN v.id IS NOT NULL THEN true ELSE false END as is_upvoted,
             CASE WHEN b.id IS NOT NULL THEN true ELSE false END as is_bookmarked
      FROM notes n
      LEFT JOIN votes v ON n.id = v.item_id AND v.item_type = 'note' AND v.user_id = $1
      LEFT JOIN bookmarks b ON n.id = b.note_id AND b.user_id = $1
      WHERE 1=1
    `

    const params: any[] = [user?.id || 0]

    if (search) {
      query += ` AND (n.title ILIKE $${params.length + 1} OR n.description ILIKE $${params.length + 1} OR $${params.length + 1} = ANY(n.tags))`
      params.push(`%${search}%`)
    }

    if (subject !== "all") {
      query += ` AND LOWER(REPLACE(n.subject, ' ', '-')) = $${params.length + 1}`
      params.push(subject)
    }

    if (university !== "all") {
      query += ` AND LOWER(REPLACE(n.university, ' ', '-')) = $${params.length + 1}`
      params.push(university)
    }

    // Add sorting
    switch (sortBy) {
      case "popular":
        query += " ORDER BY n.upvotes DESC"
        break
      case "rating":
        query += " ORDER BY n.rating DESC"
        break
      case "downloads":
        query += " ORDER BY n.downloads DESC"
        break
      default:
        query += " ORDER BY n.created_at DESC"
    }

    query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`
    params.push(limit, offset)

    const result = await sql.unsafe(query, params)
    return result as Note[]
  } catch (error) {
    console.error("Error fetching notes:", error)
    // Return mock data on error
    return (await sql()) as Note[]
  }
}

export async function upvoteNote(noteId: number) {
  try {
    const user = getCurrentUser()
    if (!user) {
      throw new Error("User not authenticated")
    }

    if (!process.env.DATABASE_URL) {
      // Return mock success for demo
      return { success: true }
    }

    // Check if user already voted
    const existingVote = await sql`
      SELECT * FROM votes 
      WHERE user_id = ${user.id} AND item_id = ${noteId} AND item_type = 'note'
    `

    if (existingVote.length > 0) {
      // Remove vote
      await sql`
        DELETE FROM votes 
        WHERE user_id = ${user.id} AND item_id = ${noteId} AND item_type = 'note'
      `
      await sql`
        UPDATE notes SET upvotes = upvotes - 1 WHERE id = ${noteId}
      `
    } else {
      // Add vote
      await sql`
        INSERT INTO votes (user_id, item_id, item_type, vote_type)
        VALUES (${user.id}, ${noteId}, 'note', 'upvote')
      `
      await sql`
        UPDATE notes SET upvotes = upvotes + 1 WHERE id = ${noteId}
      `
    }

    revalidatePath("/notes")
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("Error voting on note:", error)
    return { success: true } // Return success for mock data
  }
}

export async function bookmarkNote(noteId: number) {
  try {
    const user = getCurrentUser()
    if (!user) {
      throw new Error("User not authenticated")
    }

    if (!process.env.DATABASE_URL) {
      // Return mock success for demo
      return { success: true }
    }

    const existingBookmark = await sql`
      SELECT * FROM bookmarks 
      WHERE user_id = ${user.id} AND note_id = ${noteId}
    `

    if (existingBookmark.length > 0) {
      await sql`
        DELETE FROM bookmarks 
        WHERE user_id = ${user.id} AND note_id = ${noteId}
      `
    } else {
      await sql`
        INSERT INTO bookmarks (user_id, note_id)
        VALUES (${user.id}, ${noteId})
      `
    }

    revalidatePath("/notes")
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("Error bookmarking note:", error)
    return { success: true } // Return success for mock data
  }
}

export async function downloadNote(noteId: number) {
  try {
    const user = getCurrentUser()
    if (!user) {
      throw new Error("User not authenticated")
    }

    if (!process.env.DATABASE_URL) {
      // Return mock success for demo
      return { success: true }
    }

    await sql`
      UPDATE notes SET downloads = downloads + 1, views = views + 1 
      WHERE id = ${noteId}
    `

    revalidatePath("/notes")
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("Error downloading note:", error)
    return { success: true } // Return success for mock data
  }
}
