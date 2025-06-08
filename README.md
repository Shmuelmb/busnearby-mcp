# Bus Nearby MCP

A Model Context Protocol (MCP) server that provides access to the Bus Nearby API for geocoding and location services.

## Project Structure

```
├── src/
│   ├── api/           # API client implementations
│   ├── types/         # Shared TypeScript interfaces
│   └── mcp/           # MCP server implementation
└── tests/
    └── e2e/           # End-to-end tests
```

## Features

- 🚍 **Geocoding API**: Convert location queries to geographical coordinates
- 🧪 **E2E Testing**: End-to-end tests with Playwright
- 🔌 **MCP Integration**: Bridge to LLMs via Model Context Protocol

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Shmuelmb/busnearby-mcp.git
cd busnearby-mcp
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers (for E2E tests):

```bash
npx playwright install
```

## Usage

### API Client

```typescript
import { GeocodeAPI, GeocodeRequest } from "./src/api"

const geocodeAPI = new GeocodeAPI()

const request: GeocodeRequest = {
  locale: "he",
  query: "תל אביב",
}

const results = await geocodeAPI.geocode(request)
console.log(results)
```

### Testing

Run E2E tests:

```bash
npm run test:e2e
```

Run E2E tests with UI:

```bash
npm run test:e2e:ui
```

### Development

Build the project:

```bash
npm run build
```

Run in development mode:

```bash
npm run dev
```

## API Endpoints

### GET /geocode

Convert a location query string to geographical coordinates.

**Parameters:**

- `locale` (required): The locale for the search (e.g., 'he', 'en')
- `query` (required): The location query to geocode

**Response:**

```json
[
  {
    "description": "תל אביב - יפו",
    "lat": 32.0853,
    "lng": 34.7818
  }
]
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the ISC License.
