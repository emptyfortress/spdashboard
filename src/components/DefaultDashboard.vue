<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue'
import { GridLayout, GridItem } from 'vue3-grid-layout-next'
import { useDash } from '@/stores/dash'
import Chart from '@/components/dash/Chart.vue'
import { useRouter, useRoute } from 'vue-router'
import { useElementSize } from '@vueuse/core'
import { useWidget } from '@/stores/widgets'
import PreviewCard1 from '@/components/dash/PreviewCard1.vue'

const props = defineProps({
	id: {
		type: String,
		required: true,
	},
})

const router = useRouter()
const route = useRoute()

const dash = useDash()
const widget = useWidget()

const show = ref(false)
onMounted(() => {
	setTimeout(() => {
		show.value = true
	}, 10)
})
const grid = ref(null)
const { width } = useElementSize(grid)

const edit = (item: any) => {
	widget.setContainer(width.value)
	widget.setActiveWidget(item)
	router.push('/edit')
}

const editMode = ref(false)

watch(
	() => dash.editMode,
	() => {
		editMode.value = dash.editMode
	}
)
</script>

<template lang="pug">
grid-layout(ref='grid'
	:layout.sync="dash.activePanel.widgets"
	:col-num="12"
	:row-height="30"
	:is-draggable="editMode"
	:is-resizable="editMode"
	:vertical-compact="true"
	:use-css-transforms="false"
	)

	grid-item(v-for="item in dash.activePanel.widgets"
		:x="item.x"
		:y="item.y"
		:w="item.w"
		:h="item.h"
		:i="item.i"
		:key='item.i'
		)
		PreviewCard1(:item='item')
		q-btn(v-if='dash.editMode' color="accent" label="Настроить" @click="edit(item)") 
		q-icon.close(v-if='dash.editMode' name="mdi-close" @click='dash.removeWidget(item.i)')

</template>

<style scoped lang="scss">
:deep(.vue-grid-item) {
	touch-action: none;
	position: relative;
	.q-btn {
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 2;
		transform: translate(-50%, -50%);
	}
}
:deep(.vue-grid-placeholder) {
	background: green;
}
.setup {
	position: fixed;
	top: 3.5rem;
	right: 1rem;
}
.close {
	position: absolute;
	top: 0;
	right: 0;
	cursor: pointer;
}
</style>
