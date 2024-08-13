<script setup lang="ts">
import { ref, computed } from 'vue'
import draggable from 'vuedraggable'
import { useStore } from '@/stores/store'
import MyInput from '@/components/common/MyInput.vue'
import MySelect from '@/components/common/MySelect.vue'
import { useWidget } from '@/stores/widgets'

const store = useStore()
const widget = useWidget()

// const list = ref([
// 	{ col0: 'data', col1: 'data', col2: 'data', col3: 'data', col4: 'data', col5: 'data' },
// 	{ col0: 'data', col1: 'data', col2: 'data', col3: 'data', col4: 'data', col5: 'data' },
// ])
const quan = ref(3)
const pages = ref(false)
const order = ref('up')
const sort = ref('АНТ')
const catvis = ref(true)
const dis = computed(() => {
	return '.dis'
})
</script>

<template lang="pug">

.grd
	div
		p Порядок и видимость колонок
		draggable(:list="widget.calcList"
			item-key="name"
			:filter="dis"
			ghost-class="ghost")

			template(#item="{ element }")
				.list-group-item(:class="{dis: element.id < 9}")
					q-checkbox(v-model="widget.visible" :val="element.name" :label="element.label" dense checked-icon="mdi-eye" unchecked-icon="mdi-eye-off" :disable="element.id < 9")

	.sort
		p Сортировка
		MySelect(label="Сортировать по" v-model="sort")
		.bl
			q-radio(v-model="order" val="up" label="Descending")
			q-radio(v-model="order" val="down" label="Ascending")

	.pagin
		p Количество строк в таблице
		MyInput(label="Показывать строк" v-model="quan" type="number")
		q-checkbox.q-mt-md(dense v-model="pages" label="Использовать страницы в таблице")


</template>

<style scoped lang="scss">
.bl {
	margin-top: 1rem;
	display: flex;
	flex-direction: column;
}
p {
	font-size: 0.9rem;
	font-style: italic;
}
.grd {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	// justify-items: start;
	// align-items: stretch;
	column-gap: 4rem;
	row-gap: 0.5rem;
}
.list-group-item {
	display: flex;
	gap: 1rem;
	// justify-content: space-between;
	padding: 0.5rem 1rem;
	background: #fff;
	cursor: pointer;
	// &:hover {
	// 	background: #efefef;
	// }
}
.ghost {
	background: #dedede;
}
</style>
