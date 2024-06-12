<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from '@/stores/store'
import { GridItem, GridLayout } from 'vue-ts-responsive-grid-layout'
import WidgetTabs from '@/components/dash/WidgetTabs.vue'
import PreviewCard from '@/components/dash/PreviewCard.vue'

const store = useStore()
const over = ref(false)

const drop = (evt: DragEvent) => {
	over.value = false
	let item = JSON.parse(evt.dataTransfer!.getData('item'))
	store.activeWidget.set = true
	store.activeWidget.type = item.type
	store.activeWidget.name = item.text
}
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
			PreviewCard

transition(name="fade")
	WidgetTabs(v-if="store.activeWidget.set" )
</template>

<style scoped lang="scss">
.preview {
	height: 100%;
	overflow: hidden;
	padding-top: 1rem;
	&.over {
		background: #dcffe4;
	}
	.vue-apexchart {
		transform: translateY(6px);
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
</style>
