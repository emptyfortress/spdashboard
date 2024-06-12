<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from '@/stores/store'
import { GridItem, GridLayout } from 'vue-ts-responsive-grid-layout'
import WidgetTabs from '@/components/dash/WidgetTabs.vue'

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
</script>

<template lang="pug">
GridLayout(
	:layout.sync="store.layout"
	:col-num="12"
	:row-height="30"
	:is-draggable="false"
	:is-resizable="true"
	:is-mirrored="false"
	:vertical-compact="true"
	:margin="[10, 10]"
	:show-close-button="false"
	:use-css-transforms="true")

	GridItem(
		:x="0"
		:y="0"
		:w="store.activeWidget.w"
		:h="store.activeWidget.h"
		:i="store.activeWidget.i"
		:show-close-button="false"
		)
		// q-btn(v-if="widgetSet && dropWidget.type == 'gist'" flat round dense icon="mdi-rotate-left-variant" @click="rotate") 
		// q-btn(v-if="widgetSet && dropWidget.type == 'pie'" flat round dense @click="switchPie") 
		// 	q-icon(:name="pie == 'pie' ? 'mdi-chart-donut' : 'mdi-chart-pie'")
		q-card.preview(flat @dragover.prevent="over = true" @dragleave.prevent="over = false" @drop="drop($event)"  :class="{over: over}")
			q-icon.resize(name="mdi-resize-bottom-right" @click="" dense size="16px") 

			.cent(v-if="!store.activeWidget.set")
				.empty Перетащите сюда виджет или его тип

			.cent(v-if="store.activeWidget.set && store.activeWidget.type == 'widget'")
				div {{ store.activeWidget.name}}

			.cent(v-if="store.activeWidget.set && store.activeWidget.type == 'digit'")
				div
					.head 123 
					.subhead {{ store.activeWidget.name}}

			.cent(v-if="store.activeWidget && store.activeWidget.type == 'percent'")
				div
					.head 5%
					.subhead {{ store.activeWidget.name}}

transition(name="fade")
	WidgetTabs(v-if="store.activeWidget.set" )
</template>

<style scoped lang="scss">
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
.preview {
	height: 100%;
	overflow: hidden;

	&.over {
		background: #dcffe4;
	}
}
.resize {
	position: absolute;
	right: 3px;
	bottom: 3px;
	cursor: pointer;
}
:deep(.vue-grid-item) {
	touch-action: none;
	position: relative;
}
:deep(.vue-grid-item.vue-grid-placeholder) {
	background: green !important;
	opacity: 0.2;
	z-index: -1;
}
.vue-grid-item {
	position: relative;
	.q-btn {
		position: absolute;
		top: 0;
		right: -2rem;
	}
}
.cent {
	width: 100%;
	height: 100%;
	// display: flex;
	padding: 0.5rem;
	// justify-content: center;
	// align-items: center;
}
.empty {
	font-size: 0.8rem;
	text-align: center;
	color: #aaa;
	margin: auto;
}
</style>
