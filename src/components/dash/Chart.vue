<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from '@/stores/store'
import VueApexCharts from 'vue3-apexcharts'
import { sparkOptions, sparkOptions1 } from '@/stores/graphOptions'

const props = defineProps<{
	item: Widget
}>()

const store = useStore()

const series1 = [{ name: 'Вызовы', data: [55, 57, 65, 70, 77, 80, 67] }]
const series2 = [{ name: 'AHT', data: [49, 43, 65, 83, 95, 46, 67] }]

const headsize = computed(() => {
	return store.activeWidget.design.title.fontSize + 'rem'
})
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
</script>

<template lang="pug">
q-card.chart
	.head(v-if="props.item.design.title.use")
		span(v-if="props.item.design.title.data") 123
		span(v-else) {{ props.item.design.title.text}}

	.subhead(v-if="props.item.design.subtitle.use")
		span(v-if="props.item.design.subtitle.data") 123 
		span(v-else) {{ props.item.design.subtitle.text}}

	VueApexCharts(v-if='props.item.type == "spark"' type="area" height='100%' :options="sparkOptions" :series="series1")
</template>

<style scoped lang="scss">
.chart {
	width: 100%;
	height: 100%;
	padding-top: 1rem;
	position: relative;
}
.head,
.subhead {
	position: absolute;
	top: 0;
	left: 0;
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
