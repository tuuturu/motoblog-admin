<template>
	<div class="EditPost">
		<label>
			<span>Title</span>
			<TextInput v-model="post.title" placeholder="A Nice Title" />
		</label>

		<ContentInput v-model="post.content" />

		<label v-if="post.points.length > 0">
			<span>Location</span>
			<LocationViewer :points="post.points" />
		</label>

		<label v-if="post.images.length > 0">
			<span>Images</span>
			<ImageViewer :images="post.images" />
		</label>

		<div class="icons">
			<ImageInput @input="post.images.push($event)" />
			<IconLocation @click.capture.native="show_location_modal = true" />
		</div>

		<div class="buttons">
			<Button @click="save">
				<span>Save</span>
				<span v-if="post.status !== PostStatus.PUBLISHED"> draft</span>
			</Button>

			<Button secondary @click="togglePublished">
				<span v-if="post.status === PostStatus.PUBLISHED">Unpublish</span>
				<span v-else>Publish</span>
			</Button>

			<Button danger v-if="post.id !== -1" @click="deletePost">Delete</Button>
		</div>

		<LocationModal v-if="show_location_modal" @input="onAcquirePoints" />
	</div>
</template>

<script>
import { models } from '@tuuturu/motoblog-common'
import { Button } from '@tuuturu/vue/buttons'
import { TextInput } from '@tuuturu/vue/forms'
import { IconLocation } from '@tuuturu/vue/icons'

import ImageViewer from '@/feature/posts/components/ImageViewer'
import ImageInput from '@/feature/posts/components/ImageInput'
import ContentInput from '@/feature/posts/components/ContentInput'
import LocationModal from '@/feature/posts/components/LocationModal'
import LocationViewer from '@/feature/posts/components/LocationViewer'

export default {
	name: 'EditPost',
	components: {
		ContentInput,
		ImageInput,
		ImageViewer,
		LocationModal,
		LocationViewer,
		Button,
		TextInput,
		IconLocation
	},
	data: () => ({
		PostStatus: models.PostStatus,
		post: new models.Post({}),
		show_location_modal: false
	}),
	computed: {
		date() {
			if (!this.post.date) return ''

			return this.post.date.toISOString().split('T')[0]
		}
	},
	async created() {
		const post_id = this.$route.params.post_id
		const trip_id = this.$route.query.trip

		if (!post_id && !trip_id) throw new Error('No post id nor trip id found')

		if (!post_id) {
			this.post.trip = trip_id

			return
		}

		const post = await this.$store.dispatch('posts/getPost', {
			id: post_id
		})

		if (post) this.$set(this, 'post', post)
	},
	methods: {
		async save() {
			this.post = await this.$store.dispatch('posts/savePost', this.post)
		},
		togglePublished() {
			if (this.post.status === models.PostStatus.PUBLISHED)
				this.post.status = models.PostStatus.UNPUBLISHED
			else this.post.status = models.PostStatus.PUBLISHED

			this.save()
		},
		deletePost() {
			const doDelete = confirm('Are you sure you want to delete this post?') //NOSONAR

			if (!doDelete) return

			this.$store.dispatch('posts/deletePost', this.post.id)
			this.$router.replace({ path: '/posts', query: { trip: this.post.trip } })
		},
		onAcquirePoints(points) {
			this.show_location_modal = false
			this.post.points.push(...points)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '~@tuuturu/styling/style';
@import '~@/assets/palette.scss';

.EditPost {
	padding: 1em;
}

.ImageViewer {
	margin-bottom: 1.5em;
}

.ContentInput {
	width: 100%;
}

label {
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	width: 100%;

	margin-bottom: 1em;

	input,
	textarea {
		@include clickable;

		height: 100%;
		width: 100%;

		resize: none;

		font-size: 12pt;

		overflow: hidden;
	}
}

.icons {
	display: flex;
	width: 100%;

	margin: 3em 0;

	text-align: left;

	:not(:last-child) {
		margin-right: 1em;
	}
}

.buttons {
	* {
		width: 100%;

		transition: all 0.2s ease;
	}

	:not(:last-child) {
		margin-bottom: 1em;
	}
	:last-child {
		margin-bottom: 1.5em;
	}
}

.LocationViewer {
	width: 100%;
	height: 190px;
}
</style>
