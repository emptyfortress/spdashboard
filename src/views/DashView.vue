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
	dash.toggleEditMode()
	location.reload()
}
const save = () => {
	dash.editMode = false
	setTimeout(() => {
		dash.editMode = false
	}, 10)
}
</script>

<template lang="pug">
q-page
	.container
		.save(v-if='dash.editMode')
			q-btn(flat color="primary" label="Отмена" @click="back") 
			q-btn(color="primary" icon='mdi-plus' label="Добавить виджет" @click="dash.addWidget") 
			q-btn(color="primary" label="Сохранить панель" @click="save") 

		q-tabs(v-else active-color="primary")
			q-route-tab(:name="panel.name" :label="panel.label" v-for="panel in dash.panels" :key="panel.name" :to='panel.to' @click='setActivePanel(panel)')
			q-btn.q-ml-lg(flat round icon="mdi-plus" @click="addpanelDialog" dense) 

		router-view

	.setup(v-if="route.name !== 'edit'")
		q-btn(flat round icon="mdi-pencil-outline" @click="toggleDialog" dense) 

	CreatePanelDialog(v-model="dialog" :newpanel='newpanel')
</template>

<style scoped lang="scss">
.setup {
	position: fixed;
	top: 3.5rem;
	right: 1rem;
}
.save {
	padding-top: 0.5rem;
	text-align: center;
	.q-btn {
		margin-right: 0.5rem;
	}
}
</style>
