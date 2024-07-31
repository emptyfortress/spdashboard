<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDash } from '@/stores/dash'
import CreatePanelDialog from '@/components/dash/CreatePanelDialog.vue'
import { useRouter } from 'vue-router'

const dash = useDash()
const router = useRouter()

const dialog = ref(false)
const toggleDialog = () => {
	dialog.value = !dialog.value
}

const remove = () => {
	console.log(dash.activePanel)
}
const setActivePanel = (e: Panel) => {
	dash.setActivePanel(e)
}
const newpanel = ref(false)

const addpanelDialog = () => {
	newpanel.value = true
	dialog.value = true
}

// automatic reset newpanel value
watch(dialog, (val) => {
	if (!val) {
		newpanel.value = false
	}
})
</script>

<template lang="pug">
q-page
	.container
		q-tabs(active-color="primary")
			q-route-tab(:name="panel.name" :label="panel.label" v-for="panel in dash.panels" :key="panel.name" :to='panel.to' @click='setActivePanel(panel)')
			q-btn.q-ml-lg(flat round icon="mdi-plus" @click="addpanelDialog" dense) 

		router-view

	CreatePanelDialog(v-model="dialog" :newpanel='newpanel' @remove='remove')

	.setup
		q-btn(flat round icon="mdi-cog-outline" @click="toggleDialog" dense) 
</template>

<style scoped lang="scss">
.setup {
	position: fixed;
	top: 3.5rem;
	right: 1rem;
}
</style>
