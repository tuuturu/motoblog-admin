import { mockPosts } from '@/store/mock_data'

const local_state = {
	posts: []
}

const local_getters = {
	posts: state => {
		return state.posts
	},
	hasPosts: state => {
		return state.posts.length > 0
	}
}

const local_mutations = {
	posts(state, posts) {
		state.posts = posts
	}
}

const local_actions = {
	async getPosts({ commit, getters }) {
		if (getters['hasPosts']) return getters['posts']

		// TODO: actual fetching here
		// const { data } = axios.request({})

		commit('posts', mockPosts)

		return getters['posts']
	}
}

export default {
	namespaced: true,
	state: local_state,
	getters: local_getters,
	mutations: local_mutations,
	actions: local_actions
}
