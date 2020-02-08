import Vue from 'vue'
import VueRouter from 'vue-router'

import PostList from '@/views/PostList'
import EditPost from '@/views/EditPost'

Vue.use(VueRouter)

const routes = [
	{
		path: '/posts',
		name: 'postlist',
		component: PostList
	},
	{
		path: '/posts/edit',
		name: 'editpost',
		component: EditPost
	}
]

const router = new VueRouter({
	routes
})

export default router
