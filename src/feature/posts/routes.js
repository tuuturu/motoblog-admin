import EditPost from './EditPost'
import PostList from './PostList'

export default [
	{
		path: '/',
		name: 'postlist',
		component: PostList
	},
	{
		path: '/new',
		name: 'createpost',
		component: EditPost
	},
	{
		path: '/:post_id',
		name: 'editpost',
		component: EditPost
	}
]
