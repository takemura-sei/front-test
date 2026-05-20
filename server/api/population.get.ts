import type { PopulationResponse } from '~/types/api'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const query = getQuery(event)

  const res = await $fetch<PopulationResponse>(
    `${config.yumemibaseUrl}/api/v1/population/composition/perYear?prefCode=${query.prefCode}`,
    {
      headers: {
        'X-API-KEY': config.yumemiApiKey,
      },
    }
  )

  return res
})