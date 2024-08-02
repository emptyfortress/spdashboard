<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
// import { GridItem, GridLayout } from 'vue-ts-responsive-grid-layout'
import VueApexCharts from 'vue3-apexcharts'
import { sparkOptions, sparkOptions1 } from '@/stores/graphOptions'
import { useDash } from '@/stores/dash'
import { useElementSize } from '@vueuse/core'

const series1 = [{ name: 'Вызовы', data: [55, 57, 65, 70, 77, 80, 67] }]
const series2 = [{ name: 'AHT', data: [49, 43, 65, 83, 95, 46, 67] }]

const dash = useDash()

const layout = [
	{ x: 0, y: 0, w: 3, h: 3, i: 0 },
	{ x: 3, y: 0, w: 5, h: 5, i: 1 },
	{ x: 7, y: 0, w: 3, h: 3, i: 2 },
]

const grid = ref(null)
const { width } = useElementSize(grid)

const calcStyle = (w: number, h: number) => {
	const itemWidth = (width.value / 12) * w - 20
	const itemHeight = 30 * h + 20
	return 'width: ' + itemWidth + 'px; height: ' + itemHeight + 'px;'
	// return 'width: ' + itemWidth + 'px;'
}
const calcH = (h: number) => {
	return 30 * h + 20
}
const calcW = (w: number) => {
	return (width.value / 12) * w
}
</script>

<template lang="pug">
.all(ref='grid')
	q-card(v-for="item in layout" :key='item.i' :style="calcStyle(item.w, item.h)")
		div
			VueApexCharts(type="area" :height='calcH(item.h)' :width='calcW(item.w)' :options="sparkOptions" :series="series1")
			// VueApexCharts(type="area" :options="sparkOptions" :series="series1")

	// GridLayout(ref="grid"
		:layout.sync="layout"
		:col-num="12"
		:row-height="30"
		:is-draggable="false"
		:is-resizable="false"
		:is-bounded="true"
		:is-mirrored="false"
		:vertical-compact="true"
		:margin="[10, 10]"
		:show-close-button="false"
		:use-css-transforms="true")

		GridItem(v-for="( item ) in layout"
			:x="item.x"
			:y="item.y"
			:w="item.w"
			:h="item.h"
			:i="item.i"
			:show-close-button="false"
			:key="item.i")

			q-card(:style="calcStyle(item.w)")
				VueApexCharts(type="area" height="110px" :options="sparkOptions" :series="series1")

			// .test1(v-if="item.i === '0'" )
			// 	VueApexCharts(type="area" height="110px" :options="sparkOptions" :series="series1")
			// q-card(v-if="item.i === '1'")
				// VueApexCharts(type="area" height="150px" :options="sparkOptions1" :series="series2")
			// q-card(v-if="item.i === '0'")
			// 	VueApexCharts(type="area" height="110px" :options="sparkOptions" :series="series1")
			// q-card(v-if="item.i === '1'")
			// 	VueApexCharts(type="area" height="150px" :options="sparkOptions1" :series="series2")

// q-card.test
// 	VueApexCharts(type="area" height="110px" :options="sparkOptions" :series="series1")
</template>

<style scoped lang="scss">
.all {
	margin-top: 1rem;
	display: flex;
	align-items: start;
	width: 100%;
	gap: 10px;
}
.q-card {
	// width: 280px;
	// height: 100px;
	// z-index: 1001;
}
</style>
