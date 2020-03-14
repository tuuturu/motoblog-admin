import Axios from 'axios'

const axios = Axios.create({
	baseURL: process.env.VUE_APP_GATEKEEPER_URL,
	withCredentials: true
})

export const state = {
	last_update: new Date(0),
	user: null
}

export const getters = {
	isAuthenticated: state => state.user !== null,
	userinfoIsFresh: state => {
		return new Date(Date.now()) - state.last_update < 60 * 1000
	}
}

export const mutations = {
	user(state, user) {
		state.user = user
	},
	update(state) {
		state.last_update = new Date(Date.now())
	}
}

export const actions = {
	async refreshUserinfo({ commit, getters }) {
		if (getters['userinfoIsFresh']) return

		const { data } = await axios.get('https://localhost:4554/userinfo')

		commit('user', data)
		commit('update')
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
