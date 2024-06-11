<script setup lang="ts">
import IconLogo from '@/components/icons/IconLogo.vue'
</script>

<template lang="pug">
q-layout(view="hHh LpR fFf")
	q-header.head
		q-toolbar(shrink)
			q-btn(dense flat round  @click="$router.push('/')")
				IconLogo.logo

			q-toolbar-title.gt-sm(@click="")
				span.hd Речевая платформа Speech Drive
			q-space

		// q-linear-progress(indeterminate color="accent" size="3px" v-show="isLoading")

	// Drawer(:show="mystore.leftDrawer" v-if="!isOper")

	q-page-container
		router-view(v-slot="{ Component, route }")
			transition(:name="route.meta.transition || 'fade'" :mode="route.meta.mode || 'out-in'")
				component(:is="Component")
</template>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';

.head {
	color: $text-bright;
	background: rgba(0, 0, 0, 0.07);
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
}

.q-linear-progress {
	position: fixed;
	top: 0;
	left: 0;
}

.hd {
	color: #777;
}
.logo {
	color: #1565c0;
	font-size: 2rem;
}
</style>
