import { z } from "zod"

export type TransportMode =
  | "WALK"
  | "TRANSIT"
  | "TRAM"
  | "RAIL"
  | "BUS"
  | "CABLE_CAR"
  | "SHARE_TAXI"

export enum OptimizeMode {
  QUICK = "QUICK",
  SAFE = "SAFE",
  FLAT = "FLAT",
  GREENWAYS = "GREENWAYS",
  TRIANGLE = "TRIANGLE",
}

export type LocationPlace = `${string},${string}::${string}`

export const LocationPlaceSchema = z
  .string()
  .regex(
    /^.+::-?\d+\.?\d*,-?\d+\.?\d*$/,
    "Location must be in format 'formatted_address::lat,lng' (e.g., 'תל אביב::31.7776,35.2357')"
  ) as z.ZodType<LocationPlace>

export interface DirectionsRequest {
  fromPlace: LocationPlace
  toPlace: LocationPlace
  arriveBy: boolean
  locale: "he" | "en"
  wheelchair: boolean
  mode: string
  showIntermediateStops: boolean
  numItineraries: number
  maxWalkDistance: string
  optimize: OptimizeMode
  ignoreRealtimeUpdates: boolean
  time?: string
  date?: string
}

interface DirectionResponseFromAndTo {
  lat: number
  lng: number
  name: string
  orig: string
  vertexType: string
  parentStation?: string
  stopId?: string
  stopCode?: string
}

interface Currency {
  defaultFractionDigits: number
  symbol: string
  currency: string
  currencyCode: string
}

interface FareAmount {
  cents: number
  currency: Currency
}

interface Fare {
  fare: {
    regular: FareAmount
  }
  fareBackgroundColor?: string
  details: Record<string, any>
}

interface LegGeometry {
  points6: string
  length: number
}

interface Step {
  distance: number
  duration: number
  relativeDirection: string
  streetName: string
  nativeStreetName: string
  stayOn: boolean
  area: boolean
  bogusName: boolean
  lat: number
  lon: number
  dontAnnounce: boolean
  preAnnounce: boolean
  elevation: number[]
  absoluteDirection: string
  relativeExitDirection?: string
  exit?: string
}

interface LegLocation {
  name: string
  stopId?: string
  stopCode?: string
  lon: number
  lat: number
  arrival?: number
  departure?: number
  zoneId?: string
  stopIndex?: number
  stopSequence?: number
  formatted_address?: string
  vertexType: string
  boardAlightType?: string
  polygonId?: string
  orig?: string
  parentStation?: string
}

interface IntermediateStop extends LegLocation {}

interface Leg {
  startTime: number
  endTime: number
  departureDelay: number
  arrivalDelay: number
  realTime: boolean
  distance: number
  pathway: boolean
  mode: string
  route: string
  agencyTimeZoneOffset: number
  interlineWithPreviousLeg: boolean
  wheelchairAccessible: boolean
  from: LegLocation
  to: LegLocation
  legGeometry: LegGeometry
  rentedBike: boolean
  flexDrtAdvanceBookMin: number
  directionId: number
  transitLeg: boolean
  duration: number
  intermediateStops: IntermediateStop[]
  steps: Step[]
  agencyName?: string
  agencyUrl?: string
  routeColor?: string
  routeType?: number
  routeId?: string
  routeTextColor?: string
  headsign?: string
  agencyId?: string
  tripId?: string
  serviceDate?: string
  fare?: Fare
  routeIds?: string[]
  agencyIds?: string[]
  shortNames?: string[]
  routeColors?: string[]
  directionIds?: number[]
  headsigns?: string[]
  route_color?: string
  routeShortName?: string
  routeLongName?: string
  exitEntranceNote?: string
}

interface Itinerary {
  duration: number
  startTime: number
  endTime: number
  walkTime: number
  transitTime: number
  waitingTime: number
  walkDistance: number
  walkLimitExceeded: boolean
  elevationLost: number
  elevationGained: number
  transfers: number
  fare: Fare
  legs: Leg[]
  tooSloped: boolean
  callAndRide: boolean
}

export interface DirectionsResponse {
  elevationMetadata: {
    ellipsoidToGeoidDifference: number
    geoidElevation: boolean
  }
  plan: {
    date: number
    from: DirectionResponseFromAndTo
    itineraries: Itinerary[]
    to: DirectionResponseFromAndTo
  }
}
