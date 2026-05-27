<script setup lang="ts">
const { data, error, pending } = usePrefectures()
const { addPrefecture, removePrefecture } = usePopulation()

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
    <div v-if="pending" class="text-sm text-gray-500">読み込み中...</div>
    <div v-else-if="error" class="text-sm text-red-500">エラーが発生しました</div>
    <ul v-else class="grid grid-cols-6 gap-2">
      <li v-for="pref in data?.result" :key="pref.prefCode">
        <label class="flex items-center gap-1.5 cursor-pointer text-sm text-gray-700 hover:text-blue-600 select-none">
          <input
            type="checkbox"
            :value="pref.prefCode"
            class="accent-blue-500 cursor-pointer"
            @change="handleChange(pref.prefCode, $event)"
          />
          {{ pref.prefName }}
        </label>
      </li>
    </ul>
  </div>
</template>