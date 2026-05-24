import type { PopulationResponse, PopulationData } from '~/types/api'

const populationMap = ref<Map<number, PopulationData[]>>(new Map())

export const usePopulation = () => {
  const addPrefecture = async (prefCode: number) => {
    const res = await $fetch<PopulationResponse>('/api/population', {
      query: { prefCode }
  })
    populationMap.value.set(prefCode, res.result.data)
  }


  const removePrefecture = (prefCode: number) => {
    populationMap.value.delete(prefCode)
  }
  
  return { populationMap, addPrefecture, removePrefecture }
}