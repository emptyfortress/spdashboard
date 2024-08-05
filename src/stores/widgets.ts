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

	return {
		container,
		setContainer,
		activeWidget,
		setActiveWidget,
	}
})
