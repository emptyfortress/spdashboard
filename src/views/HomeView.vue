<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useStore } from '@/stores/store'
import { GridItem, GridLayout } from 'vue-ts-responsive-grid-layout'
import { templateRef, useElementSize } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useDash } from '@/stores/dash'

const router = useRouter()

const store = useStore()
const grid = ref(null)
const dash = useDash()

const remove = (e: number) => {
	let temp = [...document.getElementsByClassName('vue-grid-item')]
	temp.forEach((el) => el.classList.add('move'))
	store.removeWidget(e)
}
const { width } = useElementSize(grid)

const edit = (item: any) => {
	store.setContainer(width.value)
	store.setActiveWidget(item)
	router.push('/edit')
}
const back = () => {
	router.push('/')
}
</script>

<template lang="pug">
// q-page
	.container
		q-tab(v-model="dash.tab" active-color="primary")
			q-tab(:name="dash.activePanel.name" :label="dash.activePanel.label")
			q-btn.q-ml-xl(flat color="primary" label="Отмена" @click="back") 
			q-btn(unelevated color="primary" label="Сохранить" @click="back") 

		q-btn.fab(round color="primary" icon="mdi-plus" @click="store.addWidget" size="lg") 

GridLayout(ref="grid"
	:layout.sync="store.layout"
	:col-num="12"
	:row-height="30"
	:isDraggable="false"
	:isResizable="false"
	:is-bounded="true"
	:is-mirrored="false"
	:vertical-compact="true"
	:margin="[10, 10]"
	:show-close-button="false"
	:use-css-transforms="true")

	GridItem(v-for="( item ) in store.layout"
		:x="item.x"
		:y="item.y"
		:w="item.w"
		:h="item.h"
		:i="item.i"
		:show-close-button="false"
		:key="item.i")
		q-card
			q-card-section
				q-btn(flat color="primary" label="Настроить" @click="edit(item)" size="sm") 
			q-icon.close(name="mdi-close" @click="remove(index)" dense)
			// q-icon.resize(name="mdi-resize-bottom-right" @click="" dense size="16px") 

</template>

<style scoped lang="scss">
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
.move {
	transition: 0.2s ease all;
}
</style>
