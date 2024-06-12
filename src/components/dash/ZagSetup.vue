<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MyInput from '@/components/common/MyInput.vue'
import MySelect from '@/components/common/MySelect.vue'
import { useStore } from '@/stores/store'

const store = useStore()

const title = ref('')
const subtitle = ref('')
const zagAuto = ref(false)
const podzagAuto = ref(false)
const zagData = ref(false)
const podzagData = ref(false)

const wOptions = [300, 400, 500, 600]
const sOptions = ['normal', 'italic']
const aOptions = ['left', 'center', 'right']

onMounted(() => {
	title.value = 'fuck'
})
const name = ref('')
const size = ref(2)
const weight = ref()
const style = ref()
const align = ref()
const fontColor = ref()
</script>

<template lang="pug">
.grid2
	div
		MyInput(filled bg="#ccc" label="Заголовок" v-model="store.activeWidget.design.title.text" :disable="zagData")
		q-checkbox(v-model="store.activeWidget.design.title.data" dense label="Показывать данные вместо заголовка")
	div
		MyInput(filled bg="#ccc" label="Подзаголовок" v-model="store.activeWidget.design.subtitle.text" :disable="podzagData")
		q-checkbox(v-model="store.activeWidget.design.subtitle.data" dense label="Показывать данные вместо подзаголовка")

	fieldset
		legend Настройки
		q-checkbox(v-model="store.activeWidget.design.title.useDefault" dense label="Использовать настройки по умолчанию")
		.form.q-mt-md(v-if="!zagAuto")
			label Размер шрифта, rem:
			q-slider(v-model="store.activeWidget.design.title.fontSize" label :min="0.7" :max="4.0" :step="0.01" :disable="store.activeWidget.design.title.useDefault")
			label Жирность
			q-select(v-model="store.activeWidget.design.title.fontWeight" dense filled bg-color="#ccc" :options="wOptions" :disable="store.activeWidget.design.title.useDefault")
			label Стиль
			q-select(v-model="store.activeWidget.design.title.fontStyle" dense filled bg-color="#ccc" :options="sOptions" :disable="store.activeWidget.design.title.useDefault")
			label Выравнивание
			q-select(v-model="store.activeWidget.design.title.align" dense filled bg-color="#ccc" :options="aOptions" :disable="store.activeWidget.design.title.useDefault")
			label Цвет шрифта
			q-input(dense filled bg-color="#ccc" v-model="store.activeWidget.design.title.fontColor" :disable="store.activeWidget.design.title.useDefault")
				template(v-slot:append)
					q-icon(name="mdi-eyedropper-variant" class="cursor-pointer")
						q-popup-proxy(cover transition-show="scale" transition-hide="scale")
							q-color(v-model="store.activeWidget.design.title.fontColor")

	fieldset
		legend Настройки
		q-checkbox(v-model="store.activeWidget.design.subtitle.useDefault" dense label="Использовать настройки по умолчанию")
		.form.q-mt-md(v-if="!zagAuto")
			label Размер шрифта, rem:
			q-slider(v-model="store.activeWidget.design.subtitle.fontSize" label :min="0.7" :max="4.0" :step="0.01" )
			label Жирность
			q-select(v-model="store.activeWidget.design.subtitle.fontWeight" dense filled bg-color="#ccc" :options="wOptions" )
			label Стиль
			q-select(v-model="store.activeWidget.design.subtitle.fontStyle" dense filled bg-color="#ccc" :options="sOptions" )
			label Выравнивание
			q-select(v-model="store.activeWidget.design.subtitle.align" dense filled bg-color="#ccc" :options="aOptions" )
			label Цвет шрифта
			q-input(dense filled bg-color="#ccc" v-model="store.activeWidget.design.subtitle.fontColor" )
				template(v-slot:append)
					q-icon(name="mdi-eyedropper-variant" class="cursor-pointer")
						q-popup-proxy(cover transition-show="scale" transition-hide="scale")
							q-color(v-model="store.activeWidget.design.subtitle.fontColor")
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
</style>
