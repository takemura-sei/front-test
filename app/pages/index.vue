<script setup lang="ts">
const selectedType = ref('総人口')
</script>

<template>
  <div class="space-y-6">
    <section class="bg-white rounded-lg border border-gray-200 p-4">
      <h2 class="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">都道府県を選択</h2>
      <PrefectureList />
    </section>
    <section class="bg-white rounded-lg border border-gray-200 p-4 shrink-0">
      <h2 class="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">人口種別</h2>
      <PopulationTypeSelector @change="selectedType = $event" />
    </section>
    <section class="bg-white rounded-lg border border-gray-200 p-4 flex-1">
      <h2 class="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">人口推移</h2>
      <PopulationGraph :selectedType="selectedType" />
    </section>
  </div>
</template>
