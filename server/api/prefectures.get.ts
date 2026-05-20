import type { PrefecturesResponse } from '~/types/api'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const res = await $fetch<PrefecturesResponse>(
    `${config.yumemibaseUrl}/api/v1/prefectures`,
    {
      headers: {
        'X-API-KEY': config.yumemiApiKey,
      },
    }
  )

  return res
})