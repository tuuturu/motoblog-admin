<template>
	<div class="EditPost">
		<div class="single-line">
			<button class="btn danger">Delete</button>
			<button class="btn">Publish</button>
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
			<LocationSelector @change="onLocationChange" />
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
const SAVE_TIMEOUT_MS = 500

export default {
	name: 'EditPost',
	components: { ImageSelector, LocationSelector },
	data: () => ({
		saveTimeout: null,
		post: {
			status: 'DRAFT',
			title: '',
			date: new Date(Date.now()),
			distance: 0,
			content: '',
			location: 'geo:0,0'
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
		onLocationChange(location) {
			this.post.location = 'geo:' + location.join(',')

			this.save()
		},
		save() {
			if (this.saveTimeout) clearTimeout(this.saveTimeout)

			this.saveTimeout = setTimeout(async () => {
				this.post.id = await this.$store.dispatch('posts/savePost', this.post)
			}, SAVE_TIMEOUT_MS)
		},
		deletePost() {
			const deleteConfirmation = confirm(
				'Are you sure you want to delete this post?'
			)

			if (!deleteConfirmation) return

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
</style>
