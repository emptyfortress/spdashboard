<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useWidget } from '@/stores/widgets'
import { GridItem, GridLayout } from 'vue-ts-responsive-grid-layout'
import PreviewCard1 from '@/components/dash/PreviewCard1.vue'
import PreviewCard from '@/components/dash/PreviewCard.vue'

const widget = useWidget()
const layout = ref<Widget[]>([])
layout.value.push(widget.activeWidget)
</script>

<template lang="pug">
GridLayout(
	:layout.sync="layout"
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
		:w="widget.activeWidget.w"
		:h="widget.activeWidget.h"
		:i="widget.activeWidget.i"
		:show-close-button="false"
		)
		PreviewCard1(:item='widget.activeWidget')
		// PreviewCard

</template>

<style scoped lang="scss">
:deep(.vue-grid-item) {
	touch-action: none;
	position: relative;
}
:deep(.vue-grid-item.vue-grid-placeholder) {
	background: green !important;
	opacity: 0.2;
	z-index: -1;
}
</style>
