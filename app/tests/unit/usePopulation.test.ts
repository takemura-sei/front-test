import { vi, describe, it, beforeEach, beforeAll, expect } from "vitest"
import { ref } from "vue"
import type { PopulationResponse } from "../../types/api"

vi.stubGlobal("ref", ref)
const mockFetch = vi.fn()
vi.stubGlobal("$fetch", mockFetch)
const { usePopulation } = await import("../../composables/usePopulation")


describe("usePopulation", () => {
  beforeEach(() => {
    mockFetch.mockReset()
    const { populationMap } = usePopulation() 
    populationMap.value.clear()
  })
  it("addPrefecture: $fetchを正しいパラメータで呼び出す", async() => {
    const mockResponse: PopulationResponse = {
      message: null,
      result: {
        boundaryYear : 2020,
        data: [{ label: "総人口", data: [{ year: 2020, value: 1000000 }] }]
      },
    }
    mockFetch.mockResolvedValue(mockResponse)

    const { addPrefecture } = usePopulation()
    await addPrefecture(1)

    expect(mockFetch).toHaveBeenCalledWith("/api/population", {
      query: { prefCode: 1 },
    })
  })
  it("addPrefecture: レスポンスのデータをpopulationMapに保存する", async () => {
    const mockResponse: PopulationResponse = {
      message: null,
      result: {
        boundaryYear : 2020,
        data: [{ label: "総人口", data: [{ year: 2020, value: 1000000 }] }]
      },
    }
    mockFetch.mockResolvedValue(mockResponse)

    const { populationMap, addPrefecture } = usePopulation()
    await addPrefecture(1)

    expect(populationMap.value.get(1)).toEqual(mockResponse.result.data)
  })
  it("removePrefecture: 他の都道府県のデータは残る", () => {
    const { populationMap, removePrefecture } = usePopulation()
    populationMap.value.set(1, [{ label: "総人口", data: [] }])
    populationMap.value.set(2, [{ label: "総人口", data: [] }])

    removePrefecture(1)

    expect(populationMap.value.has(1)).toEqual(false)
    expect(populationMap.value.has(2)).toEqual(true)
  })
})