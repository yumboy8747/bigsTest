import useSWR from 'swr'
import {useToken} from "../../../app/hooks";
import API from "../../../utils/api";


const M_KEY = '/boards/categories'

const fetchKey = () =>
	`${M_KEY}`;

export function useBoardCategoryInfo() {
	const { data: token } = useToken();

	const KEY = fetchKey();


	const fetcher = () => fetchAPI(KEY, token);
	const { data, mutate } = useSWR(token ? `${KEY}` : null, fetcher, { revalidateOnFocus: true });

	return { boardCategoryInfo: data, mutateBoardCategoryInfo: mutate};
}

async function fetchAPI(KEY:string, token:any)  {
	try {
		const response = await API.get(`${KEY}`, token + '', {});
		return response || {};
	} catch (error) {
		console.error('Failed to fetch Home Inquire Info:', error);
		return {};
	}
}