<script setup lang="ts">
import { ref } from 'vue'
import { useDash } from '@/stores/dash'
import { uid } from 'quasar'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const props = defineProps({
	newpanel: {
		type: Boolean,
		required: true,
		default: false,
	},
})

const modelValue = defineModel()
const dash = useDash()

const panel = ref('Новая панель')

const descr = ref('Здесь описание')
const gap = ref(8)
const radius = ref(4)
const flat = ref(true)
const marg = ref(true)

const create = () => {
	const id = uid()
	let temp = {
		label: panel.value,
		descr: descr.value,
		name: id,
		gap: gap.value,
		radius: radius.value,
		flat: flat.value,
		marg: marg.value,
		def: def.value,
		to: '',
		widgets: [],
	}
	dash.addPanel(temp)
	modelValue.value = false
}

const save = () => {
	if (props.newpanel) {
		create()
	} else modelValue.value = false
}

const remove = () => {
	dash.removePanel()
	modelValue.value = false
}
const def = ref(false)
const edit = () => {
	dash.toggleEditMode()
	modelValue.value = false
}
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card
		q-btn.close(round color="negative" icon="mdi-close" v-close-popup)

		template(v-if='props.newpanel')
			q-card-section.row.items-top.q-pb-none
				div
					.text-overline.text-uppercase Создать панель
					.text-h6 {{ panel }}
				q-space
				q-icon.q-mr-lg(name="mdi-monitor-dashboard" color="primary" size="54px")

			q-card-section
				q-input(v-model="panel" label="Название")
				q-input(v-model="descr" label="Описание")

			.form
				.label Зазор между блоками, px
				q-input(v-model="gap" dense type="number" outlined bg-color="white")
				.label Радиус скругления, px
				q-input(v-model="radius" dense type="number" outlined bg-color="white")
				q-checkbox.q-mt-md(v-model="flat" dense label="Тень от виджетов")
				q-checkbox.q-mt-md(v-model="marg" dense label="Поля на странице (глобальная настройка)")

				q-checkbox.q-mt-md(v-model="def" dense label="Панель по умолчанию")

		template(v-else)
			q-card-section.row.items-top.q-pb-none
				div
					.text-overline.text-uppercase Редактировать панель
					.text-h6 {{ dash.activePanel.label }}
				q-space
				q-icon.q-mr-lg(name="mdi-monitor-dashboard" color="primary" size="54px")

			q-card-section
				q-input(v-model="dash.activePanel.label" label="Название")
				q-input(v-model="dash.activePanel.descr" label="Описание")

			.form
				.label Зазор между блоками, px
				q-input(v-model="gap" dense type="number" outlined bg-color="white")
				.label Радиус скругления, px
				q-input(v-model="radius" dense type="number" outlined bg-color="white")
				q-checkbox.q-mt-md(v-model="flat" dense label="Тень от карточек")
				q-checkbox.q-mt-md(v-model="marg" dense label="Поля на странице (глобальная настройка)")

				q-checkbox.q-mt-md(:model-value="dash.activePanel.def" @update:model-value='dash.setDefaultPanel(dash.activePanel.def)' dense label="Панель по умолчанию" :disable='dash.panels.length == 1')

		q-card-actions.q-ma-md
			q-btn(v-if='props.newpanel | dash.panels.length == 1' flat color="primary" label="Отмена" v-close-popup) 
			q-btn(v-else flat color="negative" label="Удалить" @click='remove') 
			q-space
			q-btn(:disable='props.newpanel' flat color="primary" label="Настроить виджеты" @click='edit') 
			q-btn(unelevated color="primary" label="Сохранить" @click="save") 
</template>

<style scoped lang="scss">
.q-card {
	min-width: 480px;
}
.form {
	display: grid;
	grid-template-columns: 1fr auto;
	justify-items: start;
	align-items: baseline;
	column-gap: 1rem;
	row-gap: 0.5rem;
	padding: 1rem;
	background: #eee;
	margin: 0.5rem 1rem;
}
.q-checkbox {
	grid-column: 1/-1;
}
</style>
