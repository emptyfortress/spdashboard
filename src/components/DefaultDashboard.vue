<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { GridLayout, GridItem } from 'vue3-grid-layout-next'
import { useDash } from '@/stores/dash'
import Chart from '@/components/dash/Chart.vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
	id: {
		type: String,
		required: true,
	},
})

const router = useRouter()
const route = useRoute()

const dash = useDash()

const show = ref(false)
onMounted(() => {
	setTimeout(() => {
		show.value = true
	}, 10)
})
const goToEdit = () => {
	router.push('/edit')
}

const remove = (item: any) => {}
</script>

<template lang="pug">
grid-layout(
	:layout.sync="dash.activePanel.widgets"
	:col-num="12"
	:row-height="30"
	:is-draggable="dash.editMode"
	:is-resizable="dash.editMode"
	:vertical-compact="true"
	:use-css-transforms="false"
	)

	grid-item(v-for="item in dash.activePanel.widgets"
		:x="item.x"
		:y="item.y"
		:w="item.w"
		:h="item.h"
		:i="item.i"
		)
		Chart(v-if='show')
		q-btn(v-if='dash.editMode' color="accent" label="Настроить" @click="goToEdit") 
		q-icon.close(v-if='dash.editMode' name="mdi-close" @click='remove(item)')

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
