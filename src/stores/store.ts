import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
	const colNum = ref(12)
	const index = ref(1)
	const container = ref(1170)
	const setContainer = (num: number) => (container.value = num)
	const containerPx = computed(() => {
		return container.value + 'px'
	})

	const layout: any[] = reactive([
		{
			x: 0,
			y: 0,
			w: 3,
			h: 3,
			i: 0,
			set: false,
			data: { chart: 0, table: 2 },
		},
	])

	const addWidget = () => {
		layout.push({
			x: (layout.length * 3) % (colNum.value || 12),
			y: layout.length + (colNum.value || 12), // puts it at the bottom
			w: 3,
			h: 3,
			i: index.value,
		})
		index.value += 1
	}
	const removeWidget = (e: num) => {
		layout.splice(e, 1)
	}

	return { container, containerPx, setContainer, layout, addWidget, removeWidget }
})
