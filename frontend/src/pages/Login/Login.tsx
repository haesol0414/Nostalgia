import React, { useState, useEffect } from 'react';
import Input from '../../components/Input/Input';
import WhiteButton from '../../components/Button/WhiteButton';
import BlackButton from '../../components/Button/BlackButton';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import axiosRequest from '../../apis';
import { useCookies } from 'react-cookie';
import { userState } from '../../recoli/recoilAtoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { User } from '../../assets/interface';

interface Response {
	data: ResponseData;
}

interface ResponseData {
	Authorization: string;
	searchedUser: User;
}

export default function Login() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [cookies, setCookie] = useCookies(['authToken']);
	const [user, setUser] = useRecoilState(userState);
	const global = useRecoilValue(userState);

	useEffect(() => {
		console.log('유저:', user); // 업데이트된 user 값을 출력
		console.log('전역 유저:', global);
	}, [user]);

	const navigate = useNavigate();
	const handleRigisterBtn = () => {
		navigate('/signup');
	};

	const handleLoginBtn = async () => {
		try {
			console.log('api 호출 전 : ', email, password);

			const response: Response = await axiosRequest.requestAxios(
				'post',
				'/login',
				{
					email,
					password,
				},
			);

			if (response) {
				alert('성공적으로 로그인되었습니다..');
				console.log(response);

				const token = response.data.Authorization;
				setCookie('authToken', token, { maxAge: 7 * 24 * 60 * 60 });
				const loggedInUser = response.data.searchedUser;
				setUser(loggedInUser);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section className={styles.loginSection}>
			<img src="https://i.pinimg.com/564x/92/25/de/9225de1959d7f136b02f5fb5ce676883.jpg" />
			<div className={styles.loginWrap}>
				<Input
					type="text"
					placeholder="이메일"
					value={email}
					onChange={e => setEmail(e.target.value)}
					required={true}
				></Input>
				<Input
					type="password"
					placeholder="비밀번호"
					value={password}
					onChange={e => setPassword(e.target.value)}
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
