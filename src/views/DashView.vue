<script setup lang="ts">
import { ref } from 'vue'
import { useDash } from '@/stores/dash'
import CreatePanelDialog from '@/components/dash/CreatePanelDialog.vue'
import { useRouter } from 'vue-router'

interface Panel {
	id: string
	label: string
	descr: string
	name: string
	gap: number
	radius: number
	flat: boolean
	marg: boolean
	def: boolean
}

const dash = useDash()
// const tabs = ref('home')
const router = useRouter()

const dialog = ref(false)
const toggleDialog = () => {
	dialog.value = !dialog.value
}
const create = (e: Panel) => {
	dash.tabs = e.name
}
const edit = () => {
	// dash.setActivePanel(active)
	router.push('/new')
}
</script>

<template lang="pug">
q-page
	.container
		q-tabs(v-model="dash.tabs" active-color="primary")
			q-tab(:name="panel.name" :label="panel.label" v-for="panel in dash.panels" :key="panel.id")
			q-btn.q-ml-xl(flat round icon="mdi-plus" @click="toggleDialog" dense) 
			q-btn(flat round icon="mdi-pencil-outline" @click="edit" dense) 

	CreatePanelDialog(v-model="dialog" @create="create")
</template>

<style scoped lang="scss"></style>
