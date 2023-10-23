import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getToken } from './authUtils';

interface HeaderOptions {
	'content-type': string;
	apikey: string;
	username: string;
	[key: string]: string;
}

// const MASTER_KEY = { masterKey: 'true' };

const getHeader = (option?: Record<string, string>): HeaderOptions => {
	const header: HeaderOptions = {
		'content-type': 'application/json',
		apikey: process.env.REACT_APP_API_KEY || '',
		username: process.env.REACT_APP_USER_NAME || '',
	};
	if (option) {
		Object.assign(header, option);
	}
	return header;
};

// 기본 인스턴스
const axiosApi = (url: string, options?: AxiosRequestConfig): AxiosInstance => {
	const instance = axios.create({
		baseURL: url,
		headers: getHeader(),
		...options,
	});
	return instance;
};

const axiosAuthApi = (
	url: string,
	token: string, // 외부에서 토큰을 전달 받도록 수정
	options?: AxiosRequestConfig,
): AxiosInstance => {
	const accessToken: { Authorization?: string } = token
		? { Authorization: `Bearer ${token}` }
		: {};

	const instance = axios.create({
		baseURL: url,
		headers: getHeader(accessToken),
		...options,
	});
	return instance;
};

// master key 추가 인스턴스 (관리자용)
// const axiosAdminApi = (url: string, options?: AxiosRequestConfig): AxiosInstance => {
//   const instance = axios.create({
//     baseURL: url,
//     headers: getHeader(MASTER_KEY),
//     ...options,
//   });
//   return instance;
// };

export const defaultInstance = axiosApi(process.env.REACT_APP_BASE_URL || '');
export const authInstance = axiosAuthApi(
	process.env.REACT_APP_BASE_URL || '',
	getToken(),
);
// export const adminInstance = axiosAdminApi(process.env.REACT_APP_BASE_URL || '');
