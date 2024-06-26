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
	const cols = ref([
		{
			id: 0,
			name: 'col0',
			required: false,
			label: 'Категория',
			align: 'left',
			field: 'col0',
			sortable: true,
		},
		{
			id: 10,
			name: 'col1',
			required: false,
			label: 'АНТ',
			align: 'left',
			field: 'col1',
			sortable: true,
		},
		{
			id: 11,
			name: 'col2',
			required: false,
			label: 'Тишина',
			align: 'left',
			field: 'col2',
			sortable: true,
		},
		{
			id: 12,
			name: 'col3',
			required: false,
			label: '% речи клиента',
			align: 'left',
			field: 'col3',
			sortable: true,
		},
		{
			id: 13,
			name: 'col4',
			required: false,
			label: '% речи оператора',
			align: 'left',
			field: 'col4',
			sortable: true,
		},
	])
	const cols1 = ref([
		{
			id: 0,
			name: 'col0',
			required: false,
			label: 'Оператор',
			align: 'left',
			field: 'col0',
			sortable: true,
		},
		{
			id: 1,
			name: 'col1',
			required: false,
			label: 'Оценка',
			align: 'left',
			field: 'col1',
			sortable: true,
		},
		{
			id: 2,
			name: 'col2',
			required: false,
			label: 'Оценка по вехам',
			align: 'left',
			field: 'col2',
			sortable: true,
		},
		{
			id: 10,
			name: 'col3',
			required: false,
			label: 'АНТ',
			align: 'left',
			field: 'col3',
			sortable: true,
		},
		{
			id: 11,
			name: 'col4',
			required: false,
			label: 'Тишина',
			align: 'left',
			field: 'col4',
			sortable: true,
		},
		{
			id: 12,
			name: 'col5',
			required: false,
			label: '% речи клиента',
			align: 'left',
			field: 'col5',
			sortable: true,
		},
		{
			id: 13,
			name: 'col6',
			required: false,
			label: '% речи оператора',
			align: 'left',
			field: 'col6',
			sortable: true,
		},
	])

	const active = ref()

	const calcList = computed(() => {
		return active.value == 'list' ? cols1.value : cols.value
	})

	const visible = ref(['col0', 'col1', 'col2', 'col3'])

	const pagination = ref({
		sortBy: 'col1',
		descending: false,
		page: 1,
		rowsPerPage: 3,
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
		cols,
		cols1,
		active,
		calcList,
		pagination,
		visible,
		setType,
		setContainer,
		addWidget,
		removeWidget,
		toggleBar,
	}
})
