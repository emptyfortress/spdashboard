<script setup lang="ts"></script>

<template lang="pug">
.container
	.grid
		div
		div
		div
</template>

<style scoped lang="scss">
.grid {
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	justify-items: start;
	align-items: stretch;
	column-gap: 0.5rem;
	row-gap: 0.5rem;
	div {
		height: 100px;
		width: 100%;
		background: #fff;
	}
}
</style>
