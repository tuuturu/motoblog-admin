import nanoid from 'nanoid'
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
	},
	post(state, post) {
		const match = state.posts.filter(p => p.id === post.id)

		if (match.length > 0) {
			const index = state.posts.indexOf(match[0])

			state.posts.splice(index, 1)
		}

		state.posts.push(post)
	},
	deletePost(state, { id }) {
		const match = state.posts.filter(p => p.id === id)

		if (match.length === 0)
			throw new Error(`Unable to delete post with id: ${id}`)

		const index = state.posts.indexOf(match[0])

		state.posts.splice(index, 1)
	}
}

const local_actions = {
	async refreshPosts({ commit, getters }) {
		if (getters['hasPosts']) return getters['posts']

		// TODO: actual fetching here
		// const { data } = axios.request({})

		commit('posts', mockPosts)
	},
	async getPosts({ dispatch, getters }) {
		dispatch('refreshPosts')

		return getters['posts']
	},
	async getPost({ dispatch, getters }, { id }) {
		dispatch('refreshPosts')

		const match = getters['posts'].filter(post => post.id === id)

		if (match.length > 0) return match[0]

		return null
	},
	async savePost({ commit }, post) {
		if (!post.id) post.id = nanoid()

		commit('post', post)

		return post.id
	}
}

export default {
	namespaced: true,
	state: local_state,
	getters: local_getters,
	mutations: local_mutations,
	actions: local_actions
}
