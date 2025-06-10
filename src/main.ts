import { main } from "./mcp/server"

if (require.main === module) {
  main().catch((error) => {
    console.error("Fatal error:", error)
    process.exit(1)
  })
}

export { main }
