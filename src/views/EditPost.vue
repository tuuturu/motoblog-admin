<template>
	<div class="EditPost">
		<div class="single-line">
			<button
				class="btn danger"
				:class="{ disabled: post.id === undefined }"
				@click="deletePost"
			>
				Delete
			</button>
			<button
				class="btn primary"
				:class="{ disabled: post.id === undefined }"
				@click="togglePublished"
			>
				<span v-if="post.status === Post.TYPE_PUBLISHED">Unpublish</span>
				<span v-else>Publish</span>
			</button>
		</div>

		<label>
			<span>Title</span>
			<input v-model="post.title" type="text" @input="save" />
		</label>
		<div class="single-line">
			<label>
				<span>Date</span>
				<input :value="date" @input="setDate" type="date" />
			</label>
			<label>
				<span>Distance (km)</span>
				<input v-model="post.distance" type="number" @input="save" />
			</label>
		</div>

		<label>
			<span>Location</span>
			<LocationSelector v-model="post.location" @input="save" />
		</label>

		<ImageSelector />

		<label>
			<span>Content</span>
			<textarea ref="txtContent" v-model="post.content" @input="save" />
		</label>
	</div>
</template>

<script>
import LocationSelector from '@/components/LocationSelector'
import ImageSelector from '@/components/ImageSelector'

import Post from '@motoblogg/common/models/post'

const SAVE_TIMEOUT_MS = 500

export default {
	name: 'EditPost',
	components: { ImageSelector, LocationSelector },
	data: () => ({
		Post,
		saveTimeout: null,
		post: {
			id: undefined,
			status: Post.TYPE_DRAFT,
			title: '',
			date: new Date(Date.now()),
			distance: 0,
			content: '',
			location: 'geo:53.252,10.02'
		}
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
		if (!this.$route.params.id) return

		this.post = await this.$store.dispatch('posts/getPost', {
			id: this.$route.params.id
		})
	},
	methods: {
		setDynamicTextAreaSize() {
			const txtContent = this.$refs.txtContent

			txtContent.style.height = txtContent.scrollHeight + 'px'
			txtContent.addEventListener('input', function() {
				this.style.height = 'auto'
				this.style.height = this.scrollHeight + 'px'

				// Scroll to bottom when resizing
				const scrollingElement = document.scrollingElement || document.body
				scrollingElement.scrollTop = scrollingElement.scrollHeight
			})
		},
		setDate(event) {
			const date = event.target.valueAsDate

			if (!date) return

			this.post.date = date
			this.save()
		},
		save() {
			if (this.saveTimeout) clearTimeout(this.saveTimeout)

			this.saveTimeout = setTimeout(async () => {
				this.post.id = await this.$store.dispatch('posts/savePost', this.post)
			}, SAVE_TIMEOUT_MS)
		},
		togglePublished() {
			if (this.post.status === Post.TYPE_PUBLISHED)
				this.post.status = Post.TYPE_UNPUBLISHED
			else this.post.status = Post.TYPE_PUBLISHED

			this.save()
		},
		deletePost() {
			const doDelete = confirm('Are you sure you want to delete this post?') //NOSONAR

			if (!doDelete) return

			this.$store.commit('posts/deletePost', { id: this.post.id })
			this.$router.replace('/posts')
		}
	}
}
</script>

<style lang="scss" scoped>
@import 'src/assets/base';
@import 'src/assets/clickable';
@import 'src/assets/palette';

.EditPost {
	padding: 1em;

	* {
		margin-bottom: 1em;
	}
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

	input,
	textarea {
		@include clickable;

		height: 100%;
		width: 100%;
		padding: 1em;

		border: 3px solid $primary-color;

		resize: none;

		font-size: 12pt;
		line-height: 2em;

		overflow: hidden;
	}

	.LocationSelector {
		width: 100%;
	}
}

button {
	transition: all 0.2s ease;
}
</style>
