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
				<Button @click.stop="onMainActionClick(post)">
					{{ buttonText }}
				</Button>
			</li>
		</ul>

		<div class="button-footer">
			<Button
				class="button-new"
				@click="
					$router.push({
						path: '/posts/edit',
						query: { trip: $route.query.trip }
					})
				"
			>
				New
			</Button>
		</div>
	</div>
</template>

<script>
import { models } from '@tuuturu/motoblog-common'
import { Button } from '@tuuturu/vue/buttons'

import Dropdown from '@/feature/posts/components/Dropdown'

export default {
	name: 'PostList',
	components: { Dropdown, Button },
	data: () => ({
		posts: [],
		POST_TYPE_CHOICES: [
			{ name: 'drafts', value: models.PostType.DRAFT },
			{ name: 'published', value: models.PostType.PUBLISHED },
			{ name: 'unpublished', value: models.PostType.UNPUBLISHED }
		],
		post_type: models.PostType.DRAFT,
		dropdown_active: true
	}),
	computed: {
		buttonText() {
			if (this.post_type === models.PostType.PUBLISHED) return 'unpublish'

			return 'publish'
		},
		filtered_posts() {
			return this.posts.filter(post => post.status === this.post_type)
		}
	},
	async created() {
		const trip_id = this.$route.query.trip

		await this.$store.dispatch('auth/refreshUserinfo')
		await this.$store.dispatch('posts/refreshPosts')

		this.posts = await this.$store.getters['posts/postsByTrip'](trip_id)
	},
	methods: {
		onMainActionClick(post) {
			switch (this.post_type) {
				case models.PostType.PUBLISHED:
					post.status = models.PostType.UNPUBLISHED
					break
				case models.PostType.DRAFT:
				case models.PostType.UNPUBLISHED:
					post.status = models.PostType.PUBLISHED
					break
			}

			this.$store.dispatch('posts/savePost', post)
		}
	}
}
</script>

<style lang="scss" scoped>
@import 'node_modules/@tuuturu/styling/style';
@import '~@/assets/palette.scss';

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
}

.button-footer {
	position: absolute;
	bottom: 1em;

	width: calc(100% - 1em);

	display: flex;
	justify-content: center;

	.button-new {
		height: 3em;
		width: 10em;
	}
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
