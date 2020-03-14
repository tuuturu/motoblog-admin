import TripList from './TripList'
import TripEdit from './TripEdit'

export default [
	{
		path: '/',
		name: 'triplist',
		component: TripList
	},
	{
		path: '/edit',
		name: 'tripedit',
		component: TripEdit
	}
]
