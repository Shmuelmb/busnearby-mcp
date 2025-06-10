import { test, expect } from "@playwright/test"
import { BASE_URL } from "../../src/lib/constants"
test.describe("Geocode API E2E Tests", () => {
  test("should return valid geocode results for Hebrew query", async ({
    request,
  }) => {
    const response = await request.get(`${BASE_URL}/geocode`, {
      params: {
        locale: "he",
        query: "תל אביב",
      },
    })

    expect(response.status()).toBe(200)

    const data = await response.json()
    expect(Array.isArray(data)).toBe(true)

    if (data.length > 0) {
      const firstResult = data[0]
      expect(firstResult).toHaveProperty("description")
      expect(firstResult).toHaveProperty("lat")
      expect(firstResult).toHaveProperty("lng")
      expect(typeof firstResult.description).toBe("string")
      expect(typeof firstResult.lat).toBe("number")
      expect(typeof firstResult.lng).toBe("number")
    }
  })

  test("should return valid geocode results for English query", async ({
    request,
  }) => {
    const response = await request.get(`${BASE_URL}/geocode`, {
      params: {
        locale: "en",
        query: "Jerusalem",
      },
    })

    expect(response.status()).toBe(200)

    const data = await response.json()
    expect(Array.isArray(data)).toBe(true)

    if (data.length > 0) {
      const firstResult = data[0]
      expect(firstResult).toHaveProperty("description")
      expect(firstResult).toHaveProperty("lat")
      expect(firstResult).toHaveProperty("lng")
      expect(typeof firstResult.description).toBe("string")
      expect(typeof firstResult.lat).toBe("number")
      expect(typeof firstResult.lng).toBe("number")
    }
  })

  test("should handle special characters in query", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/geocode`, {
      params: {
        locale: "he",
        query: "תל אביב - יפו",
      },
    })

    expect(response.status()).toBe(200)

    const data = await response.json()
    expect(Array.isArray(data)).toBe(true)
  })
})
