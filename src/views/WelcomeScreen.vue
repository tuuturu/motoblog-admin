<template>
	<div ref="container" class="WelcomeScreen">
		<IconLogo />
	</div>
</template>

<script>
import config from '@/app.config'
import { IconLogo } from '@tuuturu/vue/icons'

export default {
	name: 'WelcomeScreen.vue',
	components: {
		IconLogo
	},
	async mounted() {
		await this.$store.dispatch('auth/refreshUserinfo')

		this.$refs.container.style.backgroundColor = '#545975'

		setTimeout(async () => {
			if (this.$store.getters['auth/isAuthenticated'])
				await this.$router.push('/trips')
			else {
				await this.$store.dispatch(
					'auth/login',
					config.VUE_APP_BASE_URL + '/trips'
				)
			}
		}, 3000)
	}
}
</script>

<style lang="scss" scoped>
.WelcomeScreen {
	height: 100%;
	width: 100%;

	display: flex;
	justify-content: center;
	align-items: center;

	background-color: #34374c;
	transition: background-color ease-in 1.5s;
}

svg {
	position: absolute;
	right: 0;
	width: 75%;
	height: 75%;
}
</style>
