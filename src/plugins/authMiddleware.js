const authMiddleware = {
	install(Vue) {
		Vue.mixin({
			beforeRouteEnter(to, from, next) {
				// eslint-disable-next-line
				if (from.name || to.name === 'splashscreen' || true) return next()

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
