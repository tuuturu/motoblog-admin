<template>
	<label class="ContentInput">
		<span>Content</span>
		<TextareaInput
			ref="txtContent"
			v-on="$listeners"
			v-bind="$attrs"
			placeholder="A long and detailed description about where you've been and what you've seen :)"
		/>
	</label>
</template>

<script>
import { TextareaInput } from '@tuuturu/vue/forms'

export default {
	name: 'ContentInput',
	components: {
		TextareaInput
	},
	mounted() {
		const txtContent = this.$refs.txtContent.$el

		txtContent.style.height = txtContent.scrollHeight + 50 + 'px'
		txtContent.addEventListener('input', function () {
			this.style.height = 'auto'
			this.style.height = this.scrollHeight + 'px'

			// Scroll to bottom when resizing
			const scrollingElement = document.scrollingElement || document.body
			scrollingElement.scrollTop = scrollingElement.scrollHeight
		})
	}
}
</script>

<style lang="scss" scoped>
@import 'node_modules/@tuuturu/styling/style';

label {
	textarea {
		@include clickable;

		width: inherit;

		resize: none;

		font-size: 12pt;

		overflow: hidden;
	}
}
</style>
