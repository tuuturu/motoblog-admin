<template>
	<div
		class="PostList"
		:style="{ 'background-image': `url('${tripsBackground}')` }"
	>
		<Button
			class="button-new"
			@click="
				$router.push({
					path: '/posts/edit',
					query: { trip: $route.query.trip }
				})
			"
		>
			New post
		</Button>

		<h1>Drafts</h1>
		<ul>
			<li v-for="post in draftedPosts" :key="post.id">
				<PostListItemCard />
			</li>
		</ul>
		<h1>Published</h1>

		<ul>
			<li
				@click="$router.push({ name: 'editpost', params: { id: post.id } })"
				v-for="post in publishedPosts"
				:key="post.id"
			>
				<span>{{ post.title }}</span>
				<Button @click.stop="onMainActionClick(post)">
					{{ buttonText }}
				</Button>
			</li>
		</ul>
	</div>
</template>

<script>
import { models } from '@tuuturu/motoblog-common'
import { Button } from '@tuuturu/vue/buttons'

import tripsBackground from '@/assets/trips_background.svg'
import PostListItemCard from '@/feature/posts/components/PostListItemCard'
import { mapState } from 'vuex'

export default {
	name: 'PostList',
	components: { PostListItemCard, Button },
	data: () => ({
		tripsBackground,
		post_type: models.PostType.DRAFT
	}),
	computed: {
		...mapState('posts', ['posts']),
		relevantTrips() {
			return this.posts.filter(post => post.trip === this.$route.query.trip)
		},
		draftedPosts() {
			return this.relevantTrips.filter(
				post => post.status === models.PostType.DRAFT
			)
		},
		publishedPosts() {
			return this.relevantTrips.filter(
				post => post.status === models.PostType.PUBLISHED
			)
		}
	},
	async created() {
		await this.$store.dispatch('auth/refreshUserinfo')
		await this.$store.dispatch('posts/refreshPosts')
	}
}
</script>

<style lang="scss" scoped>
@import 'node_modules/@tuuturu/styling/style';
@import '~@/assets/palette.scss';

.PostList {
	background-repeat: no-repeat;
	background-size: cover;

	height: 100%;

	display: flex;
	flex-direction: column;

	align-items: flex-start;

	padding: 4em 1em;
}

ul {
	width: 100%;
	list-style: none;
	padding: 0;
}
li {
	margin-bottom: 1em;
}

.PostListItemCard {
	width: 100%;
}

.button-new {
	width: 100%;
}
</style>
