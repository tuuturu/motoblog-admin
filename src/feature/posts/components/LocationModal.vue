<template>
	<div class="LocationModal">
		<div class="wrapper">
			<input
				ref="hiddenFileInput"
				type="file"
				accept=".gpx"
				@change="parseFiles"
			/>
			<button @click="openFileInput">Upload file</button>
		</div>
	</div>
</template>

<script>
import { parsePost } from '@/tools/gpx'
import { readFile } from '@/tools/files'

export default {
	name: 'LocationModal',
	methods: {
		openFileInput() {
			this.$refs.hiddenFileInput.click()
		},
		async parseFiles(event) {
			const files = event.target.files

			const data = await readFile(files[0])
			const { points } = parsePost(data)

			this.$emit('input', points)
		}
	}
}
</script>

<style lang="scss" scoped>
.LocationModal {
	margin-left: -1em;
	position: absolute;
	top: 0;

	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;
}
.wrapper {
	border: 2px solid black;
	padding: 2em 4em;

	background-color: white;
}

button:not(:first-child) {
	margin-left: 0.5em;
}

input {
	display: none;
}
</style>
