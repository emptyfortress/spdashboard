import { createRouter, createWebHistory } from 'vue-router'
import DashView from '@/views/DashView.vue'

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
			redirect: '/dash/0',
			name: 'home',
			component: DashView,
			meta: { title: 'Speech Drive', requiresAuth: false },
			children: [
				{
					path: 'dash/:id',
					name: 'dash',
					component: () => import('@/components/Dashboard.vue'),
					meta: { title: 'Speech Drive', requiresAuth: false },
					props: true,
				},
				{
					path: 'dash/:id/edit',
					name: 'edit',
					component: () => import('@/views/HomeView.vue'),
					// component: () => import('@/views/HomeView.vue'),
					meta: { title: 'Speech Drive', requiresAuth: false },
				},
			],
		},
		// {
		// 	path: '/new',
		// 	name: 'new',
		// 	component: () => import('@/views/HomeView.vue'),
		// 	meta: { title: 'Speech Drive', requiresAuth: false },
		// },
		// {
		// 	path: '/edit',
		// 	name: 'edit',
		// 	component: () => import('@/views/EditView.vue'),
		// 	meta: { transition: 'page', title: 'Speech Drive', requiresAuth: false },
		// },
	],
})

export default router
