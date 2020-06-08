export function readFile(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()

		reader.onload = event => resolve(event.target.result)

		try {
			reader.readAsText(file)
		} catch (error) {
			reject(error)
		}
	})
}
