<template>
	<div class="LocationViewer">
		<div id="mapContainer"></div>
	</div>
</template>

<script>
import L from 'leaflet'

const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

export default {
	name: 'LocationViewer',
	props: {
		points: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			map: null
		}
	},
	methods: {
		addLines() {
			const coords = [...this.points].map(p => [p.latitude, p.longitude])
			const polyline = L.polyline(coords, {
				color: 'black',
				dashArray: '5,3,2'
			}).addTo(this.map)

			this.map.fitBounds(polyline.getBounds())
		}
	},
	mounted() {
		this.map = L.map('mapContainer', {
			zoomControl: false,
			attributionControl: false
		})

		L.tileLayer(TILE_URL, { attribution: false }).addTo(this.map)

		this.addLines()
	}
}
</script>

<style lang="scss" scoped>
@import '~leaflet/dist/leaflet.css';

#mapContainer {
	width: calc(100%);
	height: calc(100%);
}
</style>
