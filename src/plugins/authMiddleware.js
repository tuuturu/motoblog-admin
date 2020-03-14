const authMiddleware = {
	install(Vue) {
		Vue.mixin({
			beforeRouteEnter(to, from, next) {
				if (from.name) return next()

				next(async vm => {
					await vm.$store.dispatch('auth/refreshUserinfo')

					if (!vm.$store.getters['auth/isAuthenticated'])
						await vm.$store.dispatch('auth/login')
				})
			}
		})
	}
}

export default authMiddleware
