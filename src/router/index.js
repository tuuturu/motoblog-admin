import Vue from 'vue'
import VueRouter from 'vue-router'

import PostList from '@/views/PostList'

Vue.use(VueRouter)

const routes = [
	{
		path: '/posts',
		name: 'postlist',
		component: PostList
	}
]

const router = new VueRouter({
	routes
})

export default router
