<script setup lang="ts">
import { ref, onUpdated, onMounted } from 'vue'
import { useStore } from '@/stores/store'

// const props = defineProps({
// 	dialog: {
// 		type: Boolean,
// 		default: false,
// 	},
// })

const modelValue = defineModel()
const store = useStore()
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card
		q-card-section.row.items-center.q-pb-none
			.text-h6 Hello
			q-space
			q-btn(icon="mdi-close" flat round dense v-close-popup)

		q-card-section Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
		q-card-section
			// .dog 5555 {{ store.headsize }}
</template>

<style scoped lang="scss">
.dog {
	// font-size: v-bind(store.size + 'px');
}
</style>
