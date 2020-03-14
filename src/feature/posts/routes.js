import EditPost from './EditPost'
import PostList from './PostList'

export default [
	{
		path: '/',
		name: 'postlist',
		component: PostList
	},
	{
		path: '/edit',
		name: 'editpost',
		component: EditPost
	}
]
