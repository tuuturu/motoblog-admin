import store from '@/store'

const authMiddleware = {
	install(Vue) {
		Vue.mixin({
			async beforeRouteEnter(to, from, next) {
				if (to.name === 'splashscreen') return next()

				await store.dispatch('auth/refreshUserinfo')

				if (!store.getters['auth/isAuthenticated'])
					await store.dispatch('auth/login')

				next()
			}
		})
	}
}

export default authMiddleware
