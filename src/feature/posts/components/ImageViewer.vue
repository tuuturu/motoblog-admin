<template>
	<div class="ImageViewer">
		<span>Images</span>

		<div class="image-container">
			<div class="image-block" v-for="image in images" :key="image.id">
				<img alt="" :src="getImageURL(image.id)" />
			</div>
		</div>
	</div>
</template>

<script>
import config from '@/app.config'

export default {
	name: 'ImageSelector',
	props: {
		images: {
			type: Array,
			default: () => []
		}
	},
	methods: {
		getImageURL(id) {
			return `${config.VUE_APP_BUCKET_POST_IMAGES}/${id}`
		}
	}
}
</script>

<style lang="scss" scoped>
@import 'node_modules/@tuuturu/styling/style';
@import '~@/assets/media.scss';
@import '~@/assets/palette.scss';

.ImageViewer {
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
}

.hide {
	display: none;
}
</style>
