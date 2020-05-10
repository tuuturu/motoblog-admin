<template>
	<div class="ImageSelector">
		<span>Images</span>

		<div class="image-container">
			<div class="image-block" v-for="image in images" :key="image.url">
				<img alt="" :src="image.url" />
				<label>
					<textarea placeholder="caption" />
				</label>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ImageSelector',
	props: {
		images: {
			type: Array,
			default: () => []
		}
	}
}
</script>

<style lang="scss" scoped>
@import 'node_modules/@tuuturu/styling/style';
@import '~@/assets/media.scss';
@import '~@/assets/palette.scss';

.ImageSelector {
	text-align: left;

	.image-container {
		margin-top: 0.5em;

		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-column-gap: 1em;
		grid-row-gap: 1em;

		@include mobile {
			grid-template-columns: 1fr;
			grid-row-gap: 2em;
		}
	}
}

.image-block {
	@include shadow-level-1;

	display: flex;
	flex-direction: column;

	img {
		flex-basis: 80%;
		object-fit: cover;
		object-position: center;

		width: 100%;
	}

	label {
		flex-basis: 20%;
	}

	textarea {
		width: 100%;
		margin: 0;
		padding: 1em;

		border: 3px solid $primary-color;

		resize: none;
	}
}

.add-photos-block {
	height: 196px;

	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		* {
			color: $primary-color-dark;
		}
	}

	svg {
		height: 72px;
		width: 72px;

		color: $primary-color;
	}
}

.hide {
	display: none;
}
</style>
