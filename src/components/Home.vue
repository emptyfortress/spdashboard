<script setup lang="ts">
import { ref } from 'vue'
// import Trends1 from '@/components/Trends1.vue'
// import Events from '@/components/Events.vue'
// import Addition from '@/components/Addition.vue'
// import ChipCalendar1 from '@/components/ChipCalendar1.vue'
// import CreatePanelDialog from '@/components/dash/CreatePanelDialog.vue'
// import { useDash } from '@/stores/dash'

// interface Panel {
// 	id: string
// 	label: string
// 	descr: string
// 	name: string
// 	gap: number
// 	radius: number
// 	flat: boolean
// 	marg: boolean
// 	def: boolean
// }
// const dash = useDash()

// const tabs = ref('home')
// const dialog = ref(false)
// const toggleDialog = () => {
// 	dialog.value = !dialog.value
// }
// const create = (e: Panel) => {
// 	tabs.value = e.name
// }
</script>

<template lang="pug">
q-page(padding)
	.container
		div hello
</template>

<style scoped lang="scss">
.container {
	padding-top: 0;
	margin-top: 0;
}
.q-tab-panels {
	background: transparent;
}
</style>
