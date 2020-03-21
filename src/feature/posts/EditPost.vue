<template>
	<div class="EditPost">
		<label>
			<span>Title</span>
			<TextInput v-model="post.title" @input="save" />
		</label>
		<div class="single-line">
			<label>
				<span>Date</span>
				<DateInput v-model="post.date" @input="save" />
			</label>
			<label>
				<span>Distance (km)</span>
				<NumberInput v-model="post.distance" @input="save" />
			</label>
		</div>

		<label v-if="false">
			<span>Location</span>
			<LocationSelector v-model="post.location" @input="save" />
		</label>

		<ImageSelector
			v-if="false"
			@imageAppend="onImageAppend"
			:images="post.images"
		/>

		<label>
			<span>Content</span>
			<TextareaInput ref="txtContent" v-model="post.content" @input="save" />
		</label>

		<div class="icons">
			<IconCamera />
			<IconImage />
			<IconLocation />
		</div>

		<div class="buttons">
			<Button secondary @click="save">Save draft</Button>

			<Button @click="togglePublished">
				<span v-if="post.status === PostType.PUBLISHED">Unpublish</span>
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
import { IconCamera, IconImage, IconLocation } from '@tuuturu/vue/icons'

import LocationSelector from '@/feature/posts/components/LocationSelector'
import ImageSelector from '@/feature/posts/components/ImageSelector'

const SAVE_TIMEOUT_MS = 500

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
		IconImage,
		IconLocation
	},
	data: () => ({
		saveTimeout: null,
		post: null
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
		const post_id = this.$route.params.id
		const trip_id = this.$route.query.trip

		if (post_id) {
			this.post = await this.$store.dispatch('posts/getPost', {
				id: post_id
			})

			return
		}

		if (!trip_id) throw new Error('No post id nor trip id found')

		this.post = new models.Post({
			trip: trip_id,
			status: models.PostType.DRAFT,
			title: '',
			date: new Date(Date.now()),
			distance: 0,
			content: '',
			location: 'geo:53.252,10.02',
			images: []
		})
	},
	methods: {
		setDynamicTextAreaSize() {
			const txtContent = this.$refs.txtContent.$el

			txtContent.style.height = txtContent.scrollHeight + 'px'
			txtContent.addEventListener('input', function() {
				this.style.height = 'auto'
				this.style.height = this.scrollHeight + 'px'

				// Scroll to bottom when resizing
				const scrollingElement = document.scrollingElement || document.body
				scrollingElement.scrollTop = scrollingElement.scrollHeight
			})
		},
		save() {
			if (this.saveTimeout) clearTimeout(this.saveTimeout)

			this.saveTimeout = setTimeout(async () => {
				this.post = await this.$store.dispatch('posts/savePost', this.post)
			}, SAVE_TIMEOUT_MS)
		},
		togglePublished() {
			if (this.post.status === models.PostType.PUBLISHED)
				this.post.status = models.PostType.UNPUBLISHED
			else this.post.status = models.PostType.PUBLISHED

			this.save()
		},
		deletePost() {
			const doDelete = confirm('Are you sure you want to delete this post?') //NOSONAR

			if (!doDelete) return

			this.$store.dispatch('posts/deletePost', this.post.id)
			this.$router.replace('/posts')
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
