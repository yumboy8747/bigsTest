import API from '../../utils/api'


export const fetcher = async (url: string, token: any, logout: boolean) => {
	if (!url) {
		return {}
	}
	const response = await API.send('GET', url, token, logout)
	return response
}
