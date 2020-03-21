<template>
	<div class="TripList" :style="{ 'background-image': 'url(' + tripsBackground + ')' }">
		<div class="trip-list-items">
			<Button @click="createTrip">
				{{ addTripText }}
			</Button>
			<TripListCardItem
				v-for="trip in trips"
				@click="$router.push(`/posts?trip=${trip.id}`)"
				:key="trip.id"
				:trip="trip"
			/>
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
		...mapState('trips', ['trips']),
		addTripText() {
			if (this.trips.length === 0) return 'Add first trip'

			return 'New trip'
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
	display: flex;

	padding: 4em 1em;

	justify-content: center;
	border: 0;
}

.Button {
	width: 100%;
}

.trip-list-items {
	width: 100%;
}
</style>
