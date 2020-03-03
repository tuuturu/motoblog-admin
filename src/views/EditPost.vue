<template>
	<div class="EditPost">
		<div class="single-line">
			<BaseButton @click="deletePost" danger :disabled="!post.id">
				Delete
			</BaseButton>
			<BaseButton @click="togglePublished" primary :disabled="!post.id">
				<span v-if="post.status === PostType.PUBLISHED">Unpublish</span>
				<span v-else>Publish</span>
			</BaseButton>
		</div>

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

		<label>
			<span>Location</span>
			<LocationSelector v-model="post.location" @input="save" />
		</label>

		<ImageSelector @imageAppend="onImageAppend" :images="post.images" />

		<label>
			<span>Content</span>
			<TextareaInput ref="txtContent" v-model="post.content" @input="save" />
		</label>
	</div>
</template>

<script>
import { models } from '@tuuturu/motoblog-common'
import { BaseButton } from '@tuuturu/vue/buttons'
import {
	TextInput,
	DateInput,
	NumberInput,
	TextareaInput
} from '@tuuturu/vue/forms'

import LocationSelector from '@/components/LocationSelector'
import ImageSelector from '@/components/ImageSelector'

const SAVE_TIMEOUT_MS = 500

export default {
	name: 'EditPost',
	components: {
		ImageSelector,
		LocationSelector,
		BaseButton,
		TextInput,
		DateInput,
		NumberInput,
		TextareaInput
	},
	data: () => ({
		PostType: models.PostType,
		saveTimeout: null,
		post: new models.Post({
			id: undefined,
			status: models.PostType.DRAFT,
			title: '',
			date: new Date(Date.now()),
			distance: 0,
			content: '',
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
		if (!this.$route.params.id) return

		this.post = await this.$store.dispatch('posts/getPost', {
			id: this.$route.params.id
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
				this.post.id = await this.$store.dispatch('posts/savePost', this.post)
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
@import '~@tuuturu/styling/style';
@import '~@/assets/palette';

.EditPost {
	padding: 1em;

	* {
		margin-bottom: 1em;
	}
}

.TextInput,
.DateInput,
.NumberInput,
.TextareaInput {
	border-color: $green;
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

		resize: none;

		font-size: 12pt;

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
