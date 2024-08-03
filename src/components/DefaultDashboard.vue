<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
// import { GridItem, GridLayout } from 'vue-ts-responsive-grid-layout'
// import { GridLayout, GridItem } from 'vue-grid-layout-v3'
import { GridLayout, GridItem } from 'vue3-grid-layout-next'
import VueApexCharts from 'vue3-apexcharts'
import { sparkOptions, sparkOptions1 } from '@/stores/graphOptions'
import { useDash } from '@/stores/dash'
import { useElementSize } from '@vueuse/core'

const series1 = [{ name: 'Вызовы', data: [55, 57, 65, 70, 77, 80, 67] }]
const series2 = [{ name: 'AHT', data: [49, 43, 65, 83, 95, 46, 67] }]

const dash = useDash()

const layout = ref([
	// { x: 0, y: 0, w: 2, h: 2, i: '0', static: false },
	// { x: 2, y: 0, w: 2, h: 4, i: '1', static: true },
	{ x: 0, y: 0, w: 3, h: 3, i: 0 },
	{ x: 3, y: 0, w: 4, h: 5, i: 1 },
	{ x: 3, y: 0, w: 5, h: 4, i: 1 },
])

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

// grid-layout(:layout.sync="layout"
	:col-num="12"
	:row-height="30"
	:is-draggable="false"
	:is-resizable="false"
	:vertical-compact="true"
	:use-css-transforms="true"
	@layout-created="layoutCreatedEvent"
	@layout-before-mount="layoutBeforeMountEvent"
	@layout-mounted="layoutMountedEvent"
	@layout-ready="layoutReadyEvent"
	@layout-updated="layoutUpdatedEvent")

	grid-item(v-for="item in layout"
		:x="item.x"
		:y="item.y"
		:w="item.w"
		:h="item.h"
		:i="item.i"
		@resize="resizeEvent"
		@move="moveEvent"
		@resized="resizedEvent"
		@container-resized="containerResizedEvent"
		@moved="movedEvent")

		q-card
			VueApexCharts(type="area" :height='calcH(item.h)' :options="sparkOptions" :series="series1")

.all(ref='grid')
	div(v-for="item in layout" :key='item.i' :style='calcStyle(item.w, item.h)')
		q-card()
			VueApexCharts(type="area" :height='calcH(item.h)' :options="sparkOptions" :series="series2")


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

		q-card
			// div
				// VueApexCharts(type="area" :height='calcH(item.h)' :options="sparkOptions" :series="series1" :key='ind')

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
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	// justify-items: start;
	// align-items: stretch;
	column-gap: 1rem;
	row-gap: 0.5rem;
	// display: flex;
	// align-items: start;
	// justify-content: start;
	// gap: 10px;
}
.q-card {
	width: 100%;
	height: 100%;
	z-index: 1001;
}
</style>
