<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import MySelect from '@/components/common/MySelect.vue'
import ZagSetup from '@/components/dash/ZagSetup.vue'
import TableSetup from '@/components/dash/TableSetup.vue'
import Filter from '@/components/dash/Filter.vue'
import Parameter from '@/components/dash/Parameter.vue'
import { useWidget } from '@/stores/widgets'

const widget = useWidget()

const group = ref(null)

const options = [
	{
		label: 'Звонки',
		val: 'calls',
		types: [
			{ id: 0, label: 'Число', val: 'digit', filter: 1 },
			{ id: 1, label: 'Sparkline', val: 'spark', filter: 1 },
			{ id: 2, label: 'Area chart', val: 'chart', filter: 1 },
		],
	},
	{
		label: 'Категории',
		val: 'categ',
		types: [
			{ id: 0, label: 'Число', val: 'digit' },
			{ id: 1, label: 'Sparkline', val: 'spark' },
			{ id: 2, label: 'Area chart', val: 'chart' },
			{ id: 3, label: 'Bar chart vertical', val: 'bar' },
			{ id: 4, label: 'Bar chart horizontal', val: 'bar1' },
			{ id: 5, label: 'Таблица', val: 'table' },
		],
	},
	{
		label: 'Логические запросы',
		val: 'logic',
		types: [
			{ id: 0, label: 'Число', val: 'digit' },
			{ id: 1, label: 'Sparkline', val: 'spark' },
			{ id: 2, label: 'Area chart', val: 'chart' },
			{ id: 4, label: 'Pie chart', val: 'pie' },
			{ id: 5, label: 'Donut chart', val: 'donut' },
		],
	},
	{
		label: 'Слова/словари/эмоции',
		val: 'words',
		types: [
			{ id: 0, label: 'Число', val: 'digit' },
			{ id: 1, label: 'Sparkline', val: 'spark' },
			{ id: 2, label: 'Area chart', val: 'chart' },
		],
	},
	{
		label: 'Чек-листы',
		val: 'list',
		types: [
			{ id: 3, label: 'Bar chart', val: 'bar' },
			{ id: 4, label: 'Pie chart', val: 'pie' },
			{ id: 5, label: 'Donut chart', val: 'donut' },
			{ id: 6, label: 'Таблица', val: 'table' },
		],
	},
]

const tab = ref('data')

// const action = () => {
// 	store.toggleBar()
// }

const active = ref()

const types = [
	{ id: 0, label: 'Число', val: 'digit' },
	{ id: 1, label: 'Sparkline', val: 'spark' },
	{ id: 2, label: 'Area chart', val: 'chart' },
	{ id: 3, label: 'Bar chart', val: 'bar' },
	{ id: 4, label: 'Pie chart', val: 'pie' },
	{ id: 5, label: 'Таблица', val: 'table' },
]

const calcType = computed(() => {
	let item = options.find((el) => el.val == active.value)
	if (!!item) {
		return item.types
	}
	return []
})

const setActive = (el: string) => {
	active.value = el
	widget.active = el
}
const setActive1 = (el: string) => {
	widget.setType(el)
}
const checklist = computed(() => {
	if (active.value == 'list' && widget.type) return true
})
const client = computed(() => {
	if (active.value == 'categ' && widget.type == 'bar') return false
	return true
})
const operator = computed(() => {
	if (active.value == 'categ' && widget.type == 'digit') return false
	if (active.value == 'categ' && widget.type == 'spark') return false
	if (active.value == 'categ' && widget.type == 'chart') return false
	return true
})
const category = computed(() => {
	if (active.value == 'logic') return false
	if (active.value == 'words') return false
	return true
})
const word = computed(() => {
	if (active.value == 'words') return true
	return false
})

const quantity = computed(() => {
	if (active.value == 'calls' && widget.type == 'digit') return false
	if (active.value == 'logic') return false
	if (active.value == 'categ' && widget.type == 'table') return false
	return false
})
const percent = computed(() => {
	if (active.value == 'logic') return false
	if (active.value == 'categ' && widget.type == 'table') return false
	return false
})
const param = computed(() => {
	if (active.value == 'calls') return true
	if (active.value == 'logic') return false
	if (active.value == 'categ' && widget.type == 'table') return false
	return false
})
const top = computed(() => {
	if (active.value == 'categ' && widget.type == 'bar') return true
	return
})

const apply = () => {
	widget.activeWidget.set = true
	widget.setActiveWidgetType()
	if (widget.type == 'table') {
		tab.value = 'table'
	}
}
</script>

<template lang="pug">
.q-mt-lg.q-ml-md
	q-tabs(v-model="tab" align="left" active-color="primary" )
		q-tab(name="data" label="Настройка данных")
		q-tab(name="zag" label="Заголовок")
		q-tab(v-if="widget.activeWidget.type == 'table'" name="table" label="Таблица")
		// q-tab(name="style" label="Оформление")
		// q-tab(name="color" label="Цвет")

	q-tab-panels(v-model="tab" animated)
		q-tab-panel(name="data")
			.grid
				div
					.hd Источник данных
					q-list(dense)
						q-item(clickable v-for="item in options" :key="item.id" @click="setActive(item.val)" :class="{active: item.val == active}") 
							q-item-section(avatar)
								q-radio(v-model="active" :val="item.val")
							q-item-section
								q-item-label {{ item.label }}
				div
					.hd Тип виджета
					q-list(dense)
						transition-group(name="slide-right")
							q-item(clickable v-for="item in calcType" :key="item.id" @click="setActive1(item.val)" :class="{active: item.val == widget.type}" ) 
								q-item-section(avatar)
									q-radio(v-model="widget.type" :val="item.val")
								q-item-section
									q-item-label {{ item.label }}

				div
					.hd Фильтры
					Filter(v-if="active && widget.type" :checklist="checklist" :operator="operator" :client="client" :category="category" :word="word")

				div
					.hd Доп.параметры
					Parameter(v-if="active && widget.type" :quantity="quantity" :percent="percent" :param="param" :top="top")

			.text-right
				q-btn(unelevated color='primary' label='Применить' @click='apply' :disable='!widget.type') 

		q-tab-panel(name="zag")
			ZagSetup
		q-tab-panel(name="table")
			TableSetup
</template>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';

.q-tab-panel {
	min-height: 300px;
}
.grid {
	display: grid;
	grid-template-columns: 1fr 0.8fr 1fr 1fr;
	column-gap: 3rem;
}
.center {
	margin-top: 1rem;
}
.hd {
	font-size: 1rem;
	font-weight: 600;
	margin-bottom: 1rem;
}
.option {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	column-gap: 1rem;
	row-gap: 1rem;
	align-items: flex-end;
}
.top {
	grid-column: 2/-1;
	display: flex;
	gap: 2rem;
	align-items: center;
}
.active {
	background: $bgSelection;
}
.q-item {
	transition: all 0.3s ease;
	padding-left: 0;
}
</style>
