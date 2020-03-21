<template>
	<div class="TripListCardItem">
		<Button v-on="$listeners" secondary>Trip</Button>
	</div>
</template>

<script>
import { Button } from '@tuuturu/vue/buttons'

export default {
	name: 'TripListCardItem',
	components: {
		Button
	},
	props: {
		trip: Object
	}
}
</script>

<style lang="scss" scoped>
.TripListCardItem {
	width: 100%;

	&:not(:first-child) {
		margin-top: 1em;
	}
}

.Button {
	width: 100%;
	height: 96px;
}
</style>
