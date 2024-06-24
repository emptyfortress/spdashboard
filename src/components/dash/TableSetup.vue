<script setup lang="ts">
import { ref, computed } from 'vue'
import draggable from 'vuedraggable'
import { useStore } from '@/stores/store'

const store = useStore()

const list = ref([
	{ col1: 'data', col2: 'data', col3: 'data', col4: 'data', col5: 'data' },
	{ col1: 'data', col2: 'data', col3: 'data', col4: 'data', col5: 'data' },
])

const calcColor = (e: string) => {
	return e == store.pagination.sortBy ? 'primary' : 'grey'
}
const sort = (e: string) => {
	store.pagination.descending = !store.pagination.descending
	store.tabcount += 1
}
</script>

<template lang="pug">
p Выберите нужные колонки в таблице и настройте их порядок перетаскиванием:

.grid
	draggable(
		:list="store.cols"
		item-key="name"
		ghost-class="ghost"
		)

		template(#item="{ element }")
			.list-group-item
				q-checkbox(v-model="store.visible" :val="element.name" :label="element.label" dense checked-icon="mdi-eye" unchecked-icon="mdi-eye-off")
				q-btn(v-if="store.pagination.sortBy == element.name" dense flat round @click="sort(element.name)") 
					q-icon(v-if="store.pagination.descending" name="mdi-arrow-down-thin" )
					q-icon(v-else name="mdi-arrow-up-thin" )

	.form lkajs

</template>

<style scoped lang="scss">
.grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	// justify-items: start;
	// align-items: stretch;
	column-gap: 1rem;
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
