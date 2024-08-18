<script setup lang="ts">
import { ref, computed } from 'vue'
import MyInput from '@/components/common/MyInput.vue'
import MySelect from '@/components/common/MySelect.vue'
import { useStore } from '@/stores/store'
import { useWidget } from '@/stores/widgets'

const store = useStore()
const widget = useWidget()

const title = ref('')
const subtitle = ref('')
const zagAuto = ref(false)
const podzagAuto = ref(false)
const zagData = ref(false)
const podzagData = ref(false)

const wOptions = [300, 400, 500, 600]
const sOptions = ['normal', 'italic']
const aOptions = ['left', 'center', 'right']

const name = ref('')
const size = ref(2)
const weight = ref()
const style = ref()
const align = ref()
const fontColor = ref()
const calcWidth = computed(() => {
	return (widget.container / 12) * widget.activeWidget.w * 1.8
})
const calcHeight = computed(() => {
	return widget.activeWidget.h * 31
})
</script>

<template lang="pug">
.padtop
	div Отступ сверху, px:
	q-slider(v-model="widget.activeWidget.design.padtop" label :min="0" :max="50" :step="0.01")
.grid2
	div
		q-checkbox(v-model="widget.activeWidget.design.title.use" dense label="Заголовок")
		MyInput.q-my-sm(filled bg="#ccc" v-model="widget.activeWidget.design.title.text" :disable="!widget.activeWidget.design.title.use")
		q-checkbox(v-model="widget.activeWidget.design.title.data" dense label="Показывать данные вместо заголовка")
	div
		q-checkbox(v-model="widget.activeWidget.design.subtitle.use" dense label="Подзаголовок")
		MyInput.q-my-sm(filled bg="#ccc" v-model="widget.activeWidget.design.subtitle.text" :disable="podzagData")
		q-checkbox(v-model="widget.activeWidget.design.subtitle.data" dense label="Показывать данные вместо подзаголовка")

	fieldset
		legend Настройки
		q-checkbox(v-model="widget.activeWidget.design.title.useDefault" dense label="Использовать настройки по умолчанию")
		.form.q-mt-md(v-if="!zagAuto")
			label Размер шрифта, rem:
			q-slider(v-model="widget.activeWidget.design.title.fontSize" label :min="0.7" :max="4.0" :step="0.01" :disable="widget.activeWidget.design.title.useDefault")
			label Жирность
			q-select(v-model="widget.activeWidget.design.title.fontWeight" dense filled bg-color="#ccc" :options="wOptions" :disable="widget.activeWidget.design.title.useDefault")
			label Стиль
			q-select(v-model="widget.activeWidget.design.title.fontStyle" dense filled bg-color="#ccc" :options="sOptions" :disable="widget.activeWidget.design.title.useDefault")
			label(v-if="widget.type !=='table'") Сдвиг по X:
			q-slider(v-if="widget.type !=='table'" v-model="widget.activeWidget.design.title.translateX" label :min="0" :max="calcWidth" :step="1" :disable="widget.activeWidget.design.title.useDefault")
			label(v-if="widget.type !=='table'") Сдвиг по Y:
			q-slider(v-if="widget.type !=='table'" v-model="widget.activeWidget.design.title.translateY" label :min="0" :max="calcHeight" :step="1" :disable="widget.activeWidget.design.title.useDefault")
			label Цвет шрифта
			q-input(dense filled bg-color="#ccc" v-model="widget.activeWidget.design.title.fontColor" :disable="widget.activeWidget.design.title.useDefault")
				template(v-slot:append)
					q-icon(name="mdi-eyedropper-variant" class="cursor-pointer")
						q-popup-proxy(cover transition-show="scale" transition-hide="scale")
							q-color(v-model="widget.activeWidget.design.title.fontColor")

	fieldset
		legend Настройки
		q-checkbox(v-model="widget.activeWidget.design.subtitle.useDefault" dense label="Использовать настройки по умолчанию")
		.form.q-mt-md(v-if="!zagAuto")
			label Размер шрифта, rem:
			q-slider(v-model="widget.activeWidget.design.subtitle.fontSize" label :min="0.7" :max="4.0" :step="0.01" )
			label Жирность
			q-select(v-model="widget.activeWidget.design.subtitle.fontWeight" dense filled bg-color="#ccc" :options="wOptions" )
			label Стиль
			q-select(v-model="widget.activeWidget.design.subtitle.fontStyle" dense filled bg-color="#ccc" :options="sOptions" )
			label(v-if="widget.type !=='table'") Сдвиг по X:
			q-slider(v-if="widget.type !=='table'" v-model="widget.activeWidget.design.subtitle.translateX" label :min="0" :max="calcWidth" :step="1" :disable="widget.activeWidget.design.subtitle.useDefault")
			label(v-if="widget.type !=='table'") Сдвиг по Y:
			q-slider(v-if="widget.type !=='table'" v-model="widget.activeWidget.design.subtitle.translateY" label :min="0" :max="calcHeight" :step="1" :disable="widget.activeWidget.design.subtitle.useDefault")
			label Цвет шрифта
			q-input(dense filled bg-color="#ccc" v-model="widget.activeWidget.design.subtitle.fontColor" )
				template(v-slot:append)
					q-icon(name="mdi-eyedropper-variant" class="cursor-pointer")
						q-popup-proxy(cover transition-show="scale" transition-hide="scale")
							q-color(v-model="widget.activeWidget.design.subtitle.fontColor")
// .text-right.q-mt-md
// 	q-btn(unelevated color='primary' label='Применить' @click='') 
</template>

<style scoped lang="scss">
:deep(.q-field__native) {
	font-size: 1.1rem;
}
.full {
	grid-column: 1/-1;
}
.grid2 {
	display: grid;
	grid-template-columns: 1fr 1fr;
	align-items: start;
	column-gap: 3rem;
	row-gap: 1rem;
}
legend {
	padding: 0 5px;
	font-size: 0.9rem;
}
fieldset {
	border: 3px double #ccc;
	padding: 1rem;
	width: 99%;
	&.dis {
		opacity: 0.6;
	}
}
.form {
	display: grid;
	grid-template-columns: auto 1fr;
	justify-items: stretch;
	align-items: center;
	column-gap: 1rem;
	row-gap: 0.5rem;
	font-size: 0.9rem;
}
.small {
	width: 70px;
}
.padtop {
	width: 500px;
	display: grid;
	grid-template-columns: auto 300px;
	column-gap: 1rem;
	row-gap: 0.5rem;
	font-size: 0.9rem;
	margin-top: 1.2rem;
	margin-bottom: 1rem;
}
</style>
