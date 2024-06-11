import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

declare module 'vue-router' {
	interface RouteMeta {
		// is optional
		isAdmin?: boolean
		// must be declared by every route
		requiresAuth: boolean
		title: string
	}
}

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
			meta: { title: 'Speech Drive', requiresAuth: false },
		},
		{
			path: '/edit',
			name: 'edit',
			component: () => import('@/views/EditView.vue'),
			meta: { transition: 'page', title: 'Speech Drive', requiresAuth: false },
		},
	],
})

export default router
