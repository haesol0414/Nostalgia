import React, { useState } from 'react';
import Input from '../../components/Input/Input';
import styles from './SignUp.module.scss';
import BlackButton from '../../components/Button/BlackButton';
import WhiteButton from '../../components/Button/WhiteButton';
import { NewUser } from '../../model/user';
import { useNavigate } from 'react-router-dom';
import {
	MessageResponse,
	userEmailCheck,
	userSignUp,
} from '../../utils/apiRequests';
import axios from 'axios';

export default function SignUp() {
	const navigate = useNavigate();
	const [newUser, setNewUser] = useState<NewUser>({
		email: '',
		name: '',
		password: '',
	});
	const [passwordConfirm, setPasswordConfirm] = useState<string>('');
	const [emailValidation, setEmailValidation] = useState<boolean>(false);
	const [passwordValidation, setPasswordValidation] =
		useState<boolean>(false);

	const isEmailValid = (email: string): boolean => {
		// 이메일 형식을 확인하는 정규 표현식
		const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		return emailPattern.test(email);
	};

	const isPasswordValid = (password: string): boolean => {
		// 비밀번호가 8자리 이상, 영문자, 숫자, 특수문자를 각각 하나 이상 포함하는지 확인하는 정규 표현식
		const passwordPattern =
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
		return passwordPattern.test(password);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (emailValidation) {
			if (isPasswordValid(newUser.password)) {
				setPasswordValidation(true);
			} else {
				alert('비밀번호 형식을 확인하세요.');
				return;
			}
		} else {
			alert('이메일을 확인하세요.');
			return;
		}

		try {
			if (
				emailValidation &&
				passwordValidation &&
				newUser.password === passwordConfirm
			) {
				const response = await userSignUp<MessageResponse>({ newUser });

				if (response.status === 201) {
					console.log(response);
					alert('성공적으로 가입되었습니다.');
					navigate('/login');
				}
			} else if (
				emailValidation &&
				passwordValidation &&
				newUser.password !== passwordConfirm
			) {
				alert('비밀번호가 일치하지 않습니다.');
				return;
			}
		} catch (error) {
			console.log('가입 실패 : ', error);
		}
	};

	// 이메일 중복체크 버튼
	const handleEmailCheckBtn = async () => {
		if (!isEmailValid(newUser.email)) {
			alert('올바른 이메일 형식이 아닙니다.');
			return;
		}

		try {
			const response = await userEmailCheck(newUser.email);

			if (response.status === 200) {
				alert('사용 가능한 이메일입니다.');
				setEmailValidation(true);
			}
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 400) {
				alert('이미 존재하는 이메일입니다.');
				setEmailValidation(false);
			} else {
				console.error(error);
			}
		}
	};

	return (
		<section className={styles.signUpSection}>
			<form onSubmit={handleSubmit} className={styles.signUpForm}>
				<div className={styles.email}>
					<Input
						type="text"
						placeholder="이메일"
						value={newUser.email}
						onChange={e => {
							setNewUser({ ...newUser, email: e.target.value });
						}}
						required={true}
					></Input>
					<WhiteButton
						text="중복체크"
						onClick={handleEmailCheckBtn}
					></WhiteButton>
				</div>

				<Input
					type="text"
					placeholder="이름"
					value={newUser.name}
					onChange={e => {
						setNewUser({ ...newUser, name: e.target.value });
					}}
					required={true}
				></Input>
				<Input
					type="password"
					placeholder="비밀번호"
					value={newUser.password}
					onChange={e => {
						setNewUser({ ...newUser, password: e.target.value });
					}}
					required={true}
					autoComplete="new-password"
				></Input>
				<Input
					type="password"
					placeholder="비밀번호 확인"
					value={passwordConfirm}
					onChange={e => setPasswordConfirm(e.target.value)}
					required={true}
					autoComplete="new-password"
				></Input>
				<p className={styles.prevention}>
					* 비밀번호는 8자 이상으로 영문 소문자, 숫자, 특수 문자를
					모두 포함해야 합니다.
				</p>

				<BlackButton type="submit" text="가입하기"></BlackButton>
			</form>
		</section>
	);
}
