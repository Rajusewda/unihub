import { sql } from "./db"

export interface User {
  id: number
  email: string
  name: string
  university?: string
  avatar_url?: string
  created_at: string
}

export async function createUser(email: string, name: string, university?: string): Promise<User> {
  const result = await sql`
    INSERT INTO users (email, name, university)
    VALUES (${email}, ${name}, ${university})
    RETURNING *
  `
  return result[0] as User
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await sql`
    SELECT * FROM users WHERE email = ${email}
  `
  return (result[0] as User) || null
}

export async function getUserById(id: number): Promise<User | null> {
  const result = await sql`
    SELECT * FROM users WHERE id = ${id}
  `
  return (result[0] as User) || null
}

// Simple session management (in production, use proper auth like NextAuth.js)
export function getCurrentUser(): User | null {
  // For demo purposes, return a mock user
  // In production, implement proper session management
  return {
    id: 1,
    email: "demo@unihub.com",
    name: "Demo User",
    university: "Demo University",
    created_at: new Date().toISOString(),
  }
}
