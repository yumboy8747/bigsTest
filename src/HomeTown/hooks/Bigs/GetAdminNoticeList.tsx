import useSWR from 'swr'
import {useToken} from "../../../app/hooks";
import API from "../../../utils/api";

interface ResponseTypes {
	list: any[];
	total: number;
}

const M_KEY = '/boards' // 광고목록 조회

const fetchKey = (page, maxData) =>
	`${M_KEY}?${'page=' + page}${maxData && '&size=' + maxData}`;

export function useAdminNoticeList(page, maxData) {
	const { data: token } = useToken();

	const KEY = fetchKey(page, maxData);


	const fetcher = () => fetchAPI(KEY, token);
	const { data, mutate, isLoading } = useSWR(token ? `${KEY}` : null, fetcher, { revalidateOnFocus: true });

	return { adminNoticeList: data?.list, mutateAdminNoticeList: mutate, total: data?.total, isLoading };
}

async function fetchAPI(KEY:string, token:any): Promise<ResponseTypes> {
	try {
		const response = await API.get(`${KEY}`, token + '', {});
		return {list: response.content || [], total: response.totalElements}
	} catch (error) {
		console.error('Failed to fetch Admin Notice List:', error);
		return { list: [], total: 0 };
	}
}