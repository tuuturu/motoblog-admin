<template>
	<div class="ImageViewer">
		<div class="image-container">
			<div class="image-block" v-for="image in images" :key="image.id">
				<img alt="" :src="getImageURL(image.id)" />

				<div class="icon-container remove-image">
					<IconDelete
						class="icon"
						@click="$emit('deleteImageRequest', image.id)"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import config from '@/app.config'
import IconDelete from '@/feature/posts/components/icons/IconDelete'

export default {
	name: 'ImageSelector',
	components: {
		IconDelete
	},
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
@import '~@tuuturu/styling/style';
@import '~@/assets/media.scss';
@import '~@/assets/palette.scss';

.ImageViewer {
	text-align: left;
}

.image-container {
	margin-top: 0.5em;

	width: 100%;

	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-column-gap: 1em;
	grid-row-gap: 1em;

	@include mobile {
		grid-template-columns: 1fr;
		grid-row-gap: 2em;
	}
}

.icon-container {
	position: absolute;

	width: 100%;
	height: 72px;
	text-align: right;

	display: flex;
	justify-content: flex-end;
	align-items: center;

	padding: 22px;

	background-color: rgba(255, 255, 255, 0.2);
}

.IconDelete {
	cursor: pointer;
}

textarea {
	min-width: 100% !important;
	height: 72px;

	margin: 0;
	padding: 0.5em;
	border: none;

	font-size: 14pt;

	box-sizing: border-box;
	resize: none;
}

.image-block {
	@include shadow-level-1;
	position: relative;

	display: flex;
	flex-direction: column;

	img {
		flex-basis: 80%;
		object-fit: cover;
		object-position: center;

		width: 100%;
	}
}
</style>
