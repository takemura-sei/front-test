import { vi, describe, it, beforeEach, beforeAll, expect } from "vitest"
import { ref } from "vue"
import type { PopulationResponse } from "../../types/api"

vi.stubGlobal("ref", ref)
const mockFetch = vi.fn()
vi.stubGlobal("$fetch", mockFetch)
const { usePopulation } = await import("../../composables/usePopulation")


describe("usePopulation", () => {
  beforeEach(() => {
    mockFetch.mockReset() // $fetch の呼び出し履歴をリセット
    const { populationMap } = usePopulation() 
    populationMap.value.clear() // Mapの中身をクリア
  })
  it("addPrefecture: $fetchを正しいパラメータで呼び出す", async() => {
    // 1. Arrange: $fetch が返すダミーデータを設定
    const mockResponse: PopulationResponse = {
      message: null,
      result: {
        boundaryYear : 2020,
        data: [{ label: "総人口", data: [{ year: 2020, value: 1000000 }] }]
      },
    }
    mockFetch.mockResolvedValue(mockResponse) // 非同期で返す値をセット

    // 2. Act: 関数を呼ぶ
    const { addPrefecture } = usePopulation()
    await addPrefecture(1)

    // 3. Assert: $fetchが正しい引数で呼ばれたか検証
    expect(mockFetch).toHaveBeenCalledWith("/api/population", {
      query: { prefCode: 1 },
    })
  })
  it("addPrefecture: レスポンスのデータをpopulationMapに保存する", async () => {
    // Arange
    const mockResponse: PopulationResponse = {
      message: null,
      result: {
        boundaryYear : 2020,
        data: [{ label: "総人口", data: [{ year: 2020, value: 1000000 }] }]
      },
    }
    mockFetch.mockResolvedValue(mockResponse)

    // Act
    const { populationMap, addPrefecture } = usePopulation()
    await addPrefecture(1)

    // Assert
    expect(populationMap.value.get(1)).toEqual(mockResponse.result.data)
  })
  it("removePrefecture: 他の都道府県のデータは残る", () => {
    const { populationMap, removePrefecture } = usePopulation()
    // Arange
    populationMap.value.set(1, [{ label: "総人口", data: [] }])
    populationMap.value.set(2, [{ label: "総人口", data: [] }])

    // ACT
    removePrefecture(1)

    // Assert
    expect(populationMap.value.has(1)).toEqual(false)
    expect(populationMap.value.has(2)).toEqual(true)
  })
})