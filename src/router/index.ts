import { createRouter, createWebHistory } from 'vue-router'
import DashView from '@/views/DashView.vue'
import { useDash } from '@/stores/dash'

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
			component: DashView,
			meta: { title: 'Speech Drive', requiresAuth: false },
			children: [
				{
					path: 'dash/0',
					name: 'default',
					component: () => import('@/components/DefaultDashboard.vue'),
					meta: { title: 'Speech Drive', requiresAuth: false },
					props: true,
				},
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

// redirect to lastRoute - default panel
router.beforeEach((to) => {
	const dash = useDash()
	if (to.path == '/') return dash.lastRoute
})

export default router
