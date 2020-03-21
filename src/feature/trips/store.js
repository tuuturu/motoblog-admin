import Axios from 'axios'

const axios = Axios.create({
	baseURL: process.env.VUE_APP_POST_SERVICE_URL,
	withCredentials: true
})

const state = {
	tripsFetched: false,
	trips: []
}

const getters = {
	hasTrips: state => state.trips.length > 0
}

const mutations = {
	fetchedTrips(state) {
		state.tripsFetched = true
	},
	trips(state, trips) {
		state.trips = trips
	},
	trip(state, trip) {
		state.trips = [...state.trips, trip]
	}
}

const actions = {
	async refreshTrips({ commit, getters, rootState, dispatch }) {
		if (getters['hasTrips']) return getters['trips']

		await dispatch('auth/refreshUserinfo', null, { root: true })

		const url = '/trips?query=' + rootState.auth.user.sub
		const { data } = await axios.get(url)

		commit('trips', data)
		commit('fetchedTrips')
	},
	async getTrips({ dispatch, getters }) {
		await dispatch('refreshTrips')

		return getters['trips']
	},
	async createTrip({ commit }) {
		const { data } = await axios.post('/trips')

		commit('trip', data)

		return data
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
