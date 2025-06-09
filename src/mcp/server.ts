#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"
import { GeocodeAPI } from "../api/geocode"
import { DirectionsAPI } from "../api/directions"
import {
  GeocodeRequest,
  DirectionsRequest,
  LocationPlaceSchema,
} from "../types"

/**
 * BusNearby MCP Server
 * Provides geocoding and directions functionality through the Bus Nearby API
 */

const server = new McpServer({
  name: "BusNearby",
  version: "1.0.0",
})

// Initialize API clients
const geocodeAPI = new GeocodeAPI()
const directionsAPI = new DirectionsAPI()

// Add the geocode tool using the high-level API
server.tool(
  "geocode",
  "Convert a location query to geographical coordinates using Bus Nearby API",
  {
    locale: z
      .enum(["he", "en"])
      .describe("Locale for the search (he for Hebrew, en for English)"),
    query: z
      .string()
      .describe("Location query to geocode (e.g., 'תל אביב' or 'Tel Aviv')"),
  },
  async ({ locale, query }) => {
    try {
      const geocodeRequest: GeocodeRequest = { locale, query }
      const results = await geocodeAPI.geocode(geocodeRequest)

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(results, null, 2),
          },
        ],
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred"

      return {
        content: [
          {
            type: "text",
            text: `Error: ${errorMessage}`,
          },
        ],
        isError: true,
      }
    }
  }
)

// Add the directions tool
server.tool(
  "directions",
  "Get transit directions between two locations using Bus Nearby API",
  {
    fromPlace: LocationPlaceSchema.describe(
      "Starting location in format 'formatted_address::lat,lng' (e.g., 'תל אביב::31.7776,35.2357')"
    ),
    toPlace: LocationPlaceSchema.describe(
      "Destination location in format 'formatted_address::lat,lng' (e.g., 'תל אביב::31.7776,35.2357')"
    ),
    locale: z
      .enum(["he", "en"])
      .describe("Locale for the response (he for Hebrew, en for English)")
      .default("he"),
    arriveBy: z
      .boolean()
      .describe(
        "Whether to optimize for arrival time (false for departure time)"
      )
      .default(false),
    wheelchair: z
      .boolean()
      .describe("Whether route should be wheelchair accessible")
      .default(false),
    mode: z
      .string()
      .describe("Transportation modes (e.g., 'WALK,TRANSIT')")
      .default("WALK,TRANSIT"),
    showIntermediateStops: z
      .boolean()
      .describe("Whether to show intermediate stops")
      .default(true),
    numItineraries: z
      .number()
      .describe("Number of alternative routes to return")
      .default(3),
    maxWalkDistance: z
      .string()
      .describe("Maximum walking distance in meters")
      .default("1207"),
    optimize: z
      .enum(["QUICK", "SAFE", "FLAT", "GREENWAYS", "TRIANGLE"])
      .describe("Route optimization preference")
      .default("QUICK"),
    ignoreRealtimeUpdates: z
      .boolean()
      .describe("Whether to ignore real-time updates")
      .default(false),
    date: z
      .string()
      .optional()
      .describe(
        `Date for the trip (optional) in this format YYYY-MM-DD (e.g., 2025-06-08) dont use past dates only future dates from today ${
          new Date().toISOString().split("T")[0]
        }`
      ),
    time: z
      .string()
      .optional()
      .describe(
        "Time for the trip (optional) in this format HH:MM (e.g., 10:00)"
      ),
  },
  async (params) => {
    try {
      // Validate date/time dependency
      const hasDate = params.date !== undefined
      const hasTime = params.time !== undefined

      if (hasDate !== hasTime) {
        throw new Error(
          "If date is provided, time must also be provided, and vice versa"
        )
      }

      const directionsRequest: DirectionsRequest = {
        fromPlace: params.fromPlace,
        toPlace: params.toPlace,
        locale: params.locale,
        arriveBy: params.arriveBy,
        wheelchair: params.wheelchair,
        mode: params.mode,
        showIntermediateStops: params.showIntermediateStops,
        numItineraries: params.numItineraries,
        maxWalkDistance: params.maxWalkDistance,
        optimize: params.optimize,
        ignoreRealtimeUpdates: params.ignoreRealtimeUpdates,
        date: params.date,
        time: params.time,
      }

      const results = await directionsAPI.getDirections(directionsRequest)

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(results, null, 2),
          },
        ],
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred"

      return {
        content: [
          {
            type: "text",
            text: `Error: ${errorMessage}`,
          },
        ],
        isError: true,
      }
    }
  }
)

// Start the server
async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)

  console.error("BusNearby MCP Server running on stdio")
}

if (require.main === module) {
  main().catch((error) => {
    console.error("Fatal error:", error)
    process.exit(1)
  })
}

export { server, main }
