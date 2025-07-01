import { initializeDatabase } from "../lib/db"

async function main() {
  try {
    await initializeDatabase()
    console.log("Database setup completed!")
  } catch (error) {
    console.error("Failed to initialize database:", error)
    process.exit(1)
  }
}

main()
