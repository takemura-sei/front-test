<script setup lang="ts">
const emit = defineEmits<{
  change: [value: string]
}>()

const selected = ref('総人口')
const types = ['総人口', '年少人口', '生産年齢人口', '老年人口']
</script>

<template>
  <div v-for="type in types" :key="type">
  <label>
    <input
      type="radio"
      v-model="selected"
      :value="type"
      @change="emit('change', selected)"
    />
    {{ type }}
  </label>
</div>
</template>