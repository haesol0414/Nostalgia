import { AxiosInstance, AxiosResponse } from 'axios';
import { authInstance, defaultInstance } from './apiInstances';

export interface ApiResponse {
	message: string;
}

// POST 요청 함수
const requestPost = async <T>(
	path: string,
	instance: AxiosInstance,
	data: any,
): Promise<{ status: number; data: T }> => {
	const response: AxiosResponse<T> = await instance.post(
		path,
		JSON.stringify(data),
	);
	const status = response.status;

	return {
		status: status,
		data: response.data,
	};
};

// GET 요청 함수
const requestGet = async <T>(
	path: string,
	instance: AxiosInstance,
): Promise<{ status: number; data: T }> => {
	const response: AxiosResponse<T> = await instance.get(path);
	const status = response.status;

	return {
		status: status,
		data: response.data,
	};
};

// PATCH 요청 함수
const requestPatch = async <T>(
	path: string,
	instance: AxiosInstance,
	data: any,
): Promise<{ status: number; data: T }> => {
	const response: AxiosResponse<T> = await instance.patch(
		path,
		JSON.stringify(data),
	);
	const status = response.status;

	return {
		status: status,
		data: response.data,
	};
};

// DELETE 요청 함수
const requestDelete = async <T>(
	path: string,
	instance: AxiosInstance,
	data?: any,
): Promise<{ status: number; data: T }> => {
	const response: AxiosResponse<T> = data
		? await instance.delete(path, { data })
		: await instance.delete(path);
	const status = response.status;
	return {
		status: status,
		data: response.data,
	};
};

/* [ USER 관련 api ] */

// 회원가입
export const userSignUp = <T>(
	data: object,
): Promise<{ status: number; data: T }> => {
	return requestPost<T>('/users/signup', defaultInstance, data);
};

export const userEmailCheck = <T>(
	email: string,
): Promise<{ status: number; data: T }> => {
	return requestGet<T>(`/users/signup/${email}`, defaultInstance);
};

// 로그인
export const userLogin = <T>(
	data: object,
): Promise<{ status: number; data: T }> => {
	return requestPost<T>('/login', defaultInstance, data);
};

// 유저 정보 조회
export const getUserDetails = <T>(): Promise<{ status: number; data: T }> => {
	return requestGet<T>(`/users`, authInstance);
};

// 연락처, 주소, 상세 주소 변경
export const patchUserAddress = <T>(
	data: object,
): Promise<{ status: number; data: T }> => {
	return requestPatch<T>('/users', authInstance, data);
};

// 비밀번호 변경
export const changePassword = <T>(
	data: object,
): Promise<{ status: number; data: T }> => {
	return requestPost<T>('/users/password', authInstance, data);
};

// 회원 탈퇴
export const withdrawal = <T>(): Promise<{ status: number; data: T }> => {
	return requestDelete<T>('/users', authInstance);
};

/* [ PRODUCT 관련 api ] */

// 관리자
export const getAllProducts = <T>(): Promise<{ status: number; data: T }> => {
	return requestGet<T>('/products', authInstance);
};

export const addNewProduct = <T>(
	data: object,
): Promise<{ status: number; data: T }> => {
	return requestPost<T>('/products', authInstance, data);
};

export const patchProductDetail = <T>(
	data: object,
): Promise<{ status: number; data: T }> => {
	return requestPatch<T>('/admin/products', authInstance, data);
};

export const deleteProduct = <T>(
	data: string,
): Promise<{ status: number; data: T }> => {
	return requestDelete<T>('/admin/products', authInstance, data);
};
