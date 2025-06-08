#!/usr/bin/env node

/**
 * BusNearby MCP - Main entry point
 * Runs the MCP server for Bus Nearby geocoding functionality
 */

import { main } from "./mcp/server"

// Run the MCP server if this file is executed directly
if (require.main === module) {
  main().catch((error) => {
    console.error("Fatal error:", error)
    process.exit(1)
  })
}

export { main }
