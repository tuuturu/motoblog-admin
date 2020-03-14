<template>
	<div class="TripListCardItem">
		<BaseButton v-on="$listeners" secondary>Trip</BaseButton>
	</div>
</template>

<script>
import { BaseButton } from '@tuuturu/vue/buttons'

export default {
	name: 'TripListCardItem',
	components: {
		BaseButton
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

.BaseButton {
	width: 100%;
	height: 96px;
}
</style>
