import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDash = defineStore('dash', () => {
	const index = ref(0)

	const to = computed(() => {
		return '/' + index.value
	})

	const panels = ref([
		{
			label: 'Панель 1',
			name: 'home',
			descr: 'Это первая панель',
			gap: 0.5,
			radius: 4,
			flat: false,
			to: '/',
		},
	])

	const activePanel = ref(panels.value[0])

	const setActivePanel = (e: Panel) => {
		activePanel.value = e
	}

	const addPanel = (e: Panel) => {
		index.value += 1
		e.to = to.value
		panels.value.push(e)
	}

	return {
		panels,
		activePanel,
		setActivePanel,
		addPanel,
	}
})
