<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useStore } from '@/stores/store'
import { GridItem, GridLayout } from 'vue-ts-responsive-grid-layout'
import { templateRef, useElementSize } from '@vueuse/core'

const store = useStore()
const grid = templateRef('grid')

const layout: any[] = reactive([
	{
		x: 0,
		y: 0,
		w: 3,
		h: 3,
		i: 'el',
		set: false,
		data: { chart: 0, table: 2 },
	},
])
</script>

<template lang="pug">
q-btn.fab(round color="primary" icon="mdi-plus" @click="add" size="lg") 

component.test(:is="GridLayout"
	ref="grid"
	:layout.sync="layout"
	:col-num="12"
	:row-height="30"
	:is-draggable="true"
	:is-resizable="true"
	:is-mirrored="false"
	:vertical-compact="true"
	:margin="[10, 10]"
	:show-close-button="false"
	:use-css-transforms="true")

	component(:is="GridItem"
		v-for="( item, index ) in layout"
			:enableEditMode="editMode"
			:x="item.x"
			:y="item.y"
			:w="item.w"
			:h="item.h"
			:i="item.i"
			:show-close-button="false"
			:key="item.i")
			q-card
				q-card-section
					q-btn(flat color="primary" label="Настроить" @click="setup($event, item, index)" size="sm") 
				q-icon.close(name="mdi-close" @click="remove(index)" dense)
				q-icon.resize(name="mdi-resize-bottom-right" @click="" dense size="16px") 

</template>

<style scoped lang="scss">
// .dig {
// 	font-size: v-bind('store.headsize');
// }
.fab {
	position: fixed;
	bottom: 2rem;
	right: 2rem;
	z-index: 6003;
	transition: 0.3s ease all;
}
.close {
	position: absolute;
	right: 3px;
	top: 3px;
	cursor: pointer;
}
:deep(.vue-grid-item) {
	touch-action: none;
	position: relative;
}
.resize {
	position: absolute;
	right: 3px;
	bottom: 3px;
	cursor: pointer;
}
.q-card {
	width: 100%;
	height: 100%;
	z-index: 1001;
}
:deep(.vue-grid-item.vue-grid-placeholder) {
	background: green !important;
	opacity: 0.2;
	z-index: -1;
}
:deep(.vue-draggable-dragging) {
	z-index: 1000;
	box-shadow: 3px 3px 17px rgba(0, 0, 0, 0.4);
}
</style>
