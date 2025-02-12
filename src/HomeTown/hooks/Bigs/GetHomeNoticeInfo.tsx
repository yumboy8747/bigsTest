import useSWR from 'swr'
import {useToken} from "../../../app/hooks";
import API from "../../../utils/api";


const M_KEY = '/boards' // 광고상세조회

const fetchKey = (id) =>
	`${M_KEY}/${id}`;

export function useHomeNoticeInfo(id) {
	const { data: token } = useToken();

	const KEY = fetchKey(id);


	const fetcher = () => fetchAPI(KEY, token);
	const { data, mutate, isLoading } = useSWR(token ? KEY : null, fetcher, { revalidateOnFocus: true });

	return { homeNoticeInfo: data, mutateHomeNoticeInfo: mutate, isLoading};
}

async function fetchAPI(KEY:string, token:any)  {
	try {
		return await API.get(`${KEY}`, token + '', {});
	} catch (error) {
		console.error('Failed to fetch Home Notice Info:', error);
		return { };
	}
}