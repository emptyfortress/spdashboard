<script setup lang="ts">
import { ref, computed } from 'vue'
import PreviewWidget from '@/components/dash/PreviewWidget.vue'
import WidgetTabs from '@/components/dash/WidgetTabs.vue'
import { useStore } from '@/stores/store'
import { useRouter } from 'vue-router'
import { useWidget } from '@/stores/widgets'

const widget = useWidget()
const store = useStore()
const splitterModel = ref(16)
const router = useRouter()

const hei = computed(() => {
	return 'height: ' + (window.innerHeight - 145) + 'px;'
})

const calcWidth = computed(() => {
	return 'width: ' + widget.container + 'px'
})
const back = () => {
	router.back()
	widget.setType('')
	widget.activeWidget.set = false
}

const save = () => {
	router.back()
	widget.setType('')
	widget.activeWidget.set = false
}
</script>

<template lang="pug">
q-page
	.back
		.cursor-pointer(@click="back")
			q-btn(flat round dense icon="mdi-arrow-left-circle-outline" size="lg") 
			span Назад
		.zg
			q-icon(name="mdi-widgets-outline" size="26px")
			span Конструктор виджетов
			.tip Настройте или отредактируйте виджет
		div

	.right(:style="calcWidth")
		PreviewWidget

		WidgetTabs
		q-card-actions.q-mt-md(align="center")
			q-btn(flat color="primary" label="Отмена" @click="back") 
			q-btn(flat color="primary" label="Сохранить" @click="save") 
</template>

<style scoped lang="scss">
.back {
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
.right {
	// background: pink;
	margin: 0 auto;
}
</style>
