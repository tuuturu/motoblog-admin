<template>
	<div
		class="WelcomeScreen"
		:style="{ backgroundImage: `url(${splash_image})` }"
	></div>
</template>

<script>
import splash_image from '@/assets/splash-screen.png'

export default {
	name: 'WelcomeScreen.vue',
	data: () => ({
		splash_image
	}),
	async mounted() {
		await this.$store.dispatch('auth/refreshUserinfo')

		if (this.$store.getters['auth/isAuthenticated'])
			await this.$router.push('/trips')
		else
			await this.$store.dispatch(
				'auth/login',
				process.env.VUE_APP_BASE_URL + '/trips'
			)
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

	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}

.button-container {
	display: flex;
	justify-content: space-between;

	width: 25%;
}
</style>
