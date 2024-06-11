import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
	// const count = ref(0)
	// const doubleCount = computed(() => count.value * 2)
	// function increment() {
	// 	count.value++
	// }
	const size = ref(2)
	const headsize = computed(() => {
		return size.value + 'rem'
	})

	return { size, headsize }
})
