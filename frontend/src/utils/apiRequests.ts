import { AxiosInstance, AxiosResponse } from 'axios';
import { defaultInstance } from './apiInstances';

// POST 요청 함수
const requestPost = async <T>(
	path: string,
	instance: AxiosInstance,
	data: any,
): Promise<T> => {
	const response: AxiosResponse<T> = await instance.post(
		path,
		JSON.stringify(data),
	);
	return response.data;
};

// GET 요청 함수
const requestGet = async <T>(
	path: string,
	instance: AxiosInstance,
): Promise<T> => {
	const response: AxiosResponse<T> = await instance.get(path);
	return response.data;
};

// PATCH 요청 함수
const requestPatch = async <T>(
	path: string,
	instance: AxiosInstance,
	data: any,
): Promise<T> => {
	const response: AxiosResponse<T> = await instance.put(
		path,
		JSON.stringify(data),
	);
	return response.data;
};

// DELETE 요청 함수
const requestDelete = async <T>(
	path: string,
	instance: AxiosInstance,
	data?: any,
): Promise<T> => {
	const response: AxiosResponse<T> = data
		? await instance.delete(path, { data })
		: await instance.delete(path);

	return response.data;
};

// 함수 모음
export const userLogin = <T>(data: object): Promise<T> => {
	return requestPost<T>('/login', defaultInstance, data);
};

// export const getListBank = <T>(): Promise<T> => {
// 	return requestGet<T>(PATH.BANKS, authInstance);
// };

// export const deleteProduct = <T>(id: string): Promise<T> => {
// 	return requestDelete<T>(`${PATH.PRODUCT}/${id}`, adminInstance);
// };
