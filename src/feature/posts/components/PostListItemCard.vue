<template>
	<div class="PostListItemCard" v-on="$listeners">
		<h2>Post</h2>
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
	name: 'PostListItemCard',
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
.PostListItemCard {
	background-color: #c4c4c4;

	padding: 3em 1em 1em 1em;

	border-radius: 2px;

	text-align: left;

	h2 {
		margin-bottom: 0.5em;
	}
}

.Button {
	width: 100%;
	height: 96px;
}
</style>
