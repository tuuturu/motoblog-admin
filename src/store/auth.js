import Axios from 'axios'

import config from '@/app.config'

const axios = Axios.create({
	baseURL: config.VUE_APP_GATEKEEPER_URL,
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
		const url = `${config.VUE_APP_GATEKEEPER_URL}/userinfo`

		try {
			const { data } = await axios.get(url)

			commit('user', data)
		} catch (error) {
			if (error.response && error.response.status === 401) commit('user', null)
			else throw error
		}
	},
	login(context, redirect = `${config.VUE_APP_BASE_URL}/`) {
		const encodedRedirect = encodeURIComponent(redirect)

		window.location.href =
			config.VUE_APP_GATEKEEPER_URL + `/login?redirect=${encodedRedirect}`
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
