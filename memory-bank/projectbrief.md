# Project Brief: Bus Nearby MCP

## Overview

A Model Context Protocol (MCP) server that provides access to the Bus Nearby API for geocoding and location services, enabling LLMs to convert location queries to geographical coordinates.

## Core Requirements

- **MCP Integration**: Implement MCP server following standard protocol specifications
- **Geocoding Tool**: Expose Bus Nearby geocoding API as an MCP tool
- **Multi-language Support**: Support Hebrew (he) and English (en) locales
- **Error Handling**: Robust error handling and validation
- **TypeScript**: Full TypeScript implementation with proper types

## Key Features

- 🚍 **Geocoding API**: Convert location queries to geographical coordinates
- 🌐 **Multi-locale**: Support for Hebrew and English location searches
- 🔌 **MCP Protocol**: Standard MCP server implementation using stdio transport
- 🧪 **Testing**: End-to-end tests with Playwright
- 📦 **Build System**: TypeScript compilation with proper module exports

## Success Criteria

1. MCP server successfully exposes geocoding functionality
2. Tool accepts locale and query parameters
3. Returns structured geographic data (lat, lng, description)
4. Proper error handling for invalid requests
5. Compatible with MCP-enabled applications and LLMs

## API Specification

- **Tool Name**: `geocode`
- **Input**: `{ locale: "he"|"en", query: string }`
- **Output**: Array of `{ description: string, lat: number, lng: number }`
- **Transport**: Standard stdio MCP transport
