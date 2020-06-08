const parser = new DOMParser()

function createPoint(dom_object) {
	return {
		time: new Date(dom_object.querySelector('time').textContent),
		latitude: dom_object.attributes.lat.value,
		longitude: dom_object.attributes.lon.value
	}
}

export function parsePost(post_xml) {
	const doc = parser.parseFromString(post_xml, 'text/xml')

	const metadata = doc.querySelector('metadata')
	const name = metadata.querySelector('name').textContent
	const description = metadata.querySelector('desc').textContent

	const images = []
	metadata.querySelectorAll('image').forEach(image => {
		images.push({
			url: image.querySelector('url').textContent,
			description: image.querySelector('description').textContent
		})
	})

	const points = []
	doc
		.querySelectorAll('trkpt')
		.forEach(point => points.push(createPoint(point)))

	return { name, description, points, images }
}

export function parsePostList(list_xml) {
	const doc = parser.parseFromString(list_xml, 'text/xml')

	const posts = []
	doc.querySelectorAll('Key').forEach(file => posts.push(file.textContent))

	return posts
}
