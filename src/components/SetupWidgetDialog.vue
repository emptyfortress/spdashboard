<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useStore } from '@/stores/store'

const props = defineProps({
	size: {
		type: String,
		required: true,
		default: '1rem',
	},
})

const store = useStore()
const size = ref('')
const modelValue = defineModel()

watchEffect(() => {
	size.value = props.size
})
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
			.dig 5555 {{ size }}
</template>

<style scoped lang="scss">
.dig {
	font-size: v-bind(size);
}
</style>
