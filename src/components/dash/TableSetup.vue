<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'

const list = ref([
	{ name: 'John', id: 0, check: false },
	{ name: 'Joao', id: 1, check: false },
	{ name: 'Jean', id: 2, check: false },
])
const dragging = ref(false)
const checkMove = () => {
	console.log(111)
}
</script>

<template lang="pug">
p Выберите нужные колонки в таблице и настройте их порядок перетаскиванием:

draggable(
	:list="list"
	item-key="name"
	class="list-group"
	ghost-class="ghost"
	:move="checkMove"
	@start="dragging = true"
	@end="dragging = false")

	template(#item="{ element }")
		.list-group-item
			q-checkbox(v-model="element.check" :label="element.name" dense)


</template>

<style scoped lang="scss">
.list-group {
	// background: #ccc;
	// padding: 0.5rem 1rem;
}
.list-group-item {
	padding: 0.5rem 1rem;
	background: #fff;
}
.ghost {
	background: #dedede;
}
</style>
