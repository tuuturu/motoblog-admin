<template>
	<svg
		class="IconCrosshair"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<title>{{ alt }}</title>
		<circle cx="12" cy="12" r="9.5" stroke="currentColor" />
		<circle cx="12" cy="12" r="1" fill="currentColor" />
		<line
			x1="8.74228e-08"
			y1="12"
			x2="9"
			y2="12"
			stroke="currentColor"
			stroke-width="2"
		/>
		<line
			x1="15"
			y1="12"
			x2="24"
			y2="12"
			stroke="currentColor"
			stroke-width="2"
		/>
		<line
			x1="12"
			y1="24"
			x2="12"
			y2="15"
			stroke="currentColor"
			stroke-width="2"
		/>
		<line x1="12" y1="9" x2="12" stroke="currentColor" stroke-width="2" />
	</svg>
</template>

<script>
export default {
	name: 'IconCrosshair',
	props: {
		alt: {
			type: String,
			default: ''
		}
	}
}
</script>
