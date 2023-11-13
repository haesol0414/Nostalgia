import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { kakaoUserLogin } from '../../utils/apiRequests';
import { useCookies } from 'react-cookie';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export const REST_API_KEY = '3f3d56df942bc4ac3232aa5d965fb01e';
export const REDIRECT_URI = 'http://localhost:3000/auth/kakao';
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

interface KaKaoUser {
	email: string;
	name: string;
}

interface CurrentUser {
	jwtToken: string;
	preference: string;
	gender: string;
}

interface KakaoLoginResponse {
	message: string;
	currentUser: CurrentUser;
}

export default function KakaoRedirectHandler() {
	const [kakaoAccessToken, setKakaoAccessToken] = useState<string>('');
	const [searchParams, setSearchParams] = useSearchParams();
	const code = searchParams.get('code') as string;
	const [kakaoUser, setKakaoUser] = useState<KaKaoUser>();
	const navigate = useNavigate();
	const [cookies, setCookie] = useCookies(['token']);
	const [loading, setLoading] = useState<boolean>(false); // 로딩 상태를 도입

	// 1. 카카오 로그인 : 토큰 발급
	const fnGetKakaoOauthToken = async () => {
		console.log('진입');
		const makeFormData = (params: { [key: string]: string }) => {
			const searchParams = new URLSearchParams();
			Object.keys(params).forEach(key => {
				searchParams.append(key, params[key]);
			});

			return searchParams;
		};

		try {
			console.log('c: ', code);
			const res = await axios({
				method: 'POST',
				headers: {
					'content-type':
						'application/x-www-form-urlencoded;charset=utf-8',
				},
				url: 'https://kauth.kakao.com/oauth/token',
				data: makeFormData({
					grant_type: 'authorization_code',
					client_id: REST_API_KEY,
					redirect_uri: REDIRECT_URI,
					code, // 인가 코드
				}),
			});

			console.log('res', res);
			console.log(res.data.access_token);
			if (res.status === 200) {
				setKakaoAccessToken(res.data.access_token);
			}
		} catch (err) {
			console.warn(err);
		}
	};

	// 2. 받아온 토큰으로 유저 정보 (email, name) => 로그인 시도
	const fnGetKakaoUserInfo = async () => {
		try {
			const res = await axios({
				method: 'GET',
				headers: {
					Authorization: `Bearer ${kakaoAccessToken}`,
				},
				url: 'https://kapi.kakao.com/v2/user/me',
			});

			console.log('get:', res);
			setKakaoUser({
				email: res.data.kakao_account.email,
				name: res.data.kakao_account.profile.nickname,
			});
		} catch (e) {
			console.log('e : ', e);
		}
	};

	// 카카오 로그인 api 호출 (JWT 토큰 획득)
	const fnUserLogin = async () => {
		console.log('Kuser: ', kakaoUser);
		try {
			const response = await kakaoUserLogin<KakaoLoginResponse>({
				kakaoUser,
			});

			if (response.data.currentUser.jwtToken) {
				setCookie('token', response.data.currentUser.jwtToken, {
					path: '/',
				});
				alert('소셜 계정으로 로그인 되셨습니다.');

				// 세션 스토리지에 유저 정보 저장
				sessionStorage.setItem('user', JSON.stringify(kakaoUser));
				sessionStorage.setItem(
					'userPreference',
					JSON.stringify({
						gender: response.data.currentUser.gender,
						preference: response.data.currentUser.preference,
					}),
				);
				setLoading(true);
			}
		} catch (error) {
			console.error('로그인 실패 : ', error);
		}
	};

	useEffect(() => {
		if (code !== null) fnGetKakaoOauthToken();
	}, [code]);

	useEffect(() => {
		console.log('a token : ', kakaoAccessToken);

		if (kakaoAccessToken !== '') fnGetKakaoUserInfo();
	}, [kakaoAccessToken]);

	useEffect(() => {
		if (kakaoAccessToken !== '' && kakaoUser) {
			fnUserLogin();
		}
	}, [kakaoAccessToken, kakaoUser]);

	useEffect(() => {
		if (loading) {
			setLoading(false);
			navigate('/');
		}
	}, [loading, cookies]);

	return (
		<>
			<LoadingSpinner />
		</>
	);
}
