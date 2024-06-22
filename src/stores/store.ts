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
	const refreshBar = ref(false)
	const toggleBar = () => {
		refreshBar.value = !refreshBar.value
	}

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
	const removeWidget = (e: number) => {
		layout.splice(e, 1)
	}
	const activeWidget = ref({ ...defaultWidget })
	// const activeWidget = ref(null)

	const setActiveWidget = (el: any) => {
		activeWidget.value = el
	}
	const setActiveWidgetType = () => {
		activeWidget.value.type = type.value
	}

	const type = ref()

	const setType = (el: string) => {
		type.value = el
	}

	return {
		activeWidget,
		setActiveWidget,
		setActiveWidgetType,
		container,
		containerPx,
		layout,
		refreshBar,
		type,
		setType,
		setContainer,
		addWidget,
		removeWidget,
		toggleBar,
	}
})
