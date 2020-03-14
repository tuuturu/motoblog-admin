import Vue from 'vue'
import VueRouter from 'vue-router'

import trips from '@/feature/trips/routes'
import posts from '@/feature/posts/routes'

Vue.use(VueRouter)

function installRoutes(routeMapper) {
	const routes = []

	Object.keys(routeMapper).map(prefix => {
		const moduleRoutes = [...routeMapper[prefix]]

		moduleRoutes.map(item => {
			item.path = `/${prefix}${item.path}`

			routes.push(item)
		})
	})

	return routes
}

const routes = installRoutes({
	trips,
	posts
})

const router = new VueRouter({ routes })

export default router
