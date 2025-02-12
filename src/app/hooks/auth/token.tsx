import { ACCESS_TOKEN } from '../../constants/LOCALKEYS'
import useSWR from 'swr'

const KEY = ACCESS_TOKEN


export function useToken(initData?: string, reset?: boolean) {

	const storedToken = localStorage.getItem(KEY);
	let swrData: string | null = storedToken ? storedToken : null;

	const fetcher = async (): Promise<string | null> => {
		if (reset) {
			swrData = null;
			localStorage.removeItem(KEY);
			return null;
		}
		if (initData !== undefined) {
			swrData = initData;
			localStorage.setItem(KEY, swrData);
		}
		return swrData;
	};

	const { data, mutate } = useSWR<string | null>(KEY, fetcher, {
		refreshInterval: 60 * 1000 * 10,
	});

	const setToken = (value: string | null) => {
		// console.log('value', value)

		if (value !== undefined) {
			swrData = value;
			if (swrData) {
				localStorage.setItem(KEY, swrData);
			} else {
				localStorage.removeItem(KEY);
			}
		}
		return mutate(swrData, false);
	};

	return {
		data,
		mutate: setToken
	};
}