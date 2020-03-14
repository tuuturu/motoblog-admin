<template>
	<div class="TripList">
		<div class="trip-list-items">
			<BaseButton
				primary
				class="new-trip-button"
				@click="$router.push('trips/edit')"
			>
				New Trip
			</BaseButton>
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
import { BaseButton } from '@tuuturu/vue/buttons'
import TripListCardItem from '@/feature/trips/components/TripListCardItem'

export default {
	name: 'TripList',
	components: { BaseButton, TripListCardItem },
	data: () => ({
		active_trip: true
	}),
	computed: {
		...mapState('trips', ['trips'])
	},
	created() {
		this.$store.dispatch('trips/refreshTrips')
	}
}
</script>

<style lang="scss" scoped>
.TripList {
	height: 100%;
	width: 100%;
	display: flex;

	padding: 4em 1em;

	justify-content: center;
}

.new-trip-button {
	width: 100%;
	height: 96px;
}

.trip-list-items {
	width: 100%;
}
</style>
