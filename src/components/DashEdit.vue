<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from '@/stores/store'
import SetupWidgetDialog from '@/components/SetupWidgetDialog.vue'

const store = useStore()

const dialog = ref(false)
</script>

<template lang="pug">
q-page(padding)
	.container
		div hello fuck
		q-slider(v-model="store.size" label :min="0.8" :max="3.0" :step="0.01" )

		.dig 256
		.dig {{store.headsize}}
		q-btn(unelevated color="primary" label="Отмена" @click="dialog = !dialog") 

	SetupWidgetDialog(v-model="dialog" :size="store.headsize")
</template>

<style scoped lang="scss">
.dig {
	font-size: v-bind('store.headsize');
}
</style>
