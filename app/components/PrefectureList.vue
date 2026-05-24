<script setup lang="ts">
import { usePrefectures } from '~/composables/usePrefectures'
import { usePopulation } from '~/composables/usePopulation'

const { data, error, pending } = usePrefectures()
const { populationMap, addPrefecture, removePrefecture } = usePopulation()

const handleChange = (prefCode: number, event: Event) => {
  const checked = (event.target as HTMLInputElement).checked
  if (checked) {
    addPrefecture(prefCode)
  } else {
    removePrefecture(prefCode)
  }
}
</script>

<template>
  <div>
    <div v-if="pending">読み込み中...</div>
    <div v-else-if="error">エラーが発生しました</div>
    <ul v-else>
      <li v-for="pref in data?.result" :key="pref.prefCode">
        {{ pref.prefName }}
        <input
          type="checkbox"
          :value="pref.prefCode"
          @change="handleChange(pref.prefCode, $event)"
        />
      </li>
    </ul>
  </div>
</template>