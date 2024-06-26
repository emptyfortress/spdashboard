<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useStore } from '@/stores/store'
import VueApexCharts from 'vue3-apexcharts'
import { randomArray, randomNumber } from '@/utils/utils'
import { sparkOptions, areaOptions, barOptions, donutOptions } from '@/stores/graphOptions'
import { templateRef } from '@vueuse/core'
import GistForTable from '@/components/dash/GistForTable.vue'

const store = useStore()

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
const rows = [
	{ id: 0, col1: 'data', col2: 'data', col3: 'data', col4: 'data', col5: 'data' },
	{ id: 1, col1: 'data', col2: 'data', col3: 'data', col4: 'data', col5: 'data' },
]
const barChart = ref<any>(null)

const headTranslateX = computed(() => {
	return store.activeWidget.design.title.translateX + '%'
})
const headTranslateY = computed(() => {
	return store.activeWidget.design.title.translateY + 'px'
})
const subheadTranslateX = computed(() => {
	return store.activeWidget.design.subtitle.translateX + '%'
})
const subheadTranslateY = computed(() => {
	return store.activeWidget.design.subtitle.translateY + 'px'
})
const padtop = computed(() => {
	if (!store.activeWidget.set) return '0'
	if (store.type == 'table') return '.5rem'
	return store.activeWidget.design.title.use ? '2rem' : '0'
})
</script>

<template lang="pug">
q-card.preview(:class="{stat: store.type == 'table'}")
	q-icon.resize(name="mdi-resize-bottom-right" @click="" dense size="16px") 

	q-btn(v-if="store.activeWidget && store.activeWidget.type == 'gist'" flat round dense icon="mdi-rotate-left-variant" @click="rotate") 
	q-btn(v-if="store.activeWidget && store.activeWidget.type == 'pie'" flat round dense @click="switchPie") 
		q-icon(:name="pie == 'pie' ? 'mdi-chart-donut' : 'mdi-chart-pie'")

	.cent(v-if="!store.activeWidget.set")
		.empty  Widget preview

	div(v-if="store.activeWidget.set && store.activeWidget.type == 'digit'")
		.head(v-if="store.activeWidget.design.title.use")
			span(v-if="store.activeWidget.design.title.data") 123
			span(v-else) {{ store.activeWidget.design.title.text}}

		.subhead(v-if="store.activeWidget.design.subtitle.use")
			span(v-if="store.activeWidget.design.subtitle.data") 123 
			span(v-else) {{ store.activeWidget.design.subtitle.text}}

	VueApexCharts(v-if="store.activeWidget && store.activeWidget.type == 'spark'" type="area" height="100%" :options="sparkOptions" :series="series")
	VueApexCharts(v-if="store.activeWidget && store.activeWidget.type == 'chart'" type="area" height="100%" :options="areaOptions" :series="series")
	VueApexCharts(ref="barChart" v-if="store.activeWidget && store.activeWidget.type == 'bar'" type="bar" height="100%" :options="barOptions" :series="barSeries")
	VueApexCharts(v-if="store.activeWidget && store.activeWidget.type == 'pie' && pie == 'pie'" type="pie" height="100%" :options="donutOptions" :series="donutSeries" )
	VueApexCharts(v-if="store.activeWidget && store.activeWidget.type == 'pie' && pie == 'donut'" type="donut" height="100%" :options="donutOptions" :series="donutSeries" )

	template(v-if="store.activeWidget.set && store.type !== 'table'")
		.head(v-if="store.activeWidget.design.title.use")
			span(v-if="store.activeWidget.design.title.data") 123
			span(v-else) {{ store.activeWidget.design.title.text}}
		.subhead(v-if="store.activeWidget.design.subtitle.use")
			span(v-if="store.activeWidget.design.subtitle.data") 123
			span(v-else) {{ store.activeWidget.design.subtitle.text}}

	template(v-if="store.activeWidget.set && store.type == 'table'")
		.head1(v-if="store.activeWidget.design.title.use")
			span(v-if="store.activeWidget.design.title.data") 123
			span(v-else) {{ store.activeWidget.design.title.text}}
		.subhead1(v-if="store.activeWidget.design.subtitle.use")
			span(v-if="store.activeWidget.design.subtitle.data") 123
			span(v-else) {{ store.activeWidget.design.subtitle.text}}

	q-table(v-if="store.active == 'categ' && store.activeWidget.type == 'table'"
		flat
		:rows="rows"
		:columns="store.cols"
		:visible-columns="store.visible"
		:pagination="store.pagination")

	q-table(v-if="store.active == 'list' && store.activeWidget.type == 'table'"
		flat
		:rows="rows"
		:columns="store.cols1"
		:visible-columns="store.visible"
		:pagination="store.pagination")

		template(v-slot:body-cell-col2="props")
			q-td
				GistForTable
				// VueApexCharts(type="bar" height="100%" :options="barOptions" :series="barSeries")



</template>

<style scoped lang="scss">
.preview {
	height: 100%;
	overflow: hidden;
	padding-top: v-bind(padtop);
	.q-btn {
		position: absolute;
		top: 0;
		right: -2rem;
	}
	.head,
	.subhead {
		position: absolute;
		top: 0;
		left: 0;
	}
}
.head1 {
	font-size: v-bind(headsize);
	font-weight: v-bind('store.activeWidget.design.title.fontWeight');
	line-height: 0.9;
	text-align: v-bind('store.activeWidget.design.title.align');
	font-style: v-bind('store.activeWidget.design.title.fontStyle');
	color: v-bind('store.activeWidget.design.title.fontColor');
	padding-left: 0.4rem;
}
.subhead1 {
	font-size: v-bind(subhead);
	font-weight: v-bind('store.activeWidget.design.subtitle.fontWeight');
	line-height: 0.9;
	text-align: v-bind('store.activeWidget.design.subtitle.align');
	font-style: v-bind('store.activeWidget.design.subtitle.fontStyle');
	color: v-bind('store.activeWidget.design.subtitle.fontColor');
	margin-top: 0.2rem;
	padding-left: 0.4rem;
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
	place-items: center;
}
.empty {
	font-size: 0.8rem;
	text-align: center;
	color: #aaa;
}
.head {
	font-size: v-bind(headsize);
	font-weight: v-bind('store.activeWidget.design.title.fontWeight');
	line-height: 0.9;
	text-align: v-bind('store.activeWidget.design.title.align');
	font-style: v-bind('store.activeWidget.design.title.fontStyle');
	color: v-bind('store.activeWidget.design.title.fontColor');
	transform: translate(v-bind(headTranslateX), v-bind(headTranslateY));
}
.subhead {
	font-size: v-bind(subhead);
	font-weight: v-bind('store.activeWidget.design.subtitle.fontWeight');
	line-height: 0.9;
	text-align: v-bind('store.activeWidget.design.subtitle.align');
	font-style: v-bind('store.activeWidget.design.subtitle.fontStyle');
	color: v-bind('store.activeWidget.design.subtitle.fontColor');
	transform: translate(v-bind(subheadTranslateX), v-bind(subheadTranslateY));
}
</style>
