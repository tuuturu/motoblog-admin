<template>
	<svg
		class="IconCamera"
		width="48"
		height="41"
		viewBox="0 0 48 41"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		v-on="$listeners"
	>
		<title>{{ alt }}</title>
		<path
			d="M45.3006 5H2.69944C1.20858 5 0 6.24002 0 7.76967V38.2303C0 39.76 1.20858 41 2.69944 41H45.3006C46.7914 41 48 39.76 48 38.2303V7.76967C48 6.24002 46.7914 5 45.3006 5Z"
			fill="currentColor"
		/>
		<path
			d="M38.9886 9H9V3.01307C9 2.21395 9.3239 1.44757 9.90044 0.882507C10.477 0.317447 11.2589 0 12.0743 0H35.9257C36.7411 0 37.523 0.317447 38.0996 0.882507C38.6761 1.44757 39 2.21395 39 3.01307L38.9886 9Z"
			fill="currentColor"
		/>
		<path
			d="M24 35C30.0751 35 35 30.0751 35 24C35 17.9249 30.0751 13 24 13C17.9249 13 13 17.9249 13 24C13 30.0751 17.9249 35 24 35Z"
			fill="currentColor"
			stroke="white"
			stroke-width="4"
			stroke-miterlimit="10"
		/>
	</svg>
</template>

<script>
export default {
	name: 'IconCamera',
	props: {
		alt: {
			type: String,
			default: () => ''
		}
	}
}
</script>
