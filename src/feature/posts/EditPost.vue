<template>
	<div class="EditPost">
		<label>
			<span>Title</span>
			<TextInput v-model="post.title" placeholder="A Nice Title" />
		</label>
		<div class="single-line" v-if="false">
			<label>
				<span>Date</span>
				<DateInput v-model="post.date" />
			</label>
			<label>
				<span>Distance (km)</span>
				<NumberInput
					:value="parseInt(post.distance)"
					@input="post.distance = $event"
				/>
			</label>
		</div>

		<label v-if="false">
			<span>Location</span>
			<LocationSelector v-model="post.location" />
		</label>

		<ImageSelector
			v-if="false"
			@imageAppend="onImageAppend"
			:images="post.images"
		/>

		<label>
			<span>Content</span>
			<TextareaInput
				ref="txtContent"
				v-model="post.content"
				placeholder="A long and detailed description about where you've been and what you've seen :)"
			/>
		</label>

		<div class="icons">
			<input
				ref="openImage"
				type="file"
				accept="image/*"
				style="display: none;"
			/>
			<IconCamera @click.native="$refs.openImage.click()" />
			<IconLocation />
		</div>

		<div class="buttons">
			<Button secondary @click="save">Save draft</Button>

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
import {
	TextInput,
	DateInput,
	NumberInput,
	TextareaInput
} from '@tuuturu/vue/forms'
import { IconCamera, IconLocation } from '@tuuturu/vue/icons'

import LocationSelector from '@/feature/posts/components/LocationSelector'
import ImageSelector from '@/feature/posts/components/ImageSelector'

export default {
	name: 'EditPost',
	components: {
		ImageSelector,
		LocationSelector,
		Button,
		TextInput,
		DateInput,
		NumberInput,
		TextareaInput,
		IconCamera,
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
	mounted() {
		this.setDynamicTextAreaSize()
	},
	async created() {
		const post_id = this.$route.query.post
		const trip_id = this.$route.query.trip

		if (post_id) {
			this.post = await this.$store.dispatch('posts/getPost', {
				id: post_id
			})

			if (this.post) return
		}

		if (!trip_id) throw new Error('No post id nor trip id found')

		this.post.trip = trip_id
	},
	methods: {
		setDynamicTextAreaSize() {
			const txtContent = this.$refs.txtContent.$el

			txtContent.style.height = txtContent.scrollHeight + 50 + 'px'
			txtContent.addEventListener('input', function () {
				this.style.height = 'auto'
				this.style.height = this.scrollHeight + 'px'

				// Scroll to bottom when resizing
				const scrollingElement = document.scrollingElement || document.body
				scrollingElement.scrollTop = scrollingElement.scrollHeight
			})
		},
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
		onImageAppend(image) {
			this.post.images.push(image)

			this.save()
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

.single-line {
	display: flex;

	> * {
		width: 100%;
	}

	> :not(:first-child) {
		margin-left: 0.5em;
	}
	> :not(:last-child) {
		margin-right: 0.5em;
	}
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
