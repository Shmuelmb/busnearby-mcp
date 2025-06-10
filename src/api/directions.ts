import { DirectionsRequest, DirectionsResponse } from "../types"
import { BASE_URL } from "../lib/constants"
export class DirectionsAPI {
  private baseUrl: string

  constructor(baseUrl: string = BASE_URL) {
    this.baseUrl = baseUrl
  }

  async getDirections(params: DirectionsRequest): Promise<DirectionsResponse> {
    const url = new URL("/directions", this.baseUrl)

    url.searchParams.append("fromPlace", params.fromPlace)
    url.searchParams.append("toPlace", params.toPlace)
    url.searchParams.append("arriveBy", params.arriveBy.toString())
    url.searchParams.append("locale", params.locale)
    url.searchParams.append("wheelchair", params.wheelchair.toString())
    url.searchParams.append("mode", params.mode)
    url.searchParams.append(
      "showIntermediateStops",
      params.showIntermediateStops.toString()
    )
    url.searchParams.append("numItineraries", params.numItineraries.toString())
    url.searchParams.append("maxWalkDistance", params.maxWalkDistance)
    url.searchParams.append("optimize", params.optimize)
    url.searchParams.append(
      "ignoreRealtimeUpdates",
      params.ignoreRealtimeUpdates.toString()
    )

    if (params.date) {
      url.searchParams.append("date", params.date)
    }

    if (params.time) {
      url.searchParams.append("time", params.time)
    }

    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error(
        `Directions API error: ${response.status} ${response.statusText}`
      )
    }

    const data = await response.json()
    return data as DirectionsResponse
  }
}
