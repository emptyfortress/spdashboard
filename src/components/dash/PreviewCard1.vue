<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useStore } from '@/stores/store'
import VueApexCharts from 'vue3-apexcharts'
import { randomArray, randomNumber } from '@/utils/utils'
import {
	sparkOptions,
	areaOptions,
	barOptions,
	barOptions1,
	donutOptions,
} from '@/stores/graphOptions'
import { templateRef } from '@vueuse/core'
import GistForTable from '@/components/dash/GistForTable.vue'
import { useWidget } from '@/stores/widgets'

const props = defineProps<{
	item: Widget
}>()

const store = useStore()
const widget = useWidget()

const headsize = computed(() => {
	return props.item.design.title.fontSize + 'rem'
})
const subhead = computed(() => {
	return props.item.design.subtitle.fontSize + 'rem'
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
	return props.item.design.title.translateX + '%'
})
const headTranslateY = computed(() => {
	return props.item.design.title.translateY + 'px'
})
const subheadTranslateX = computed(() => {
	return props.item.design.subtitle.translateX + '%'
})
const subheadTranslateY = computed(() => {
	return props.item.design.subtitle.translateY + 'px'
})

const padtop = computed(() => {
	return props.item.design.padtop + 'px'
})

const show = ref(false)
onMounted(() => {
	setTimeout(() => {
		show.value = true
	}, 10)
})
</script>

<template lang="pug">
q-card.preview(:class="{stat: widget.type == 'table'}")
	// q-icon.resize(name="mdi-resize-bottom-right" dense size="16px") 

	// q-btn(v-if="props.item.type == 'bar'" flat round dense icon="mdi-rotate-left-variant" @click="rotate") 

	// q-btn(v-if="props.item.type == 'pie'" flat round dense @click="switchPie") 
		q-icon(:name="pie == 'pie' ? 'mdi-chart-donut' : 'mdi-chart-pie'")

	// .cent(v-if="!props.item.set")
	// 	.empty  Widget preview

	div(v-if="props.item.type == 'digit'")
		.head(v-if="props.item.design.title.use")
			span(v-if="props.item.design.title.data") 123
			span(v-else) {{ props.item.design.title.text}}

		.subhead(v-if="props.item.design.subtitle.use")
			span(v-if="props.item.design.subtitle.data") 123 
			span(v-else) {{ props.item.design.subtitle.text}}

	template(v-if='show')
		VueApexCharts(v-if="props.item.type == 'spark'" type="area" height="100%" :options="sparkOptions" :series="series")

		VueApexCharts(v-if="props.item.type == 'chart'" type="area" height="100%" :options="areaOptions" :series="series")
		VueApexCharts(ref="barChart" v-if="props.item.type == 'bar'" type="bar" height="100%" :options="barOptions" :series="barSeries")
		VueApexCharts(ref="barChart" v-if="widget.activeWidget.type == 'bar1'" type="bar" height="100%" :options="barOptions1" :series="barSeries")
		VueApexCharts(v-if="widget.activeWidget.type == 'pie'" type="pie" height="100%" :options="donutOptions" :series="donutSeries" )
		VueApexCharts(v-if="widget.activeWidget.type == 'donut'" type="donut" height="100%" :options="donutOptions" :series="donutSeries" )
		// VueApexCharts(v-if="props.item.type == 'pie' && pie == 'pie'" type="pie" height="100%" :options="donutOptions" :series="donutSeries" )
		// VueApexCharts(v-if="props.item.type == 'pie' && pie == 'donut'" type="donut" height="100%" :options="donutOptions" :series="donutSeries" )

	template(v-if="props.item.set && props.item.type !== 'table'")
		.head(v-if="props.item.design.title.use")
			span(v-if="props.item.design.title.data") 123
			span(v-else) {{ props.item.design.title.text}}
		.subhead(v-if="props.item.design.subtitle.use")
			span(v-if="props.item.design.subtitle.data") 123
			span(v-else) {{ props.item.design.subtitle.text}}

	template(v-if="props.item.set && props.item.type == 'table'")
		.head1(v-if="props.item.design.title.use")
			span(v-if="props.item.design.title.data") 123
			span(v-else) {{ props.item.design.title.text}}
		.subhead1(v-if="props.item.design.subtitle.use")
			span(v-if="props.item.design.subtitle.data") 123
			span(v-else) {{ props.item.design.subtitle.text}}

	q-table(v-if="widget.active == 'categ' && props.item.type == 'table'"
		flat
		:rows="rows"
		:columns="widget.cols"
		:visible-columns="widget.visible"
		:pagination="widget.pagination")

	q-table(v-if="widget.active == 'list' && props.item.type == 'table'"
		flat
		:rows="rows"
		:columns="widget.cols1"
		:visible-columns="widget.visible"
		:pagination="widget.pagination")

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
	font-weight: v-bind('props.item.design.title.fontWeight');
	line-height: 0.9;
	text-align: v-bind('props.item.design.title.align');
	font-style: v-bind('props.item.design.title.fontStyle');
	color: v-bind('props.item.design.title.fontColor');
	padding-left: 0.4rem;
}
.subhead1 {
	font-size: v-bind(subhead);
	font-weight: v-bind('props.item.design.subtitle.fontWeight');
	line-height: 0.9;
	text-align: v-bind('props.item.design.subtitle.align');
	font-style: v-bind('props.item.design.subtitle.fontStyle');
	color: v-bind('props.item.design.subtitle.fontColor');
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
	font-weight: v-bind('props.item.design.title.fontWeight');
	line-height: 0.9;
	text-align: v-bind('props.item.design.title.align');
	font-style: v-bind('props.item.design.title.fontStyle');
	color: v-bind('props.item.design.title.fontColor');
	transform: translate(v-bind(headTranslateX), v-bind(headTranslateY));
}
.subhead {
	font-size: v-bind(subhead);
	font-weight: v-bind('props.item.design.subtitle.fontWeight');
	line-height: 0.9;
	text-align: v-bind('props.item.design.subtitle.align');
	font-style: v-bind('props.item.design.subtitle.fontStyle');
	color: v-bind('props.item.design.subtitle.fontColor');
	transform: translate(v-bind(subheadTranslateX), v-bind(subheadTranslateY));
}
</style>
