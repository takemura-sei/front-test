<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const { populationMap } = usePopulation()
const { data } = usePrefectures()

const props = defineProps<{
  selectedType: string
}>()

const getName = (prefCode: number) => {
  return data.value?.result.find(p => p.prefCode === prefCode)?.prefName ?? String(prefCode)
}

const COLORS = ['#f87979', '#79c6f8', '#79f8a0', '#f8d079', '#c279f8', '#f8a079', '#79f8f0', '#d4f879']

const chartData = computed(() => {
  const datasets = []
  let i = 0

  for (const [prefCode, populationDataList] of populationMap.value) {
    const target = populationDataList.find(d => d.label === props.selectedType)
    const color = COLORS[i % COLORS.length]
    i++

    datasets.push({
      label: getName(prefCode),
      backgroundColor: color,
      borderColor: color,
      data: target?.data.map(d => d.value) ?? []
    })
  }

  return {
    labels: [1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025, 2030, 2035, 2040, 2045],
    datasets
  }
})

const chartOption = {
  responsive: true,
  maintainAspectRatio: false,
}
</script>

<template>
  <div style="height: 500px">
    <Line :data="chartData" :options="chartOption" />
  </div>
</template>