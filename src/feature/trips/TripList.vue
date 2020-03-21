<template>
	<div
		class="TripList"
		:style="{ 'background-image': `url(${tripsBackground})` }"
	>
		<div class="trip-list-items">
			<Button @click="createTrip">
				{{ addTripText }}
			</Button>

			<h1>Tripped trips</h1>
			<ul>
				<li v-for="trip in trips" :key="trip.id">
					<TripListCardItem
						@click="$router.push(`/posts?trip=${trip.id}`)"
						:trip="trip"
					/>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { Button } from '@tuuturu/vue/buttons'
import tripsBackground from '@/assets/trips_background.svg'
import TripListCardItem from '@/feature/trips/components/TripListCardItem'

export default {
	name: 'TripList',
	components: { Button, TripListCardItem },
	data: () => ({
		tripsBackground,
		active_trip: true
	}),
	computed: {
		...mapState('trips', ['trips', 'tripsFetched']),
		addTripText() {
			if (!this.tripsFetched) return ' '
			if (this.trips.length > 0) return 'New trip'

			return 'Add first trip'
		}
	},
	created() {
		this.$store.dispatch('trips/refreshTrips')
	},
	methods: {
		async createTrip() {
			const { id } = await this.$store.dispatch('trips/createTrip')

			await this.$router.push({ path: '/posts', query: { trip: id } })
		}
	}
}
</script>

<style lang="scss" scoped>
.TripList {
	background-repeat: no-repeat;
	background-size: cover;

	height: 100%;
	width: 100%;

	padding: 4em 1em;

	text-align: left;
}

h1 {
	color: #7d7d7d;
}

.Button {
	width: 100%;
}

ul {
	list-style: none;
	padding: 0;
}
li {
	margin-bottom: 1em;
}

.trip-list-items {
	width: 100%;
}
</style>
