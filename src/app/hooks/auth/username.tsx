import { LOGIN_USERNAME } from '../../../app/constants/LOCALKEYS'
import useSWR from 'swr'
import { getPersistData } from '../persist'

const KEY = LOGIN_USERNAME

let swrData: string | null = getPersistData(KEY)

export function useUser(initData?: any, reset?: boolean) {
	const { data, mutate } = useSWR<string | null>(
		KEY,
		async () => {
			if (reset === true) {
				swrData = null
				return null
			}
			if (initData !== undefined) {
				swrData = initData
			} else {
				/*
				if (swrData != null) {
					const response = await API.refreshToken(swrData)
					if (response.code === 0) {
						swrData = response.result
					} else {
						swrData = null
						mutate(null)
					}
				}
				*/
			}

			return swrData
		},
		{ refreshInterval: 60 * 1000 * 10 }
	)

	return {
		data,
		mutate: (value: string | null) => {
			swrData = value
			return mutate()
		},
	}
}
