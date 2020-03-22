import EditPost from './EditPost'
import PostList from './PostList'
import CapturePhoto from '@/feature/posts/CapturePhoto'

export default [
	{
		path: '/',
		name: 'postlist',
		component: PostList
	},
	{
		path: '/edit/capture',
		name: 'capturephoto',
		component: CapturePhoto
	},
	{
		path: '/edit',
		name: 'editpost',
		component: EditPost
	}
]
