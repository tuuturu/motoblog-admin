<template>
	<div class="CapturePhoto">
		<video ref="video"></video>
		<canvas width="640" height="480" ref="canvas"></canvas>
	</div>
</template>

<script>
export default {
	name: 'CapturePhoto',
	async mounted() {
		if (!navigator.mediaDevices.getUserMedia) {
			console.log('Camera API not available')

			return
		}

		try {
			this.$refs.video.srcObject = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: false
			})

			this.$refs.video.play()
		} catch (error) {
			console.error('Something bad happened: ' + error)
		}
	},
	beforeDestroy() {
		const tracks = this.$refs.video.srcObject.getTracks()

		tracks.map(track => track.stop())
	},
	methods: {
		capture() {
			this.$refs.canvas.getContext('2d').drawImage(this.video, 0, 0, 640, 480)
		}
	}
}
</script>

<style lang="scss" scoped>
.CapturePhoto {
	height: 100%;

	background-color: black;
}

video {
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	min-height: 100%;
}
canvas {
	display: none;
}
</style>
