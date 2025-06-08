export interface GeocodeLocation {
  description: string
  lat: number
  lng: number
  code?: string
  id?: string
  formatted_address?: string
  place_id?: string
}

export interface GeocodeRequest {
  locale: string
  query: string
}

export interface GeocodeResponse extends Array<GeocodeLocation> {}
