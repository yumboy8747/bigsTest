export function getPersistData(key) {
	const cache = localStorage.getItem('app-cache')
	if (cache) {
		const map = new Map(JSON.parse(cache))
		const data: any = map.get(key)
		if (data) {
			return data.data
		}
		return null
	} else {
		return null
	}
}
