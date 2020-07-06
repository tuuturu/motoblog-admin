<template>
	<div class="EditPostButtons">
		<Button @click="$emit('save')">
			<span>Save</span>
			<span v-if="status !== PostStatus.PUBLISHED"> draft</span>
		</Button>

		<Button secondary @click="$emit('togglePublished')">
			<span v-if="status === PostStatus.PUBLISHED">Unpublish</span>
			<span v-else>Publish</span>
		</Button>

		<Button danger v-if="!isNew" @click="$emit('delete')">
			Delete
		</Button>
	</div>
</template>

<script>
import { Button } from '@tuuturu/vue/buttons'
import { models } from '@tuuturu/motoblog-common'

export default {
	name: 'EditPostButtons',
	components: {
		Button
	},
	props: {
		status: String,
		isNew: Boolean
	},
	data: () => ({
		PostStatus: models.PostStatus
	})
}
</script>

<style lang="scss" scoped>
.EditPostButtons {
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
