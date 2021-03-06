<template>
	<div class="LocationSelector">
		<div class="marker-container">
			<IconCrosshair />
		</div>

		<div id="mapContainer"></div>
	</div>
</template>

<script>
import L from 'leaflet'
import IconCrosshair from '@/feature/posts/components/icons/IconCrosshair'

const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const ATTRIBUTION =
	'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'

function getLocation() {
	return new Promise((resolve, reject) => {
		if (!navigator.geolocation) reject()

		navigator.geolocation.getCurrentPosition(position => {
			resolve([position.coords.latitude, position.coords.longitude])
		}, reject)
	})
}

export default {
	name: 'LocationSelector',
	components: { IconCrosshair },
	props: {
		value: {
			type: String,
			default: () => 'geo:41.8875,12.4818'
		}
	},
	data: () => ({
		map: null
	}),
	computed: {
		coords() {
			return this.value.split(':')[1].split(',')
		}
	},
	async mounted() {
		this.map = L.map('mapContainer', { zoomControl: false })

		L.tileLayer(TILE_URL, { attribution: ATTRIBUTION }).addTo(this.map)
		this.map.setView(this.coords, 6)

		this.map.on('moveend', () => {
			const center = this.map.getCenter()

			const geo_uri = `geo:${center.lat},${center.lng}`

			this.$emit('input', geo_uri)
		})

		try {
			const location = await getLocation()

			this.map.setView(location, 14)
		} catch (error) {
			if (error.code === 1) {
				// user denied geo location request
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '~leaflet/dist/leaflet.css';
@import '~@/assets/palette.scss';

.LocationSelector {
	text-align: left;

	position: relative;
}
.marker-container {
	position: absolute;

	width: 100%;
	height: 100%;

	z-index: 10000;

	display: flex;
	justify-content: center;
	align-items: center;

	pointer-events: none;

	.IconCrosshair {
		width: 48px;
		height: 48px;

		color: $highlight-dark;
	}
}
#mapContainer {
	width: 100%;
	height: 240px;
}
</style>
