import React, { useState } from 'react';
import Input from '../../components/Input/Input';
import WhiteButton from '../../components/Button/WhiteButton';
import BlackButton from '../../components/Button/BlackButton';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import { userLogin } from '../../utils/apiRequests';
import { useCookies } from 'react-cookie';

interface Credentials {
	email: string;
	password: string;
}

interface LoginResponse {
	message: string;
	token: string;
}

export default function Login() {
	const [cookies, setCookie] = useCookies(['token']);

	const navigate = useNavigate();
	const [credentials, setCredentials] = useState<Credentials>({
		email: '',
		password: '',
	});

	const handleLoginBtn = async () => {
		try {
			const response = await userLogin<LoginResponse>({ credentials });

			if (response.data.token) {
				setCookie('token', response.data.token, { path: '/' });

				alert('로그인 성공');
				navigate('/');
			}
		} catch (error) {
			console.error('로그인 실패: ', error);
		}
	};

	const handleRigisterBtn = () => {
		navigate('/signup');
	};

	return (
		<section className={styles.loginSection}>
			<img src="https://i.pinimg.com/564x/92/25/de/9225de1959d7f136b02f5fb5ce676883.jpg" />
			<div className={styles.loginWrap}>
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
				></Input>
				<div className={styles.buttonWrap}>
					<BlackButton
						text="로그인"
						onClick={handleLoginBtn}
					></BlackButton>
					<WhiteButton
						text="회원가입"
						onClick={handleRigisterBtn}
					></WhiteButton>
				</div>
			</div>
		</section>
	);
}
