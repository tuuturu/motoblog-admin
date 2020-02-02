<template>
	<div class="Dropdown" @click="active = !active">
		<div class="title">
			<h2>{{ title }}</h2>
			<IconChevronDown />
		</div>
		<ul v-if="active">
			<li v-for="choice in choices" :key="choice.value" @click="select(choice)">
				{{ choice.name }}
			</li>
		</ul>
	</div>
</template>

<script>
import IconChevronDown from '@/components/IconChevronDown'

export default {
	name: 'Dropdown',
	components: { IconChevronDown },
	props: {
		choices: Array
	},
	data: () => ({
		active: false,
		selected_index: 0
	}),
	computed: {
		title() {
			return this.choices[this.selected_index].name
		}
	},
	methods: {
		select(choice) {
			this.$emit('select', choice.value)

			this.selected_index = this.choices.indexOf(choice)
		}
	}
}
</script>

<style lang="scss" scoped>
@import 'src/assets/palette';

.Dropdown {
	cursor: pointer;

	.title {
		position: relative;
		display: flex;
	}
	.title:hover {
		h2 {
			border-bottom: 3px solid $primary-color-dark;
		}
		svg {
			color: $primary-color-dark;
		}
	}

	h2 {
		font-size: 16pt;
		font-weight: normal;

		margin-bottom: 0;

		border-bottom: 3px solid $primary-color;
	}

	svg {
		margin-left: 0.3em;
		margin-bottom: 0.3em;

		align-self: flex-end;

		color: $primary-color;
	}

	ul {
		position: absolute;
		top: 2.2em;

		width: calc(100% - 2em);
		padding-left: 1em;

		text-align: left;
		background-color: white;

		box-shadow: 1px 1px 3px #2c3e50;

		li {
			display: flex;
			align-items: center;

			min-height: 56px;
		}
		li:hover {
			color: $primary-color;
			font-weight: bold;
		}
	}
}
</style>
