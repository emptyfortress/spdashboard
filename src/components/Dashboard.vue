<script setup lang="ts">
const props = defineProps({
	id: {
		type: String,
		required: true,
		default: '',
	},
})
</script>

<template lang="pug">
h2 Hello {{ props.id }}
</template>

<style scoped lang="scss"></style>
