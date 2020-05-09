import Axios from 'axios'

import config from '@/app.config'
import { models } from '@tuuturu/motoblog-common'

const axios = Axios.create({
	baseURL: config.VUE_APP_POST_SERVICE_URL,
	withCredentials: true
})

const state = {
	posts: []
}

const getters = {
	posts: state => {
		return state.posts
	},
	postsByTrip: state => trip_id => {
		return state.posts.filter(post => post.trip === trip_id)
	},
	post: state => id => {
		const match = state.posts.filter(p => p.id === id)

		if (match.length === 0) return null

		return match[0]
	},
	hasPosts: state => {
		return state.posts.length > 0
	}
}

const mutations = {
	posts(state, posts) {
		state.posts = posts
	},
	post(state, post) {
		const existing_post = getters.post(state)(post.id)

		if (existing_post) {
			const index = state.posts.indexOf(existing_post)

			state.posts.splice(index, 1)
		}

		state.posts.push(post)
	},
	deletePost(state, { id }) {
		const post = getters.post(state)(id)

		if (!post) throw new Error(`Unable to delete post with id: ${id}`)

		const index = state.posts.indexOf(post)
		state.posts.splice(index, 1)
	}
}

const actions = {
	async refreshPosts({ commit, getters, rootGetters }) {
		if (getters['hasPosts']) return getters['posts']

		const user = rootGetters['auth/principal']

		const { data } = await axios.get('/posts', {
			params: { user }
		})

		commit(
			'posts',
			data.map(post => new models.Post(post))
		)
	},
	async getPosts({ dispatch, getters }) {
		await dispatch('refreshPosts')

		return getters['posts']
	},
	async getPost({ dispatch, getters }, { id }) {
		dispatch('refreshPosts')

		const post = getters['post'](id)

		if (post) return post

		return null
	},
	async savePost({ commit }, post) {
		const options = {
			url: '/posts',
			method: 'post',
			data: post
		}

		if (post.id) {
			options.url += '/' + post.id
			options.method = 'patch'
			commit('deletePost', { id: post.id })
		}

		const { data } = await axios.request(options)
		const updatedPost = new models.Post(data)

		commit('post', updatedPost)

		return updatedPost
	},
	async deletePost({ commit }, id) {
		commit('deletePost', { id })

		await axios.delete(`/posts/${id}`)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
