import useSWR from 'swr'

import { getPersistData } from './persist'
import API from '../../utils/api'
const KEY = '/system/menus'

let swrData: string | null = getPersistData(KEY)

export function useMenus(initData?: any, reset?: boolean) {
	const { data, mutate } = useSWR<any>(
		KEY,
		async () => {
			const res = await API.send('GET', KEY, null, {})
			if (res.result.success) {
				swrData = res.result.result
			} else {
			}

			return swrData
		},
		{ refreshInterval: 60 * 1000 * 10 }
	)

	return {
		data,
		mutate: (value: string | null) => {
			if (value !== undefined) swrData = value
			return mutate()
		},
	}
}
