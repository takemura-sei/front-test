import { describe, vi, expect, it } from "vitest"
import { mountSuspended } from "@nuxt/test-utils/runtime"
import { ref } from "vue"
import PrefectureList from "~/components/PrefectureList.vue"
import { usePopulation } from "~/composables/usePopulation"
import { usePrefectures } from "~/composables/usePrefectures"

vi.mock("~/composables/usePrefectures", () => ({
  usePrefectures: vi.fn(() => ({
    data: ref(null),
    error: ref(null),
    pending: ref(false),
  })),
}))

vi.mock("~/composables/usePopulation", () => ({
  usePopulation: vi.fn(() => ({
    addPrefecture: vi.fn(),
    removePrefecture: vi.fn(),
  }))
}))

describe("PrefectureList", () => {
  it("pending のとき「読み込み中...」を表示する", async () => {
    vi.mocked(usePrefectures).mockImplementation(() => ({
      data: ref(null),
      error: ref(null),
      pending: ref(true),
    }) as any)

    const wrapper = await mountSuspended(PrefectureList)

    expect(wrapper.text()).toContain("読み込み中...")
  })
  it("error のとき「エラーが発生しました」を表示する", async () => {
    vi.mocked(usePrefectures).mockImplementation(() => ({
      data: ref(null),
      error: ref(new Error("エラー")),
      pending: ref(false),
    }) as any)

    const wrapper = await mountSuspended(PrefectureList)

    expect(wrapper.text()).toContain("エラーが発生しました")
  })
  it("データ取得成功時に都道府県名を表示する", async () => {
    vi.mocked(usePrefectures).mockImplementation(() => ({
      data: ref({
        message: null,
        result: [
          { prefCode: 1, prefName: "北海道" },
          { prefCode: 13, prefName: "東京都" },
        ],
      }),
      error: ref(null),
      pending: ref(false),
    }) as any)

    const wrapper = await mountSuspended(PrefectureList)

    expect(wrapper.text()).toContain("北海道")
    expect(wrapper.text()).toContain("東京都")
  })
  it("チェックを入れたとき addPrefecture が呼ばれる", async () => {
    const mockAddPrefecture = vi.fn()
    vi.mocked(usePopulation).mockImplementation(() => ({
      addPrefecture: mockAddPrefecture,
      removePrefecture: vi.fn(),
    }) as any)
    vi.mocked(usePrefectures).mockImplementation(() => ({
      data: ref({
        message: null,
        result: [{ prefCode: 1, prefName: "北海道" }],
      }),
      error: ref(null),
      pending: ref(false),
    }) as any)

    const wrapper = await mountSuspended(PrefectureList)
    const checkbox = wrapper.find("input[type='checkbox']")
    await checkbox.setValue(true)

    expect(mockAddPrefecture).toHaveBeenCalledWith(1)
  })
  it("チェックを外したとき removePrefecture が呼ばれる", async () => {
    const mockRemovePrefecture = vi.fn()
    vi.mocked(usePopulation).mockImplementation(() => ({
      addPrefecture: vi.fn(),
      removePrefecture: mockRemovePrefecture
    }) as any)
    vi.mocked(usePrefectures).mockImplementation(() => ({
      data: ref({
        message: null,
        result: [{ prefCode: 1, prefName: "北海道" }],
      }),
      error: ref(null),
      pending: ref(false),
    }) as any)

    const wrapper = await mountSuspended(PrefectureList)
    const checkbox = wrapper.find("input[type='checkbox']")
    await checkbox.setValue(true)
    await checkbox.setValue(false)

    expect(mockRemovePrefecture).toHaveBeenCalledWith(1)
  })
})