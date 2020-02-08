<template>
	<div class="PostList">
		<div class="title">
			<Dropdown
				:active="false"
				:choices="POST_TYPE_CHOICES"
				@select="post_type = $event"
			/>
		</div>

		<ul>
			<li
				@click="$router.push({ name: 'editpost', params: { id: post.id } })"
				v-for="post in filtered_posts"
				:key="post.id"
			>
				<span>{{ post.title }}</span>
				<button @click="onMainActionClick">
					{{ buttonText }}
				</button>
			</li>
		</ul>

		<div class="button-footer">
			<button class="button-new" @click="$router.push('/posts/edit')">
				New
			</button>
		</div>
	</div>
</template>

<script>
import Post from '@motoblogg/common/models/post'

import Dropdown from '@/components/Dropdown'
export default {
	name: 'PostList',
	components: { Dropdown },
	data: () => ({
		posts: [],
		POST_TYPE_CHOICES: [
			{ name: 'drafts', value: 'DRAFT' },
			{ name: 'published', value: 'PUBLISHED' },
			{ name: 'unpublished', value: 'UNPUBLISHED' }
		],
		post_type: 'DRAFT',
		dropdown_active: true
	}),
	computed: {
		buttonText() {
			if (this.post_type === Post.TYPE_PUBLISHED) return 'unpublish'

			return 'publish'
		},
		filtered_posts() {
			return this.posts.filter(post => post.status === this.post_type)
		}
	},
	async created() {
		this.posts = await this.$store.dispatch('posts/getPosts')
	},
	methods: {
		publish(id) {
			console.log(`publishing ${id}`)
		},
		unpublish(id) {
			console.log(`unpublishing ${id}`)
		},
		onMainActionClick(id) {
			switch (this.post_type) {
				case Post.TYPE_DRAFT:
					this.publish(id)
					break
				case Post.TYPE_PUBLISHED:
					this.unpublish(id)
					break
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import 'src/assets/palette';
@import 'src/assets/clickable';

.PostList {
	display: flex;
	flex-direction: column;

	align-items: flex-start;

	padding: 0 1em;
}

.title {
	width: 100%;
}

ul {
	width: 100%;
	padding-left: 1em;
}

li {
	@include clickable();

	display: flex;
	justify-content: space-between;
	align-items: center;

	margin-bottom: 0.5em;
}
li:hover {
	cursor: pointer;

	span {
		margin-top: 0.2em;
		border-bottom: 3px solid $primary-color;
	}

	button {
		cursor: pointer;
		border: 3px solid $primary-color-dark;
	}
}

.button-footer {
	position: absolute;
	bottom: 1em;

	width: calc(100% - 1em);

	display: flex;
	justify-content: center;
}

button {
	@include clickable();

	font-weight: bold;

	height: 48px;
	min-width: 112px;

	background-color: transparent;
	border: 3px solid $primary-color;
}
button:hover {
	border: 3px solid $primary-color-dark;
}
</style>
