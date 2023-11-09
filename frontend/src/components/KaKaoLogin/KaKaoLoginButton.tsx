import React from 'react';
import KaKaoButton from '../../assets/kakao_login.png';

declare global {
	interface Window {
		Kakao: any;
	}
}

export const REDIRECT_URI = 'http://localhost:3000/auth/kakao';

export default function KaKaoLoginButton() {
	const { Kakao } = window;

	const loginWithKakao = () => {
		console.log('hi');
		Kakao.Auth.authorize({
			redirectUri: REDIRECT_URI,
		});
	};
	return (
		<>
			<a onClick={loginWithKakao}>
				<img src={KaKaoButton} alt="kakao" />
			</a>
		</>
	);
}
