<template>
	<div class="WelcomeScreen">
		<div class="button-container">
			<a href="https://localhost:4554/login?redirect=http://localhost:8080">
				Login
			</a>
			<button @click="logout">Logout</button>
		</div>
		<button @click="getInfo">Get userinfo</button>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'WelcomeScreen.vue',
	methods: {
		logout() {
			axios.post('https://localhost:4554/logout', {}, { withCredentials: true })
		},
		getInfo() {
			axios.get('https://localhost:4554/userinfo', { withCredentials: true })
		}
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
}

.button-container {
	display: flex;
	justify-content: space-between;

	width: 25%;
}
</style>
