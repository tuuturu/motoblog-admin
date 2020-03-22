<template>
	<div class="PostList">
		<IllustrationSunrise class="background" />

		<Button
			class="button-new"
			@click="
				$router.push({
					path: '/posts/edit',
					query: { trip: $route.query.trip }
				})
			"
		>
			<span v-if="relevantPosts.length > 0">New Post</span>
			<span v-else>Add First Post</span>
		</Button>

		<h1>Drafts</h1>
		<ul v-if="draftedPosts.length !== 0">
			<li @click="edit(post.id)" v-for="post in draftedPosts" :key="post.id">
				<PostListItemCard :post="post" />
			</li>
		</ul>
		<span v-else>You have no drafts for this trip</span>

		<h1>Published</h1>
		<ul v-if="publishedPosts.length !== 0">
			<li @click="edit(post.id)" v-for="post in publishedPosts" :key="post.id">
				<PostListItemCard :post="post" />
			</li>
		</ul>
		<span v-else>You have no published posts for this trip</span>
	</div>
</template>

<script>
import { models } from '@tuuturu/motoblog-common'
import { Button } from '@tuuturu/vue/buttons'

import PostListItemCard from '@/feature/posts/components/PostListItemCard'
import { mapState } from 'vuex'
import IllustrationSunrise from '@/components/IllustrationSunrise'

export default {
	name: 'PostList',
	components: { PostListItemCard, Button, IllustrationSunrise },
	computed: {
		...mapState('posts', ['posts']),
		relevantPosts() {
			return this.posts.filter(post => post.trip === this.$route.query.trip)
		},
		draftedPosts() {
			return this.relevantPosts.filter(
				post => post.status !== models.PostType.PUBLISHED
			)
		},
		publishedPosts() {
			return this.relevantPosts.filter(
				post => post.status === models.PostType.PUBLISHED
			)
		}
	},
	async created() {
		await this.$store.dispatch('auth/refreshUserinfo')
		await this.$store.dispatch('posts/refreshPosts')
	},
	methods: {
		edit(id) {
			const route = { name: 'editpost' }

			if (id) route.params = { id }

			this.$router.push(route)
		}
	}
}
</script>

<style lang="scss" scoped>
@import 'node_modules/@tuuturu/styling/style';
@import '~@/assets/palette.scss';

.background {
	width: 105%;
	height: 105%;

	position: fixed;
	left: -5px;
	top: -5px;

	z-index: -1000;
}

.PostList {
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
