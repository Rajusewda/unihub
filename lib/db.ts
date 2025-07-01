/**
 * Database helper with improved error handling and fallback data for Indian universities
 */

import type { NeonQueryFunction } from "@neondatabase/serverless"
import { neon } from "@neondatabase/serverless"

let sql: NeonQueryFunction<any[]> | ((...args: any[]) => Promise<any[]>)

if (process.env.DATABASE_URL) {
  // Normal production / dev connection
  sql = neon(process.env.DATABASE_URL)
} else {
  // Preview / fallback: return mock data for Indian universities
  console.warn("[lib/db] DATABASE_URL not set – using mock data for Indian universities.")

  sql = async (...queryArgs: any[]) => {
    console.info("[lib/db] Mock query:", queryArgs[0]?.text ?? queryArgs[0])

    // Return mock data based on query type
    const query = queryArgs[0]?.text ?? queryArgs[0]

    if (typeof query === "string") {
      if (query.includes("SELECT") && query.includes("notes")) {
        return getMockNotes()
      }
      if (query.includes("SELECT") && query.includes("discussions")) {
        return getMockDiscussions()
      }
      if (query.includes("SELECT") && query.includes("requests")) {
        return getMockRequests()
      }
      if (query.includes("INSERT") || query.includes("UPDATE")) {
        return [{ id: Math.floor(Math.random() * 1000), success: true }]
      }
    }

    return []
  }
}

export { sql }

// Mock data for Indian universities
function getMockNotes() {
  return [
    {
      id: 1,
      title: "Data Structures and Algorithms - Complete Notes",
      description:
        "Comprehensive notes covering arrays, linked lists, trees, graphs, sorting and searching algorithms with examples in C++ and Java.",
      subject: "Computer Science",
      university: "IIT Delhi",
      author_id: 1,
      author_name: "Rahul Sharma",
      file_url: "/mock-files/dsa-notes.pdf",
      file_type: "PDF",
      file_size: "3.2 MB",
      tags: ["data-structures", "algorithms", "programming", "competitive-coding"],
      upvotes: 156,
      downloads: 423,
      views: 1250,
      rating: 4.8,
      created_at: "2024-01-15T10:30:00Z",
      is_upvoted: false,
      is_bookmarked: false,
    },
    {
      id: 2,
      title: "Engineering Mathematics - Calculus and Linear Algebra",
      description:
        "Detailed notes on differential calculus, integral calculus, matrices, eigenvalues and eigenvectors for engineering students.",
      subject: "Mathematics",
      university: "IIT Bombay",
      author_id: 2,
      author_name: "Priya Patel",
      file_url: "/mock-files/engg-math.pdf",
      file_type: "PDF",
      file_size: "4.1 MB",
      tags: ["calculus", "linear-algebra", "engineering", "mathematics"],
      upvotes: 89,
      downloads: 267,
      views: 890,
      rating: 4.6,
      created_at: "2024-01-14T15:45:00Z",
      is_upvoted: true,
      is_bookmarked: false,
    },
    {
      id: 3,
      title: "Digital Electronics and Logic Design",
      description:
        "Complete study material covering Boolean algebra, combinational circuits, sequential circuits, and microprocessor basics.",
      subject: "Electronics",
      university: "NIT Trichy",
      author_id: 3,
      author_name: "Amit Kumar",
      file_url: "/mock-files/digital-electronics.pdf",
      file_type: "PDF",
      file_size: "2.8 MB",
      tags: ["digital-electronics", "logic-design", "boolean-algebra", "circuits"],
      upvotes: 134,
      downloads: 356,
      views: 1100,
      rating: 4.7,
      created_at: "2024-01-13T09:20:00Z",
      is_upvoted: false,
      is_bookmarked: true,
    },
    {
      id: 4,
      title: "Organic Chemistry - Reaction Mechanisms",
      description:
        "Detailed notes on organic chemistry reactions, mechanisms, stereochemistry, and synthesis for NEET and JEE preparation.",
      subject: "Chemistry",
      university: "AIIMS Delhi",
      author_id: 4,
      author_name: "Sneha Gupta",
      file_url: "/mock-files/organic-chemistry.pdf",
      file_type: "PDF",
      file_size: "5.3 MB",
      tags: ["organic-chemistry", "reactions", "neet", "jee", "medical"],
      upvotes: 201,
      downloads: 567,
      views: 1890,
      rating: 4.9,
      created_at: "2024-01-12T14:10:00Z",
      is_upvoted: false,
      is_bookmarked: false,
    },
    {
      id: 5,
      title: "Machine Learning and AI Fundamentals",
      description:
        "Introduction to machine learning algorithms, neural networks, deep learning, and practical implementation using Python.",
      subject: "Computer Science",
      university: "IISC Bangalore",
      author_id: 5,
      author_name: "Vikash Singh",
      file_url: "/mock-files/ml-ai-notes.pdf",
      file_type: "PDF",
      file_size: "6.7 MB",
      tags: ["machine-learning", "artificial-intelligence", "python", "neural-networks"],
      upvotes: 298,
      downloads: 789,
      views: 2340,
      rating: 4.8,
      created_at: "2024-01-11T11:30:00Z",
      is_upvoted: true,
      is_bookmarked: true,
    },
    {
      id: 6,
      title: "Financial Accounting and Management",
      description:
        "Complete notes on financial accounting principles, balance sheets, profit & loss statements, and financial analysis for commerce students.",
      subject: "Commerce",
      university: "Delhi University",
      author_id: 6,
      author_name: "Anjali Mehta",
      file_url: "/mock-files/financial-accounting.pdf",
      file_type: "PDF",
      file_size: "3.9 MB",
      tags: ["accounting", "finance", "commerce", "balance-sheet", "financial-analysis"],
      upvotes: 87,
      downloads: 234,
      views: 678,
      rating: 4.5,
      created_at: "2024-01-10T16:20:00Z",
      is_upvoted: false,
      is_bookmarked: false,
    },
  ]
}

function getMockDiscussions() {
  return [
    {
      id: 1,
      title: "JEE Main 2024 - Physics Preparation Strategy",
      content:
        "What's the best way to prepare for JEE Main Physics? I'm struggling with mechanics and electromagnetism. Any tips for solving numerical problems quickly?",
      author_id: 1,
      author_name: "Rohit Agarwal",
      subject: "Physics",
      university: "Kota Coaching",
      tags: ["jee-main", "physics", "preparation", "mechanics", "electromagnetism"],
      upvotes: 45,
      replies: 23,
      views: 567,
      is_pinned: true,
      created_at: "2024-01-15T08:30:00Z",
      is_upvoted: false,
    },
    {
      id: 2,
      title: "NEET Biology - Best Books and Resources",
      content:
        "Can someone recommend the best books for NEET Biology preparation? I've heard NCERT is essential, but what about reference books for advanced topics?",
      author_id: 2,
      author_name: "Kavya Reddy",
      subject: "Biology",
      university: "Narayana College",
      tags: ["neet", "biology", "books", "ncert", "medical-entrance"],
      upvotes: 67,
      replies: 34,
      views: 892,
      is_pinned: false,
      created_at: "2024-01-14T12:15:00Z",
      is_upvoted: true,
    },
    {
      id: 3,
      title: "Placement Preparation - DSA vs Development",
      content:
        "I'm in my 3rd year of CSE. Should I focus more on Data Structures & Algorithms for placements or learn web development? What do companies like TCS, Infosys prefer?",
      author_id: 3,
      author_name: "Arjun Malhotra",
      subject: "Computer Science",
      university: "VIT Vellore",
      tags: ["placements", "dsa", "web-development", "tcs", "infosys", "career"],
      upvotes: 89,
      replies: 45,
      views: 1234,
      is_pinned: false,
      created_at: "2024-01-13T14:45:00Z",
      is_upvoted: false,
    },
  ]
}

function getMockRequests() {
  return [
    {
      id: 1,
      title: "GATE CSE 2024 - Operating Systems Notes",
      description:
        "Looking for comprehensive notes on Operating Systems for GATE CSE preparation. Need topics like process management, memory management, file systems, and deadlocks with solved examples.",
      requester_id: 1,
      requester_name: "Deepak Kumar",
      subject: "Computer Science",
      university: "NIT Warangal",
      bounty: 500,
      status: "open",
      urgency: "high",
      tags: ["gate", "operating-systems", "cse", "process-management", "memory-management"],
      applicants: 7,
      created_at: "2024-01-15T09:00:00Z",
    },
    {
      id: 2,
      title: "CA Final - Advanced Auditing and Professional Ethics",
      description:
        "Need detailed notes for CA Final Advanced Auditing and Professional Ethics. Looking for practical case studies and recent amendments in auditing standards.",
      requester_id: 2,
      requester_name: "Neha Jain",
      subject: "Commerce",
      university: "ICAI",
      bounty: 750,
      status: "in-progress",
      urgency: "high",
      tags: ["ca-final", "auditing", "professional-ethics", "case-studies", "icai"],
      applicants: 12,
      created_at: "2024-01-14T11:30:00Z",
    },
    {
      id: 3,
      title: "MBBS 2nd Year - Pathology Practical Manual",
      description:
        "Looking for a comprehensive pathology practical manual with histopathology slides, gross specimens, and clinical correlations for MBBS 2nd year.",
      requester_id: 3,
      requester_name: "Dr. Sanjay Verma",
      subject: "Medicine",
      university: "AIIMS Rishikesh",
      bounty: 600,
      status: "open",
      urgency: "medium",
      tags: ["mbbs", "pathology", "practical", "histopathology", "medical"],
      applicants: 4,
      created_at: "2024-01-13T16:20:00Z",
    },
  ]
}

export async function initializeDatabase() {
  if (!process.env.DATABASE_URL) {
    console.warn("[lib/db] Skipping schema creation – DATABASE_URL not configured.")
    return
  }

  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        university VARCHAR(255),
        avatar_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create notes table
    await sql`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        description TEXT,
        subject VARCHAR(255) NOT NULL,
        university VARCHAR(255) NOT NULL,
        author_id INTEGER REFERENCES users(id),
        author_name VARCHAR(255) NOT NULL,
        file_url TEXT NOT NULL,
        file_type VARCHAR(50) NOT NULL,
        file_size VARCHAR(50) NOT NULL,
        tags TEXT[] DEFAULT '{}',
        upvotes INTEGER DEFAULT 0,
        downloads INTEGER DEFAULT 0,
        views INTEGER DEFAULT 0,
        rating DECIMAL(2,1) DEFAULT 0.0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create discussions table
    await sql`
      CREATE TABLE IF NOT EXISTS discussions (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        content TEXT NOT NULL,
        author_id INTEGER REFERENCES users(id),
        author_name VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        university VARCHAR(255) NOT NULL,
        tags TEXT[] DEFAULT '{}',
        upvotes INTEGER DEFAULT 0,
        replies INTEGER DEFAULT 0,
        views INTEGER DEFAULT 0,
        is_pinned BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create requests table
    await sql`
      CREATE TABLE IF NOT EXISTS requests (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        description TEXT NOT NULL,
        requester_id INTEGER REFERENCES users(id),
        requester_name VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        university VARCHAR(255) NOT NULL,
        bounty INTEGER NOT NULL,
        status VARCHAR(50) DEFAULT 'open',
        urgency VARCHAR(50) DEFAULT 'medium',
        tags TEXT[] DEFAULT '{}',
        applicants INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create votes table
    await sql`
      CREATE TABLE IF NOT EXISTS votes (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        item_id INTEGER NOT NULL,
        item_type VARCHAR(50) NOT NULL,
        vote_type VARCHAR(10) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, item_id, item_type)
      )
    `

    // Create bookmarks table
    await sql`
      CREATE TABLE IF NOT EXISTS bookmarks (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        note_id INTEGER REFERENCES notes(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, note_id)
      )
    `

    // Create comments table
    await sql`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        author_id INTEGER REFERENCES users(id),
        author_name VARCHAR(255) NOT NULL,
        item_id INTEGER NOT NULL,
        item_type VARCHAR(50) NOT NULL,
        parent_id INTEGER REFERENCES comments(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Database initialization error:", error)
    throw error
  }
}
