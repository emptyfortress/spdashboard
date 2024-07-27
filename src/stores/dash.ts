import { ref } from 'vue'
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

export const useDash = defineStore('dash', () => {
	const panels = ref([
		{
			label: 'Панель 1',
			name: 'home',
			descr: 'По умолчанию',
			gap: 0.5,
			radius: 4,
			flat: false,
			to: '/',
		},
		{
			label: 'Панель 2',
			name: 'new',
			descr: 'По умолчанию',
			gap: 0.5,
			radius: 4,
			flat: false,
			to: '/test',
		},
	])

	const tab = ref('home')

	return { panels, tab }
})
