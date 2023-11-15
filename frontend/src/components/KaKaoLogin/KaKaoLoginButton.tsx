import React from 'react';
import KaKaoButton from '../../assets/kakao_login.png';
import { redirect } from 'react-router-dom';

declare global {
	interface Window {
		Kakao: any;
	}
}

export default function KaKaoLoginButton() {
	const { Kakao } = window;

	const config = {
		redirect_uri: process.env.REACT_APP_REDIRECT_URI,
	};

	const loginWithKakao = () => {
		if (Kakao) {
			console.log(config.redirect_uri);
			Kakao.Auth.authorize({
				redirectUri: config.redirect_uri,
			});
		} else {
			console.error('Kakao 객체가 정의되지 않았습니다.');
		}
	};
	return (
		<>
			<a onClick={loginWithKakao}>
				<img src={KaKaoButton} alt="kakao" />
			</a>
		</>
	);
}
