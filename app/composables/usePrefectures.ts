import type { PrefecturesResponse } from '~/types/api'

export const usePrefectures = () => {
  const { data, error, pending } = useFetch<PrefecturesResponse | null>('/api/prefectures')
  return { data, error, pending }
}