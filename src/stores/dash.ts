import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useDash = defineStore('dash', () => {
	const router = useRouter()
	const index = ref(0)
	const lastRoute = ref('/dash/0')

	const to = computed(() => {
		return '/dash/' + index.value
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
			to: '/dash/0',
			widgets: [
				{ x: 0, y: 0, w: 3, h: 4, i: 0 },
				{ x: 3, y: 0, w: 4, h: 4, i: 1 },
			],
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
		router.push(e.to)
		setActivePanel(e)

		if (e.def == true) {
			const ind = panels.value.findIndex((item) => {
				item.name == activePanel.value.name
			})
			panels.value.map((item) => {
				item.def = false
			})
			e.def = true
			panels.value.unshift(panels.value.splice(ind, 1)[0])
		}
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
		lastRoute.value = activePanel.value.to
	}

	const editMode = ref(false)
	const toggleEditMode = () => {
		editMode.value = !editMode.value
	}

	// widget logic *********************************
	const removeWidget = (ind: number) => {
		let tmp = activePanel.value.widgets.findIndex((e: any) => {
			e.i == ind
		})
		activePanel.value.widgets.splice(tmp, 1)
	}

	return {
		panels,
		activePanel,
		lastRoute,
		editMode,
		setActivePanel,
		setDefaultPanel,
		addPanel,
		removePanel,
		toggleEditMode,
		removeWidget,
	}
})
