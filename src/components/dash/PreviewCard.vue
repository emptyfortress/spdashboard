<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useStore } from '@/stores/store'
import VueApexCharts from 'vue3-apexcharts'
import { randomArray, randomNumber } from '@/utils/utils'
import { sparkOptions, areaOptions, barOptions, donutOptions } from '@/stores/graphOptions'
import { templateRef } from '@vueuse/core'

const store = useStore()
const over = ref(false)

const drop = (evt: DragEvent) => {
	over.value = false
	let item = JSON.parse(evt.dataTransfer!.getData('item'))
	store.activeWidget.set = true
	store.activeWidget.type = item.type
	store.activeWidget.name = item.text
}

const headsize = computed(() => {
	return store.activeWidget.design.title.fontSize + 'rem'
})
const subhead = computed(() => {
	return store.activeWidget.design.subtitle.fontSize + 'rem'
})

const series = ref([{ name: 'Параметр', data: randomArray(7, 80, 5) }])
const barSeries = ref([
	{
		data: [
			{ x: '1', y: 15 },
			{ x: '2', y: 93 },
			{ x: '3', y: 87 },
			{ x: '4', y: 59 },
			{ x: '5', y: 19 },
		],
	},
])
const donutSeries = randomArray(4, 20, 5)

const horizontal = ref(false)

const rotate = () => {
	horizontal.value = !horizontal.value
	barChart.value?.updateOptions({
		plotOptions: {
			bar: {
				horizontal: horizontal.value,
			},
		},
	})
}
const pie = ref('donut')

const switchPie = () => {
	if (pie.value == 'donut') {
		pie.value = 'pie'
	} else pie.value = 'donut'
}
const cols = [
	{
		name: 'name',
		required: true,
		label: 'Колонка 1',
		align: 'left',
		field: 'name',
		sortable: true,
	},
	{
		name: 'total',
		required: false,
		label: 'Колонка 2',
		align: 'right',
		field: 'total',
		sortable: true,
	},
	{
		name: 'good',
		required: false,
		label: 'Колонка 3',
		align: 'right',
		field: 'good',
		sortable: true,
	},
]
const rows = []
const barChart = ref<any>(null)
const sparkChart = ref<any>(null)

watch(
	() => store.refreshBar,
	() => {
		if (store.refreshBar == true) {
			barChart.value?.updateOptions({
				colors: ['#ff0000'],
			})
			nextTick()
			store.toggleBar()
		}
	}
)
</script>

<template lang="pug">
q-card.preview(flat)
	q-icon.resize(name="mdi-resize-bottom-right" @click="" dense size="16px") 

	q-btn(v-if="store.activeWidget && store.activeWidget.type == 'gist'" flat round dense icon="mdi-rotate-left-variant" @click="rotate") 
	q-btn(v-if="store.activeWidget && store.activeWidget.type == 'pie'" flat round dense @click="switchPie") 
		q-icon(:name="pie == 'pie' ? 'mdi-chart-donut' : 'mdi-chart-pie'")

	.cent(v-if="!store.activeWidget.set")
		.empty  Widget preview

	.cent(v-if="store.activeWidget.set && store.activeWidget.type == 'widget'")
		div {{ store.activeWidget.name}}

	.cent(v-if="store.activeWidget.set && store.activeWidget.type == 'digit'")
		.head
			span(v-if="store.activeWidget.design.title.data") 123 
			span(v-else) {{ store.activeWidget.design.title.text}}
		.subhead
			span(v-if="store.activeWidget.design.subtitle.data") 123 
			span(v-else) {{ store.activeWidget.design.subtitle.text}}

	.cent(v-if="store.activeWidget && store.activeWidget.type == 'percent'")
		.head
			span(v-if="store.activeWidget.design.title.data") 21%
			span(v-else) {{ store.activeWidget.design.title.text}}
		.subhead
			span(v-if="store.activeWidget.design.subtitle.data") 12% 
			span(v-else) {{ store.activeWidget.design.subtitle.text}}

	VueApexCharts(ref="sparkChart" v-if="store.activeWidget && store.activeWidget.type == 'spark'" type="area" height="100%" :options="sparkOptions" :series="series")
	VueApexCharts(v-if="store.activeWidget && store.activeWidget.type == 'chart'" type="area" height="100%" :options="areaOptions" :series="series")
	VueApexCharts(ref="barChart" v-if="store.activeWidget && store.activeWidget.type == 'gist'" type="bar" height="100%" :options="barOptions" :series="barSeries")
	VueApexCharts(v-if="store.activeWidget && store.activeWidget.type == 'pie' && pie == 'pie'" type="pie" height="100%" :options="donutOptions" :series="donutSeries" )
	VueApexCharts(v-if="store.activeWidget && store.activeWidget.type == 'pie' && pie == 'donut'" type="donut" height="100%" :options="donutOptions" :series="donutSeries" )

	q-table(v-if="store.activeWidget && store.activeWidget.type == 'table'" flat :rows="rows" :columns="cols")
</template>

<style scoped lang="scss">
.preview {
	height: 100%;
	overflow: hidden;
	padding-top: 1rem;
	.q-btn {
		position: absolute;
		top: 0;
		right: -2rem;
	}
}
.resize {
	position: absolute;
	right: 3px;
	bottom: 3px;
	cursor: pointer;
}
.cent {
	width: 100%;
	height: 100%;
	display: grid;
}
.empty {
	font-size: 0.8rem;
	text-align: center;
	color: #aaa;
	margin: auto;
}
.head {
	font-size: v-bind(headsize);
	font-weight: v-bind('store.activeWidget.design.title.fontWeight');
	line-height: 0.9;
	text-align: v-bind('store.activeWidget.design.title.align');
	font-style: v-bind('store.activeWidget.design.title.fontStyle');
	color: v-bind('store.activeWidget.design.title.fontColor');
}
.subhead {
	font-size: v-bind(subhead);
	font-weight: v-bind('store.activeWidget.design.subtitle.fontWeight');
	line-height: 0.9;
	text-align: v-bind('store.activeWidget.design.subtitle.align');
	font-style: v-bind('store.activeWidget.design.subtitle.fontStyle');
	color: v-bind('store.activeWidget.design.subtitle.fontColor');
}
</style>
