<script setup lang="ts">
import { ref, computed } from 'vue'
import WidgetTree from '@/components/dash/WidgetTree.vue'
import PreviewWidget from '@/components/dash/PreviewWidget.vue'
import { useStore } from '@/stores/store'

const store = useStore()
const splitterModel = ref(16)

const hei = computed(() => {
	return 'height: ' + (window.innerHeight - 145) + 'px;'
})

const calcWidth = computed(() => {
	return 'width: ' + store.container + 'px'
})
</script>

<template lang="pug">
q-page()
	.back(@click="$router.back()")
		div
			q-btn(flat round dense icon="mdi-arrow-left-circle-outline" size="lg") 
			span Назад
		.zg
			q-icon(name="mdi-widgets-outline" size="26px")
			span Конструктор виджетов
			.tip Настройте виджет или выберите готовый из библиотеки
		div

	q-splitter.spli.q-mt-md(v-model="splitterModel" :limits="[0, 100]" :style="hei")
		template(v-slot:before)
			.q-px-md
				WidgetTree

		template(v-slot:after)
			.right(:style="calcWidth")
				PreviewWidget
</template>

<style scoped lang="scss">
.back {
	cursor: pointer;
	display: flex;
	justify-content: space-between;
}
.zg {
	margin-top: 1rem;
	font-size: 1.3rem;
	text-align: center;
	vertical-align: baseline;
	.q-icon {
		margin-right: 1rem;
		transform: translateY(-5px);
	}
}
.tip {
	color: #666;
	font-size: 0.9rem;
	text-align: center;
}
</style>
