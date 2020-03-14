import Axios from 'axios'

const axios = Axios.create({
	baseURL: process.env.VUE_APP_GATEKEEPER_URL,
	withCredentials: true
})

export const state = {
	user: null
}

export const getters = {
	isAuthenticated: state => state.user !== null,
	principal: state => state.user.sub
}

export const mutations = {
	user(state, user) {
		state.user = user
	}
}

export const actions = {
	async refreshUserinfo({ commit }) {
		const { data } = await axios.get('https://localhost:4554/userinfo')

		commit('user', data)
	},
	login(context, redirect = `${process.env.VUE_APP_BASE_URL}/`) {
		window.location.href =
			process.env.VUE_APP_GATEKEEPER_URL + `/login?redirect=${redirect}`
	},
	async logout() {
		await axios.post('/logout', {})
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
