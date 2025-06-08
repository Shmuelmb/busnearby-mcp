import { GeocodeRequest, GeocodeResponse } from "../types"

const BASE_URL = "https://api.busnearby.co.il"

export class GeocodeAPI {
  private baseUrl: string

  constructor(baseUrl: string = BASE_URL) {
    this.baseUrl = baseUrl
  }

  async geocode(params: GeocodeRequest): Promise<GeocodeResponse> {
    const url = new URL("/geocode", this.baseUrl)
    url.searchParams.append("locale", params.locale)
    url.searchParams.append("query", params.query)

    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error(
        `Geocode API error: ${response.status} ${response.statusText}`
      )
    }

    const data = await response.json()
    return data as GeocodeResponse
  }
}
