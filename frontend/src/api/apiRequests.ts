import { AxiosInstance, AxiosResponse } from 'axios';
import { authInstance, defaultInstance } from './apiInstances';

export interface MessageResponse {
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

export const kakaoUserLogin = <T>(
	data: object,
): Promise<{ status: number; data: T }> => {
	return requestPost<T>('/users/login/kakao', defaultInstance, data);
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

// 맞춤 정보 변경
export const changeUserPreference = <T>(
	data: object,
): Promise<{ status: number; data: T }> => {
	return requestPost<T>('/users/preference', authInstance, data);
};

// 회원 탈퇴
export const withdrawal = <T>(): Promise<{ status: number; data: T }> => {
	return requestDelete<T>('/users', authInstance);
};

/* [ PRODUCT 관련 api ] */

// 상품 전체 조회
export const getAllProducts = <T>(): Promise<{ status: number; data: T }> => {
	return requestGet<T>('/products', authInstance);
};

// 상품 등록
export const addNewProduct = <T>(
	data: object,
): Promise<{ status: number; data: T }> => {
	return requestPost<T>('/products', authInstance, data);
};

// 상품 수정
export const patchProductDetail = <T>(
	data: object,
): Promise<{ status: number; data: T }> => {
	return requestPatch<T>('/admin/products', authInstance, data);
};

// 상품 삭제
export const deleteProduct = <T>(
	data: object,
): Promise<{ status: number; data: T }> => {
	return requestDelete<T>('/admin/products', authInstance, data);
};

// 홈 화면 상품 조회
export const getMainProducts = <T>(): Promise<{ status: number; data: T }> => {
	return requestGet<T>('/main-products', defaultInstance);
};

// 성별 카테고리별 상품 조회
export const getAllProductsByCategory = <T>(
	category: string,
): Promise<{ status: number; data: T }> => {
	return requestGet<T>(
		`/products/gender/?gender=${category}`,
		defaultInstance,
	);
};

// 성별 카테고리별 상품 조회
export const getAllProductsByTags = <T>(
	tagName: string,
): Promise<{ status: number; data: T }> => {
	return requestGet<T>(`/products/tags/?tags=${tagName}`, defaultInstance);
};

// 상품 상세 조회
export const getProductsDetails = <T>(
	productId: string,
): Promise<{ status: number; data: T }> => {
	return requestGet<T>(`/products/${productId}`, defaultInstance);
};

// 유저 맞춤 상품 조회
export const getUserPreferenceProducts = <T>(
	data: object,
): Promise<{ status: number; data: T }> => {
	return requestPost<T>('/products/users/preference', authInstance, data);
};

/* [ ORDER 관련 api ] */

// 주문 하기
export const createNewOrder = <T>(
	data: object,
): Promise<{ status: number; data: T }> => {
	return requestPost<T>('/orders', authInstance, data);
};

// 회원 주문 내역 조회
export const getUserOrderHistory = <T>(): Promise<{
	status: number;
	data: T;
}> => {
	return requestGet<T>(`/orders/history`, authInstance);
};

// 회원 주문 상세 조회
export const getUserOrderDetails = <T>(
	orderNumber: string,
): Promise<{ status: number; data: T }> => {
	return requestGet<T>(`/orders/history/${orderNumber}`, authInstance);
};
