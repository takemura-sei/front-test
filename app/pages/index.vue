<script setup lang="ts">
const selectedType = ref('総人口')
</script>

<template>
  <div>
    <PopulationTypeSelector @change="selectedType = $event" />
    <PrefectureList />
    <PopulationGraph :selectedType="selectedType" />
  </div>
</template>
