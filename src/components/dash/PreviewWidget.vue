<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from '@/stores/store'
import { GridItem, GridLayout } from 'vue-ts-responsive-grid-layout'
import PreviewCard from '@/components/dash/PreviewCard.vue'

const store = useStore()
// const over = ref(false)
//
// const drop = (evt: DragEvent) => {
// 	over.value = false
// 	let item = JSON.parse(evt.dataTransfer!.getData('item'))
// 	store.activeWidget.set = true
// 	store.activeWidget.type = item.type
// 	store.activeWidget.name = item.text
// }
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
		PreviewCard

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
