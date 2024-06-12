import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { defaultWidget, des } from '@/stores/default'

export const useStore = defineStore('store', () => {
	const colNum = ref(12)
	const index = ref(1)
	const container = ref(1170)
	const setContainer = (num: number) => (container.value = num)
	const containerPx = computed(() => {
		return container.value + 'px'
	})

	const layout: any[] = reactive([{ ...defaultWidget }])

	const addWidget = () => {
		layout.push({
			x: (layout.length * 3) % (colNum.value || 12),
			y: layout.length + (colNum.value || 12), // puts it at the bottom
			w: 3,
			h: 3,
			i: index.value,
			set: false,
			type: '',
			design: { ...des },
		})
		index.value += 1
	}
	const removeWidget = (e: num) => {
		layout.splice(e, 1)
	}
	const activeWidget = ref({ ...defaultWidget })

	const setActiveWidget = (el: any) => {
		activeWidget.value = el
	}

	return {
		container,
		containerPx,
		setContainer,
		layout,
		addWidget,
		removeWidget,
		activeWidget,
		setActiveWidget,
	}
})
