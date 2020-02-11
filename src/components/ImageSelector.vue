<template>
	<div class="ImageSelector">
		<span>Images</span>

		<div class="image-container">
			<div
				class="image-block add-photos-block"
				@click="$refs.fileInput.click()"
			>
				<input
					class="hide"
					ref="fileInput"
					type="file"
					@change="uploadImage"
					accept="image/jpeg,image/png"
					multiple
				/>
				<IconAddPhoto />
			</div>

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
import IconAddPhoto from '@/components/IconAddPhoto'

export default {
	name: 'ImageSelector',
	components: { IconAddPhoto },
	data: () => ({
		images: [
			{
				url:
					'https://lh3.googleusercontent.com/z2T8vXAwanRd4DapTZn7Y_VlPgEM511DM_t_6vfCzhKny7t5Qk00_nxnNAM2rtcbhUAmd-3G1gyeT3SUxcTCFwbK-HzPmr47p5yVnNRecv9hYNS86qn7o5ZXp0fDyEE-3En-qhH8Mrw=w1280-h720-no',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
			},
			{
				url:
					'https://lh3.googleusercontent.com/MtEhwPs3BTegHH0o8AwQw1UL9fiUe3_1F4uw9cpFcNoS-LG0deZ9ttt2K5NmHbrHdgaJPaATSzhBqp3kXEeTXmDx9jcP7fTIU0P1TftAviHMgFGlVgPLIb7KMDTtFTUxyQhTdlLgFSg=w1280-h720-no',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
			},
			{
				url:
					'https://lh3.googleusercontent.com/xlJSJwaWTsoNfGVLrynnycQLXjXQ9pOimqFEAfSPLF2Igmqz5CsUods0JfbhRo2ImsXSNs4dl5TBhuKnCdiHX5TaFQNnxXsY9a5sKgUsDDxy_vv7l0zYmeUDezxUbilmYWGg2UKCeaA=w1280-h720-no',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
			},
			{
				url:
					'https://lh3.googleusercontent.com/YZ6jR9tuwWoPllRY1vLx-rm8CS2FeO1WScxTIS91grJMmHFuPKXl7Lq00jdoYJgVZXPnyqUa7taMwEfzLpXHDDzIxBYds5fS13WCYpHROUR5pmFEQW0jCDDYLUnt8WR2P0piO-Rsv4E=w1280-h720-no',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
			},
			{
				url:
					'https://lh3.googleusercontent.com/2anJ7oiJUpunf9V4qqVsaQU-BNaiOFB8Ib6KKaLnBP4YNa6DX5R-nXy2qvXdUS4GDYtFLE6aBfQ5rclmrbPqnJrvv1Q-n-phIQyMJ7Vn_OM7jLbnJrTOx6aZTsvXuPP8a4V9GEzJta0=w1280-h720-no',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui mauris, dictum in arcu et, fermentum dictum nisi. Aenean congue molestie est, ultrices fermentum mi tempor eget. Curabitur laoreet efficitur arcu quis condimentum.'
			}
		]
	}),
	methods: {
		uploadImage(event) {
			const data = new FormData()

			event.target.files.forEach(file => {
				data.append(file.name, file)
			})

			/* axios.post(url, data, { headers: { 'Content-Type': 'multipart/form-data' } }) */
		}
	}
}
</script>

<style lang="scss" scoped>
@import '~@tuuturu/styling/dist/style';
@import '~@/assets/media';
@import '~@/assets/palette';

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
