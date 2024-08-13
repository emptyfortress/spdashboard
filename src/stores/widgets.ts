import { ref } from 'vue'
import { defineStore } from 'pinia'
import { defaultWidget, des } from '@/stores/default'

export const useWidget = defineStore('widget', () => {
	const container = ref(1200)
	const setContainer = (num: number) => (container.value = num)

	const activeWidget = ref({ ...defaultWidget })

	const setActiveWidget = (e: any) => {
		activeWidget.value = e
	}

	const visible = ref(['col0', 'col1', 'col2', 'col3'])
	const type = ref()
	const active = ref()

	const setType = (el: string) => {
		type.value = el
	}

	const setActiveWidgetType = () => {
		activeWidget.value.type = type.value
	}

	const pagination = ref({
		sortBy: 'col1',
		descending: false,
		page: 1,
		rowsPerPage: 3,
	})

	return {
		container,
		activeWidget,
		type,
		pagination,
		active,
		visible,
		setContainer,
		setActiveWidget,
		setType,
		setActiveWidgetType,
	}
})
