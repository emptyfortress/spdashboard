<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { sparkOptions, sparkOptions1 } from '@/stores/graphOptions'

const props = defineProps<{
	item: Widget
}>()

const series1 = [{ name: 'Вызовы', data: [55, 57, 65, 70, 77, 80, 67] }]
const series2 = [{ name: 'AHT', data: [49, 43, 65, 83, 95, 46, 67] }]
</script>

<template lang="pug">
q-card.chart
	VueApexCharts(v-if='props.item.type == "spark"' type="area" height='100%' :options="sparkOptions" :series="series1")
</template>

<style scoped lang="scss">
.chart {
	width: 100%;
	height: 100%;
}
</style>
