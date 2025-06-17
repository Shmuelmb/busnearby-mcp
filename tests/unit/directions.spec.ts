import { DirectionsAPI } from "../../src/api/directions";
import { DirectionsRequest, DirectionsResponse, OptimizeMode } from "../../src/types";

// Mock the global fetch function
global.fetch = jest.fn();

describe("DirectionsAPI", () => {
  const mockBaseUrl = "http://test-api.com";
  let api: DirectionsAPI;

  beforeEach(() => {
    api = new DirectionsAPI(mockBaseUrl);
    // Reset the fetch mock before each test
    (global.fetch as jest.Mock).mockClear();
  });

  const defaultParams: DirectionsRequest = {
    fromPlace: "1,2::start",
    toPlace: "3,4::end",
    arriveBy: false,
    locale: "en",
    wheelchair: false,
    mode: "TRANSIT,WALK",
    showIntermediateStops: true,
    numItineraries: 3,
    maxWalkDistance: "1000",
    optimize: OptimizeMode.QUICK,
    ignoreRealtimeUpdates: false,
  };

  it("should construct the correct URL with basic parameters", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    await api.getDirections(defaultParams);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const calledUrl = (global.fetch as jest.Mock).mock.calls[0][0];
    const url = new URL(calledUrl);

    expect(url.origin).toBe(mockBaseUrl);
    expect(url.pathname).toBe("/directions");
    expect(url.searchParams.get("fromPlace")).toBe(defaultParams.fromPlace);
    expect(url.searchParams.get("toPlace")).toBe(defaultParams.toPlace);
    expect(url.searchParams.get("arriveBy")).toBe(String(defaultParams.arriveBy));
    expect(url.searchParams.get("locale")).toBe(defaultParams.locale);
    expect(url.searchParams.get("wheelchair")).toBe(String(defaultParams.wheelchair));
    expect(url.searchParams.get("mode")).toBe(defaultParams.mode);
    expect(url.searchParams.get("showIntermediateStops")).toBe(String(defaultParams.showIntermediateStops));
    expect(url.searchParams.get("numItineraries")).toBe(String(defaultParams.numItineraries));
    expect(url.searchParams.get("maxWalkDistance")).toBe(defaultParams.maxWalkDistance);
    expect(url.searchParams.get("optimize")).toBe(defaultParams.optimize);
    expect(url.searchParams.get("ignoreRealtimeUpdates")).toBe(String(defaultParams.ignoreRealtimeUpdates));
    expect(url.searchParams.has("date")).toBe(false);
    expect(url.searchParams.has("time")).toBe(false);
  });

  it("should include date and time in URL when provided", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    const paramsWithDateTime: DirectionsRequest = {
      ...defaultParams,
      date: "2024-07-30",
      time: "10:00",
    };
    await api.getDirections(paramsWithDateTime);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const calledUrl = (global.fetch as jest.Mock).mock.calls[0][0];
    const url = new URL(calledUrl);

    expect(url.searchParams.get("date")).toBe(paramsWithDateTime.date);
    expect(url.searchParams.get("time")).toBe(paramsWithDateTime.time);
  });

  it("should correctly parse the JSON response", async () => {
    const mockResponseData: DirectionsResponse = {
      // Populate with example response data
      // This should match the structure of DirectionsResponse
      // For simplicity, let's use a minimal structure
      plan: {
        itineraries: [],
        from: { name: "Start", lat: 1, lng: 2, orig: "orig", vertexType: "TRANSIT" },
        to: { name: "End", lat: 3, lng: 4, orig: "orig", vertexType: "TRANSIT" },
        date: Date.now(),
      },
      elevationMetadata: {
        // Minimal placeholder for elevationMetadata
        ellipsoidToGeoidDifference: 0,
        geoidElevation: false
      }
// Removed the commented-out metadata block as it is no longer needed.
    };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponseData,
    });

    const result = await api.getDirections(defaultParams);
    expect(result).toEqual(mockResponseData);
  });

  it("should handle API errors gracefully", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    await expect(api.getDirections(defaultParams)).rejects.toThrow(
      "Directions API error: 500 Internal Server Error"
    );
  });

  // This is the "one more test" requested by the issue
  it("should construct the correct URL when wheelchair is true and optimize is TRIANGLE", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    const specificParams: DirectionsRequest = {
      ...defaultParams,
      wheelchair: true,
      optimize: OptimizeMode.TRIANGLE,
      locale: "he", // Different locale
    };
    await api.getDirections(specificParams);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const calledUrl = (global.fetch as jest.Mock).mock.calls[0][0];
    const url = new URL(calledUrl);

    expect(url.searchParams.get("wheelchair")).toBe("true");
    expect(url.searchParams.get("optimize")).toBe(OptimizeMode.TRIANGLE);
    expect(url.searchParams.get("locale")).toBe("he");
  });
});
