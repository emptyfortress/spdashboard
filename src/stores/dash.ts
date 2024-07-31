import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useDash = defineStore('dash', () => {
	const router = useRouter()
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
			marg: true,
			def: true,
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

	const removePanel = () => {
		panels.value = panels.value.filter((item) => item.name !== activePanel.value.name)
		router.push('/')
		setActivePanel(panels.value[0])
	}

	const setDefaultPanel = () => {
		panels.value.map((item) => {
			item.def = false
		})
		activePanel.value.def = !activePanel.value.def

		const ind = panels.value.findIndex((item) => {
			item.name == activePanel.value.name
		})

		panels.value.unshift(panels.value.splice(ind, 1)[0])
	}

	return {
		panels,
		activePanel,
		setActivePanel,
		setDefaultPanel,
		addPanel,
		removePanel,
	}
})
