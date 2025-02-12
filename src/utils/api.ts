import axios from 'axios'
import { API_URL } from '../app/constants/APIKEYS'
import {useToken} from "../app/hooks";
export default class API {

	static async send(
		method: string,
		url: string,
		token: string | null,
		data: any,
		logout: boolean = true,
		apiurl?: string
	) {
		try {
			let headers = this.getHeaders(token);
			let options = this.getOptions(method, headers, data);

			let res = await fetch((apiurl ? apiurl : API_URL) + url, options);

			if (res.status === 401) {

				const newAccessToken = await this.refreshToken();
				if (newAccessToken) {

					headers = this.getHeaders(newAccessToken);
					options = this.getOptions(method, headers, data);
					res = await fetch((apiurl ? apiurl : API_URL) + url, options);
				} else {

					if (logout) this.forceLogout();
					throw new Error('로그인을 확인해 주세요');
				}
			}

			if (res.status === 403) {
				throw new Error('접근 권한이 없습니다.');
			}

			const jsonRes = await res.json();
			if (jsonRes.code >= 500) {
				throw new Error(jsonRes.result.error || '');
			}

			return jsonRes;
		} catch (e: any) {
			console.log(e);
			throw new Error(e?.message);
		}
	}

	static async postFile(
		url: string,
		token: string | null,
		data: any,
		logout: boolean = true,
		apiurl?: string
	) {
		try {
			let headers = this.getHeaderToken(token)
			let options = this.getOptions('post', headers, data)

			let res = await fetch((apiurl ? apiurl : API_URL) + url, options)
				.then(res => {
					return res.json()
				})
				.then(res => {
					if (res.code === 503) {
						if (logout) this.forceLogout()
					}
					return res
				})
			return res
		} catch (e) {
			console.log(e)
			this.forceLogout()
		}
	}

	static async postFormdata(
		method: string,
		url: string,
		token: string | null,
		data: any,
		logout: boolean = true,
		apiurl?: string
	) {
		try {
			let response = await fetch((apiurl ? apiurl : API_URL) + url, {
				method: method,
				headers: { Authorization: 'Bearer ' + token },
				body: data,
			});


			if (response.status === 401) {

				const newAccessToken = await this.refreshToken();
				if (newAccessToken) {

					response = await fetch((apiurl ? apiurl : API_URL) + url, {
						method: method,
						headers: { Authorization: 'Bearer ' + newAccessToken },
						body: data,
					});
				} else {
					if (logout) this.forceLogout();
					throw new Error("로그인을 확인해 주세요");
				}
			}

			if (response.status === 403) {
				throw new Error("접근 권한이 없습니다.");
			}

			const jsonRes = await response.json();
			if (jsonRes.code >= 500) {
				throw new Error(jsonRes.result.error || "");
			}

			return jsonRes;
		} catch (e: any) {
			console.error("PostFormData Error:", e);
			throw new Error(e?.message);
		}
	}

	static async postImage(
		method: 'POST' | 'PUT' | 'PATCH',
		url: string,
		token: string | null,
		data: any,
		apiurl?: string
	) {
		return this.postFormdata(method, url, token, data, true, apiurl)
	}

	static async get(
		url: string,
		token: string | null,
		data: any,
		logout: boolean = true,
		apiurl?: string
	) {
		return this.send('GET', url, token, data, logout, apiurl)
	}
	static async post(
		url: string,
		token: string | null,
		data: any,
		apiurl?: string
	) {
		return this.send('POST', url, token, data, true, apiurl)
	}
	static async patch(
		url: string,
		token: string | null,
		data: any,
		apiurl?: string
	) {
		return this.send('PATCH', url, token, data, true, apiurl)
	}


	static async postForm(
		url: string,
		token: string | null,
		data: any,
		apiurl?: string
	) {
		return this.send('POST', url, token, data, true, apiurl)
	}

	static async delete(
		url: string,
		token: string | null,
		data: any,
		apiurl?: string
	) {
		return this.send('DELETE', url, token, data, true, apiurl)
	}
	static async put(
		url: string,
		token: string | null,
		data: any,
		apiurl?: string
	) {
		return this.send('PUT', url, token, data, true, apiurl)
	}

	static async getPublic(url: string) {
		return this.send('GET', url, null, {})
	}
	static async postPublic(url: string, data: any) {
		return this.send('POST', url, null, data)
	}
	static async deletePublic(url: string, data: any) {
		return this.send('DELETE', url, null, data)
	}
	static async putPublic(url: string, data: any) {
		return this.send('PUT', url, null, data)
	}

	// static async refreshToken(token: string) {
	// 	try {
	// 		let options = this.getOptions('POST', this.getHeaders(token), {
	// 			token,
	// 		})
	//
	// 		let res = await fetch(API_URL + '/auth/refresh', options)
	// 			.then(res => {
	// 				return res.json()
	// 			})
	// 			.then(res => {
	// 				if (res.code !== 0) {
	// 					return false
	// 				}
	// 				return res
	// 			})
	// 		return res
	// 	} catch (e) {
	// 		console.log(e)
	// 		this.forceLogout()
	// 	}
	// }


	static async refreshToken() {
		const refreshToken = localStorage.getItem('refreshToken');
		if (!refreshToken) {
			console.warn("refreshToken 없음");
			return null;
		}

		try {
			// console.log("🔄 Refresh 요청 전 refreshToken:", refreshToken);

			const response = await fetch(API_URL + '/auth/refresh', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ refreshToken }),
			});

			const data = await response.json();
			console.log("🔄 Refresh 응답:", data);

			if (response.status === 401) {
				// console.error("⛔ Refresh Token 만료 또는 유효하지 않음");
				return null;
			}

			if (data?.accessToken) {

				localStorage.setItem('refreshToken', data.refreshToken);
				localStorage.setItem('LOCAL@ACCESS_TOKEN', data.accessToken);
        // console.log("✅ 새 accessToken 설정 완료:", data.accessToken);

				return data.accessToken;
			} else {
				console.log('Refresh token 만료');
				return null;
			}

		} catch (error) {
			console.error('refresh token 에러:', error);
			return null;
		}
	}

	static getHeaders(token: string | null) {
		const headers: any = token
			? {
				Authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',

			}
			: {
				'Content-Type': 'application/json',
			}
		return headers
	}


	static getHeaderToken(token: string | null) {
		const headers: any = token
			? {
				Authorization: 'Bearer ' + token

			}
			: {
				Authorization: 'Bearer ',
			}
		return headers
	}

	static getOptions(method: string, headers: any, data?: any) {
		const options =
			method.toLocaleUpperCase() === 'GET'
				? {
					method: method,
					headers: headers,
				}
				: {
					method: method,
					headers: headers,
					body: JSON.stringify(data),
				}
		return options
	}

	static forceLogout() {
		window.location.href = '/logout'
	}


}

