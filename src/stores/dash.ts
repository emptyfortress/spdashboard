import { defineStore } from 'pinia'

interface Panel {
	id: string
	label: string
	descr: string
	name: string
	gap: number
	radius: number
	flat: boolean
	marg: boolean
	def: boolean
}

export const useDash = defineStore({
	id: 'dash',
	state: () => ({
		panels: [
			{
				id: 'home',
				label: 'Панель 1',
				name: 'home',
				descr: 'По умолчанию',
				gap: 0.5,
				radius: 4,
				flat: false,
			},
		],
		tabs: 'home',
	}),
	getters: {
		activePanel: (state) => {
			return state.panels.find((item) => item.name == state.tabs)
		},
	},
	actions: {
		addPanel(e: any) {
			if (e.def) {
				this.panels.unshift(e)
			} else this.panels.push(e)
		},
		// setActivePanel(e: Panel) {
		// 	this.activePanel = e
		// },
	},
})
