<template>
	<div class="ImageInput">
		<input
			ref="openImage"
			type="file"
			accept="image/*"
			style="display: none;"
			@change="uploadImage"
		/>
		<IconCamera @click="$refs.openImage.click()" />
	</div>
</template>

<script>
import axios from 'axios'

import config from '@/app.config'
import IconCamera from '@/feature/posts/components/icons/IconCamera'

export default {
	name: 'ImageInput',
	components: { IconCamera },
	methods: {
		async uploadImage(event) {
			const data = new FormData()

			event.target.files.forEach(file => data.append('picture', file))

			const result = await axios.request({
				baseURL: config.VUE_APP_POST_SERVICE_URL,
				url: '/media',
				method: 'POST',
				headers: { 'Content-Type': 'multipart/form-data' },
				data
			})

			this.$emit('input', {
				id: result.data.id,
				caption: ''
			})
		}
	}
}
</script>

<style lang="scss" scoped></style>
