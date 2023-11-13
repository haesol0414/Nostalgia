import React, { useState } from 'react';
import Input from '../../components/Input/Input';
import WhiteButton from '../../components/Button/WhiteButton';
import BlackButton from '../../components/Button/BlackButton';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import { userLogin } from '../../utils/apiRequests';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import KaKaoLoginButton from '../../components/KaKaoLogin/KaKaoLoginButton';
import ErrorText from '../../components/ErrorText/ErrorText';

interface Credentials {
	email: string;
	password: string;
}

interface CurrentUser {
	token: string;
	email: string;
	name: string;
	role: string;
	preference: string;
	gender: string;
}

interface LoginResponse {
	message: string;
	currentUser: CurrentUser;
}

export default function Login() {
	const [cookies, setCookie] = useCookies(['token']);
	const navigate = useNavigate();
	const [credentials, setCredentials] = useState<Credentials>({
		email: '',
		password: '',
	});
	const [passwordConfirm, setPasswordConfirm] = useState<boolean>(true);

	const handleLoginBtn = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			const response = await userLogin<LoginResponse>({ credentials });

			if (response.data.currentUser.token) {
				setPasswordConfirm(true);
				setCookie('token', response.data.currentUser.token, {
					path: '/',
				});
				// 세션 스토리지에 유저 정보 저장
				sessionStorage.setItem(
					'user',
					JSON.stringify({
						email: response.data.currentUser.email,
						name: response.data.currentUser.name,
						role: response.data.currentUser.role,
					}),
				);
				sessionStorage.setItem(
					'userPreference',
					JSON.stringify({
						gender: response.data.currentUser.gender,
						preference: response.data.currentUser.preference,
					}),
				);

				alert('로그인 성공');
				navigate('/');
			}
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 409) {
				setPasswordConfirm(false);
			} else if (
				axios.isAxiosError(error) &&
				error.response?.status === 400
			) {
				alert('존재하지 않는 회원입니다. ');
			} else {
				console.error('로그인 실패 : ', error);
			}
		}
	};

	const handleRigisterBtn = () => {
		navigate('/sign-up');
	};

	return (
		<section className={styles.loginSection}>
			<img src="https://i.pinimg.com/564x/92/25/de/9225de1959d7f136b02f5fb5ce676883.jpg" />
			<form onSubmit={handleLoginBtn} className={styles.loginForm}>
				<Input
					type="text"
					placeholder="이메일"
					value={credentials.email}
					onChange={e =>
						setCredentials({
							...credentials,
							email: e.target.value,
						})
					}
					required={true}
				></Input>
				<Input
					type="password"
					placeholder="비밀번호"
					value={credentials.password}
					onChange={e =>
						setCredentials({
							...credentials,
							password: e.target.value,
						})
					}
					required={true}
					autoComplete="new-password"
				></Input>
				{!passwordConfirm ? (
					<ErrorText message="비밀번호가 일치하지 않습니다." />
				) : (
					<></>
				)}
				<div className={styles.buttonWrap}>
					<BlackButton type="submit" text="로그인"></BlackButton>
					<WhiteButton
						text="회원가입"
						onClick={handleRigisterBtn}
					></WhiteButton>
					<div className={styles.socialLogin}>
						<span>카카오로 로그인 / 가입하기</span>
						<KaKaoLoginButton />
					</div>
				</div>
			</form>
		</section>
	);
}
