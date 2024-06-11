<script setup lang="ts">
import { ref } from 'vue'
import { GridItem, GridLayout } from 'vue-ts-responsive-grid-layout'

const box = ref([
	{
		x: 0,
		y: 0,
		w: 3,
		h: 3,
		i: 0,
		set: false,
		data: { chart: 0, table: 2 },
	},
])
</script>

<template lang="pug">
GridLayout(
	:layout.sync="box"
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
		v-for="( item, index ) in box"
		:x="0"
		:y="0"
		:w="item.w"
		:h="item.h"
		:i="item.i"
		:show-close-button="false"
		:key="item.i")
		// q-btn(v-if="widgetSet && dropWidget.type == 'gist'" flat round dense icon="mdi-rotate-left-variant" @click="rotate") 
		// q-btn(v-if="widgetSet && dropWidget.type == 'pie'" flat round dense @click="switchPie") 
		// 	q-icon(:name="pie == 'pie' ? 'mdi-chart-donut' : 'mdi-chart-pie'")
		q-card.preview(flat @dragover.prevent="over = true" @dragleave.prevent="over = false" @drop="drop($event)"  :class="{over: over}")
			q-icon.resize(name="mdi-resize-bottom-right" @click="" dense size="16px") 

</template>

<style scoped lang="scss">
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
</style>
