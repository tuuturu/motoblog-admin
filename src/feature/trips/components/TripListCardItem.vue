<template>
	<div class="TripListCardItem" v-on="$listeners">
		<h2>Trip</h2>
		<span>{{ date }}</span>
	</div>
</template>

<script>
const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
]

export default {
	name: 'TripListCardItem',
	props: {
		trip: Object
	},
	computed: {
		date() {
			const fetchedDate = new Date(Date.now())

			const day = fetchedDate.getDate()
			const month = MONTHS[fetchedDate.getMonth()]
			const year = fetchedDate.getFullYear()

			return `${day} ${month} ${year}`
		}
	}
}
</script>

<style lang="scss" scoped>
.TripListCardItem {
	width: 100%;
	padding: 3em 1em 1em 1em;
	border-radius: 4px;

	background-color: rgba(0, 0, 0, 0.5);
	color: white;

	h2 {
		margin-bottom: 0.5em;
	}

	cursor: pointer;
}

.Button {
	width: 100%;
	height: 96px;
}
</style>
