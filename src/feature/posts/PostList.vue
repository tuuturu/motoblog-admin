<template>
	<div class="PostList">
		<Button class="button-new" @click="addNewPost">
			<span v-if="relevantPosts.length > 0">New Post</span>
			<span v-else>Add First Post</span>
		</Button>

		<h1>Drafts</h1>
		<ul v-if="draftedPosts.length !== 0">
			<li
				@click="editPost(post.id)"
				v-for="post in draftedPosts"
				:key="post.id"
			>
				<PostListItemCard :post="post" />
			</li>
		</ul>
		<span v-else>You have no drafts for this trip</span>

		<h1>Published</h1>
		<ul v-if="publishedPosts.length !== 0">
			<li
				@click="editPost(post.id)"
				v-for="post in publishedPosts"
				:key="post.id"
			>
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

export default {
	name: 'PostList',
	components: { PostListItemCard, Button },
	computed: {
		...mapState('posts', ['posts']),
		relevantPosts() {
			if (!this.$route.query.trip) return this.posts

			return this.posts.filter(post => post.trip === this.$route.query.trip)
		},
		draftedPosts() {
			return this.relevantPosts.filter(
				post => post.status !== models.PostStatus.PUBLISHED
			)
		},
		publishedPosts() {
			return this.relevantPosts.filter(
				post => post.status === models.PostStatus.PUBLISHED
			)
		}
	},
	async created() {
		await this.$store.dispatch('posts/refreshPosts')
	},
	methods: {
		addNewPost() {
			this.$router.push({
				path: '/posts/new',
				query: { trip: this.$route.query.trip }
			})
		},
		editPost(id) {
			this.$router.push({ path: `/posts/${id}` })
		}
	}
}
</script>

<style lang="scss" scoped>
@import 'node_modules/@tuuturu/styling/style';
@import '~@/assets/palette.scss';

.IllustrationSunrise {
	position: absolute;

	width: 432px;

	left: 0;
	top: 0;

	z-index: -1000;
}

.PostList {
	background: url('/img/IllustrationSunrise.svg');
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
