import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { defPanel } from '@/stores/start'

export const useDash = defineStore('dash', () => {
	const router = useRouter()
	const index = ref(0)
	const lastRoute = ref('/dash/0')

	const to = computed(() => {
		return '/dash/' + index.value
	})

	const panels = ref(defPanel)

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
	const removeWidget = (i: number) => {
		let idx = activePanel.value.widgets.findIndex((e: any) => {
			return e.i == i
		})
		activePanel.value.widgets.splice(idx, 1)
	}
	let widgetIndex = 2

	const addWidget = () => {
		activePanel.value.widgets.push({
			x: (activePanel.value.widgets.length * 3) % 12,
			y: activePanel.value.widgets.length + 12, // puts it at the bottom
			w: 3,
			h: 3,
			i: widgetIndex,
			type: 'none',
			set: false,
			name: '',
			padtop: 16,
			design: {
				title: {
					use: true,
					text: 'Title',
					data: true,
					useDefault: true,
					fontSize: 1.7,
					fontWeight: 600,
					fontStyle: 'normal',
					align: 'left',
					fontColor: '#333',
					translateX: 30,
					translateY: 10,
				},
				subtitle: {
					use: true,
					text: 'Subtitle',
					data: false,
					useDefault: true,
					fontSize: 0.8,
					fontWeight: 400,
					fontStyle: 'normal',
					align: 'left',
					fontColor: '#333',
					translateX: 40,
					translateY: 35,
				},
			},
		})
		widgetIndex += 1
		editMode.value = false
		setTimeout(() => {
			editMode.value = true
		}, 10)
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
		addWidget,
	}
})
