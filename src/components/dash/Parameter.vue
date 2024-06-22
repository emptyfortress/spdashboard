<script setup lang="ts">
import { ref } from 'vue'
import MySelect from '@/components/common/MySelect.vue'
import MyInput from '@/components/common/MyInput.vue'

const props = defineProps({
	quantity: {
		type: Boolean,
		default: false,
	},
	percent: {
		type: Boolean,
		default: false,
	},
	param: {
		type: Boolean,
		default: false,
	},
	top: {
		type: Boolean,
		default: false,
	},
})

const quan = ref(1)
const percent = ref(100)
const par = ref()
const top = ref(false)
const options = ['АНT', 'Тишина', 'Процент речи клиента', 'Процент речи оператора']
</script>

<template lang="pug">

MyInput(v-if="props.quantity" filled bg="#ccc" label="Количество" v-model="quan" type="number")
MyInput.q-mt-md(v-if="props.percent" filled bg="#ccc" label="Процент" v-model="percent" type="number")
MySelect.q-mt-md(v-if="props.param" filled bg="#ccc" label="Параметр" v-model="par" :options="options")
q-checkbox.q-mt-md(v-if="props.top" v-model="top" label="Показать топ 10 значений" dense)
.q-mt-lg(v-if="props.quantity == false && props.percent == false && props.param == false && props.top == false") Нет настроек
</template>

<style scoped lang="scss"></style>
