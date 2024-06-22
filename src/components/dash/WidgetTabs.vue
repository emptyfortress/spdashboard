<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import MySelect from '@/components/common/MySelect.vue'
import ZagSetup from '@/components/dash/ZagSetup.vue'
import { useStore } from '@/stores/store'
import Filter from '@/components/dash/Filter.vue'

const store = useStore()

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
			{ id: 3, label: 'Bar chart', val: 'bar' },
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
			{ id: 5, label: 'Таблица', val: 'table' },
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
			{ id: 5, label: 'Таблица', val: 'table' },
		],
	},
]
const tab = ref('data')

const action = () => {
	store.toggleBar()
}
const active = ref()
const type = ref()
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
}
const setActive1 = (el: string) => {
	type.value = el
}
const checklist = computed(() => {
	if (active.value == 'list' && type.value) return true
})
const client = computed(() => {
	if (active.value == 'categ' && type.value == 'bar') return false
	return true
})
const operator = computed(() => {
	if (active.value == 'categ' && type.value == 'digit') return false
	if (active.value == 'categ' && type.value == 'spark') return false
	if (active.value == 'categ' && type.value == 'chart') return false
	return true
})
const category = computed(() => {
	if (active.value == 'logic') return false
	return true
})
</script>

<template lang="pug">
.q-mt-lg.q-ml-md
	q-tabs(v-model="tab" align="left" active-color="primary" )
		q-tab(name="data" label="Настройка данных")
		q-tab(v-if="store.activeWidget.type == 'table'" name="table" label="Таблица")
		q-tab(name="zag" label="Заголовок")
		q-tab(name="style" label="Оформление")
		q-tab(name="color" label="Цвет")

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
							q-item(clickable v-for="item in calcType" :key="item.id" @click="setActive1(item.val)" :class="{active: item.val == type}" ) 
								q-item-section(avatar)
									q-radio(v-model="type" :val="item.val")
								q-item-section
									q-item-label {{ item.label }}

				div
					.hd Фильтры
					Filter(v-if="active && type" :checklist="checklist" :operator="operator" :client="client" :category="category")

				div
					.hd Доп.параметры
				
				// div
					.hd Дополнительные параметры
					.option
						component(:is="MySelect" filled bg="#ccc" label="Клиент" v-model="operModel")
						component(:is="MySelect" filled bg="#ccc" label="Категория" v-model="operModel")
						component(:is="MySelect" filled bg="#ccc" label="Группа" v-model="operModel")
						component(:is="MySelect" filled bg="#ccc" label="Оператор" v-model="operModel")
						component(:is="MySelect" filled bg="#ccc" label="Регион" v-model="operModel")
						component(:is="MySelect" filled bg="#ccc" label="Чек-лист" v-model="operModel")
						.row.items-end
							component(:is="MySelect" filled bg="#ccc" label="Диапазон дат" v-model="perModel")
							div
								q-btn(flat round icon="mdi-calendar")
									q-popup-proxy( cover transition-show="scale" transition-hide="scale")
										q-date(v-model="date" range)
											.row.items-center.justify-end.q-gutter-sm
												q-btn(label="Cancel" color="primary" flat v-close-popup)
												q-btn(label="OK" color="primary" flat v-close-popup @click="setRange")
						.top
							q-checkbox(v-model="check" label="Показать топ значения" dense)
							q-input(dense filled v-model="quan" type="number" )
							div штук


		q-tab-panel(name="table")
			p Здесь настраиваем таблицу
		q-tab-panel(name="zag")
			ZagSetup
		q-tab-panel(name="style")
			p Здесь настраиваем шрифты, легенды и тп
		q-tab-panel(name="color")
			p Здесь настраиваем темы и цвет
			q-btn(unelevated color="primary" label="Color" @click="action") 
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
}
</style>
