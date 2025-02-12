import useSWR from 'swr'
import { THEME_STORE } from '../../../app/constants/LOCALKEYS'
import { getPersistData } from '../persist'

const KEY = THEME_STORE

let swrData: string | null = getPersistData(KEY)
export function useThemeStore(initData?: any) {
	const { data, mutate } = useSWR<any>(KEY, async () => {
		if (initData !== undefined) {
			swrData = initData
		}
		return swrData
	})

	return {
		data,
		mutate: (value: any) => {
			swrData = value
			return mutate()
		},
	}
}