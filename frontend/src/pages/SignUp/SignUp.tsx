import React, { useState } from 'react';
import Input from '../../components/Input/Input';
import styles from './SignUp.module.scss';
import BlackButton from '../../components/Button/BlackButton';
import WhiteButton from '../../components/Button/WhiteButton';
import axiosRequest from '../../apis';
import { NewUser } from '../../assets/interface';

export default function SignUp() {
	const [email, setEmail] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [doublePassword, setDoublePassword] = useState<string>('');
	const [passwordError, setPasswordError] = useState<string>('');
	const [emailError, setEmailError] = useState<string>('');
	const [doubleCheckError, setDoubleCheckError] = useState<string>('');

	const handleRigisterBtn = async () => {
		try {
			if (password === doublePassword) {
				const newUser: NewUser = {
					email,
					name,
					password,
				};
				console.log('api 호출 전 : ', newUser);

				const response = await axiosRequest.requestAxios<NewUser>(
					'post',
					'/users/signup',
					newUser,
				);

				alert('성공적으로 가입되었습니다.');
				console.log(response);
			} else {
				setDoubleCheckError('* 비밀번호가 일치하지 않습니다.');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleEmailCheckBtn = async () => {
		try {
			const response = await axiosRequest.requestAxios(
				'get',
				`/users/signup/${email}`,
			);

			alert('사용 가능한 이메일입니다.');
			console.log(response);
		} catch (error) {
			console.log('에러', error);
		}
	};

	return (
		<section className={styles.signUpSection}>
			<div className={styles.email}>
				<Input
					type="text"
					placeholder="이메일"
					value={email}
					onChange={e => {
						setEmail(e.target.value);

						const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
						if (!emailRegex.test(email)) {
							setEmailError('* 이메일 형식이 올바르지 않습니다.');
						} else {
							setEmailError('');
						}
					}}
					required={true}
				></Input>
				<WhiteButton
					text="중복체크"
					onClick={handleEmailCheckBtn}
				></WhiteButton>
			</div>
			{emailError && <p className={styles.error}>{emailError}</p>}

			<Input
				type="text"
				placeholder="이름"
				value={name}
				onChange={e => setName(e.target.value)}
				required={true}
			></Input>
			<Input
				type="password"
				placeholder="비밀번호"
				value={password}
				onChange={e => {
					setPassword(e.target.value);

					const pwRegex =
						/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

					if (!pwRegex.test(password)) {
						setPasswordError(
							'* 비밀번호 형식이 올바르지 않습니다.',
						);
					} else {
						setPasswordError('');
					}
				}}
				required={true}
			></Input>
			{passwordError && <p className={styles.error}>{passwordError}</p>}
			<Input
				type="password"
				placeholder="비밀번호 확인"
				value={doublePassword}
				onChange={e => setDoublePassword(e.target.value)}
				required={true}
			></Input>

			{doubleCheckError && (
				<p className={styles.error}>{doubleCheckError}</p>
			)}
			<BlackButton
				text="가입하기"
				onClick={handleRigisterBtn}
			></BlackButton>
		</section>
	);
}
