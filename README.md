# Bus Nearby MCP (Israeli transport MCP).

A Model Context Protocol (MCP) server that provides access to the Israeli transport api.  
This is the Unofficial MCP of Bus Nearby API, [You can check this API here](https://busnearby.co.il/plan).

## Features

https://github.com/user-attachments/assets/147ee388-e9c0-4f97-82e7-71d4d6534de0

- 🚍 **Geocoding**: Convert location queries to geographical coordinates
- 🗺️ **Directions**: Get transit directions between locations
- 🌐 **Multi-language**: Support for Hebrew and English
- 🔌 **MCP Protocol**: Standard MCP server implementation
- 📦 **Docker Support**: Easy deployment with Docker

## Quick Start with Docker + Cursor

### Prerequisites

- Cursor IDE

### Setup Instructions

1. **Setup the MCP server:**

   ```json
   {
     "mcpServers": {
       "busnearby-docker": {
         "command": "docker",
         "args": ["run", "--rm", "-i", "shmuelc/busnearby-mcp:latest"]
       }
     }
   }
   ```

## Connect locally with Docker

1. **Clone this repo**
2. **Navigate to repo foler**
3. **Build and setup the MCP server:**

   ```bash
   docker build -t busnearby-mcp .
   ```

4. **Add this to mcp.json**

   ```json
   {
     "mcpServers": {
       "busnearby": {
         "command": "docker",
         "args": [
           "run",
           "--rm",
           "-i",
           "--name",
           "busnearby-mcp-cursor",
           "busnearby-mcp"
         ],
         "env": {}
       }
     }
   }
   ```

## Connect locally without Docker

### Prerequisites

- Node.js 18+ installed
- npm or yarn
- Cursor IDE

### Setup Instructions

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Build the project:**

   ```bash
   npm run build
   ```

3. **Test the MCP server:**

   ```bash
   npm start
   ```

4. **Add to your Cursor MCP configuration:**

   ```json
   {
     "mcpServers": {
       "busnearby": {
         "command": "node",
         "args": ["/Users/shmuel/Desktop/personal/busnearby-mcp/dist/main.js"],
         "env": {}
       }
     }
   }
   ```

   **Important:** Replace the path with your actual project path.

5. **Restart Cursor** to load the new MCP server

## Available Tools

### `geocode`

Convert location queries to coordinates.

**Parameters:**

- `locale`: "he" or "en" (Hebrew or English)
- `query`: Location string (e.g., "תל אביב" or "Tel Aviv")

**Example:**

```json
{
  "locale": "he",
  "query": "תל אביב"
}
```

### `directions`

Get transit directions between locations.

**Parameters:**

- `fromPlace`: Starting location ("address::lat,lng")
- `toPlace`: Destination ("address::lat,lng")
- `locale`: "he" or "en" (default: "he")
- `arriveBy`: Optimize for arrival time (default: false)
- `wheelchair`: Wheelchair accessible (default: false)
- `mode`: Transport modes (default: "WALK,TRANSIT")
- `numItineraries`: Number of routes (default: 3)
- `date`: Trip date (YYYY-MM-DD, optional)
- `time`: Trip time (HH:MM, optional)

## Docker Commands

```bash
# Build the image
docker build -t busnearby-mcp .

# Run with docker-compose
docker-compose up -d

# Run interactively for testing
docker run --rm -i busnearby-mcp

# Test MCP protocol
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{"tools":{}},"clientInfo":{"name":"test","version":"1.0.0"}}}' | docker run --rm -i busnearby-mcp
```

## Development

### Local Development

```bash
npm install
npm run dev
```

### Build and Test

```bash
npm run build
npm start
npm run test:e2e
```

## Troubleshooting

### Docker Issues

- Ensure Docker is running
- Try rebuilding: `docker build --no-cache -t busnearby-mcp .`
- Check logs: `docker logs busnearby-mcp`

### Cursor Connection Issues

- Restart Cursor after configuration changes
- Check MCP configuration path is correct
- Verify Docker image exists: `docker images | grep busnearby-mcp`

### MCP Protocol Issues

- Test server directly: `echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{"tools":{}},"clientInfo":{"name":"test","version":"1.0.0"}}}' | docker run --rm -i busnearby-mcp`
- Check for JSON-RPC format in responses

## API Reference

This MCP server interfaces with the Bus Nearby API to provide:

- Location geocoding in multiple languages
- Multi-modal transit routing
- Real-time schedule information
- Accessibility features

All responses follow standard MCP protocol formatting with proper error handling.

## Contributing

Feel free to:

- 🐛 Report bugs or issues
- 💡 Suggest new features or improvements
- 📖 Improve documentation
- 🔧 Submit pull requests

**Getting Started:**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

All contributions are welcome and appreciated!
