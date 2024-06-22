<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import MySelect from '@/components/common/MySelect.vue'

const props = defineProps({
	operator: {
		type: Boolean,
		default: false,
	},
	client: {
		type: Boolean,
		default: false,
	},
	checklist: {
		type: Boolean,
		default: false,
	},
	category: {
		type: Boolean,
		default: false,
	},
})

const perModel: Ref<Range | String> = ref('Последние 30 дней')

const setRange = () => {
	let temp = Object.values(date.value)
	perModel.value = temp[0] + ' -- ' + temp[1]
}
const operModel = ref('Все')
const clientModel = ref('Все')
const catModel = ref('Все')
const checkModel = ref('--')
const date = ref('2019/03/01')
</script>

<template lang="pug">
.row.items-end
	component(:is="MySelect" filled bg="#ccc" label="Диапазон дат" v-model="perModel")
	div
		q-btn(flat round icon="mdi-calendar")
			q-popup-proxy( cover transition-show="scale" transition-hide="scale")
				q-date(v-model="date" range)
					.row.items-center.justify-end.q-gutter-sm
						q-btn(label="Cancel" color="primary" flat v-close-popup)
						q-btn(label="OK" color="primary" flat v-close-popup @click="setRange")

MySelect.q-mt-md(v-if="props.checklist" filled bg="#ccc" label="Чек-лист" v-model="checkModel")
MySelect.q-mt-md(v-if="props.operator" filled bg="#ccc" label="Оператор" v-model="operModel")
MySelect.q-mt-md(v-if="props.client" filled bg="#ccc" label="Клиент" v-model="clientModel")
MySelect.q-mt-md(v-if="props.category" filled bg="#ccc" label="Категория" v-model="catModel")

</template>

<style scoped lang="scss"></style>
