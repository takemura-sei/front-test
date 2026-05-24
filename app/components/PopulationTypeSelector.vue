<script setup lang="ts">
const emit = defineEmits<{
  change: [value: string]
}>()

const selected = ref('総人口')
const types = ['総人口', '年少人口', '生産年齢人口', '老年人口']
</script>

<template>
  <div class="flex flex-row gap-4">
    <label
      v-for="type in types"
      :key="type"
      class="flex items-center gap-2 cursor-pointer text-sm text-gray-700 hover:text-blue-600 select-none"
    >
      <input
        type="radio"
        v-model="selected"
        :value="type"
        class="accent-blue-500 cursor-pointer"
        @change="emit('change', selected)"
      />
      {{ type }}
    </label>
  </div>
</template>