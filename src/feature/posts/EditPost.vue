<template>
	<div class="EditPost">
		<label>
			<span>Title</span>
			<TextInput v-model="post.title" placeholder="A Nice Title" />
		</label>

		<ContentInput v-model="post.content" />

		<div class="icons">
			<ImageInput @input="post.images.push($event)" />
			<IconLocation />
		</div>

		<label v-if="false">
			<span>Location</span>
			<LocationSelector v-model="post.location" />
		</label>

		<ImageViewer :images="post.images" />

		<div class="buttons">
			<Button secondary @click="save">
				<span>Save</span>
				<span v-if="post.status !== PostStatus.PUBLISHED"> draft</span>
			</Button>

			<Button @click="togglePublished">
				<span v-if="post.status === PostStatus.PUBLISHED">Unpublish</span>
				<span v-else>Publish</span>
			</Button>

			<Button danger v-if="post.id" @click="deletePost">Delete</Button>
		</div>
	</div>
</template>

<script>
import { models } from '@tuuturu/motoblog-common'
import { Button } from '@tuuturu/vue/buttons'
import { TextInput } from '@tuuturu/vue/forms'
import { IconLocation } from '@tuuturu/vue/icons'

import LocationSelector from '@/feature/posts/components/LocationSelector'
import ImageViewer from '@/feature/posts/components/ImageViewer'
import ImageInput from '@/feature/posts/components/ImageInput'
import ContentInput from '@/feature/posts/components/ContentInput'

export default {
	name: 'EditPost',
	components: {
		ContentInput,
		ImageInput,
		ImageViewer,
		LocationSelector,
		Button,
		TextInput,
		IconLocation
	},
	data: () => ({
		PostStatus: models.PostStatus,
		post: new models.Post({
			trip: undefined,
			status: models.PostStatus.DRAFT,
			date: new Date(Date.now()),
			title: '',
			content: '',
			distance: 0,
			location: 'geo:53.252,10.02',
			images: []
		})
	}),
	computed: {
		date() {
			if (!this.post.date) return ''

			return this.post.date.toISOString().split('T')[0]
		}
	},
	async created() {
		await this.$store.dispatch('posts/refreshPosts')

		const post_id = this.$route.params.post_id
		const trip_id = this.$route.query.trip

		if (!post_id && !trip_id) throw new Error('No post id nor trip id found')

		if (post_id) {
			this.post = await this.$store.dispatch('posts/getPost', {
				id: post_id
			})

			if (this.post) return
		}

		this.post.trip = trip_id
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
		}
	}
}
</script>

<style lang="scss" scoped>
@import 'node_modules/@tuuturu/styling/style';
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

	.LocationSelector {
		width: 100%;
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
</style>
