import Axios from 'axios'

const axios = Axios.create({
	baseURL: process.env.VUE_APP_POST_SERVICE_URL,
	withCredentials: true
})

const state = {
	trips: []
}

const getters = {
	hasTrips: state => state.trips.length > 0
}

const mutations = {
	trips(state, trips) {
		state.trips = trips
	}
}

const actions = {
	async refreshTrips({ commit, getters, rootState, dispatch }) {
		if (getters['hasTrips']) return getters['trips']

		await dispatch('auth/refreshUserinfo', null, { root: true })

		const url = '/trips?query=' + rootState.auth.user.sub
		const { data } = await axios.get(url)

		commit('trips', data)
	},
	async getTrips({ dispatch, getters }) {
		await dispatch('refreshTrips')

		return getters['trips']
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
