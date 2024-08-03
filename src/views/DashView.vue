<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDash } from '@/stores/dash'
import CreatePanelDialog from '@/components/dash/CreatePanelDialog.vue'
import { useRouter, useRoute } from 'vue-router'

const dash = useDash()
const router = useRouter()
const route = useRoute()

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

const back = () => {
	router.back()
}
</script>

<template lang="pug">
q-page
	.container
		q-tabs(active-color="primary" v-if='route.name !== "edit"')
			q-route-tab(:name="panel.name" :label="panel.label" v-for="panel in dash.panels" :key="panel.name" :to='panel.to' @click='setActivePanel(panel)')
			q-btn.q-ml-lg(flat round icon="mdi-plus" @click="addpanelDialog" dense) 

		.save(v-else)
			q-btn(flat color="primary" label="Отмена" @click="back") 
			q-btn(unelevated color="primary" label="Сохранить" @click="") 

		router-view


	.setup(v-if="route.name !== 'edit'")
		q-btn(flat round icon="mdi-cog-outline" @click="toggleDialog" dense) 

	CreatePanelDialog(v-model="dialog" :newpanel='newpanel' @remove='remove')
</template>

<style scoped lang="scss">
.setup {
	position: fixed;
	top: 3.5rem;
	right: 1rem;
}
.save {
	padding-top: 0.5rem;
	text-align: right;
}
</style>
