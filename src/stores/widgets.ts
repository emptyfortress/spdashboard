import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { defaultWidget, des } from '@/stores/default'

export const useWidget = defineStore('widget', () => {
	const container = ref(1200)
	const setContainer = (num: number) => (container.value = num)

	const activeWidget = ref({ ...defaultWidget })

	const setActiveWidget = (e: any) => {
		activeWidget.value = e
	}

	const visible = ref(['col0', 'col1', 'col2', 'col3'])
	const type = ref()
	const active = ref()

	const setType = (el: string) => {
		type.value = el
	}

	const setActiveWidgetType = () => {
		activeWidget.value.type = type.value
	}

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

	const calcList = computed(() => {
		return active.value == 'list' ? cols1.value : cols.value
	})

	const pagination = ref({
		sortBy: 'col1',
		descending: false,
		page: 1,
		rowsPerPage: 3,
	})

	const refreshBar = ref(false)
	const toggleBar = () => {
		refreshBar.value = !refreshBar.value
	}

	return {
		container,
		activeWidget,
		type,
		pagination,
		active,
		visible,
		calcList,
		cols,
		cols1,
		refreshBar,
		setContainer,
		setActiveWidget,
		setType,
		setActiveWidgetType,
		toggleBar,
	}
})
