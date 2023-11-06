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
import { isEmailValid, isPasswordValid } from '../../utils/vaildationCheck';

export default function SignUp() {
	const navigate = useNavigate();
	const [newUser, setNewUser] = useState<NewUser>({
		email: '',
		name: '',
		password: '',
	});
	const [passwordConfirm, setPasswordConfirm] = useState<string>('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!isEmailValid(newUser.email)) {
			alert('올바른 이메일 형식이 아닙니다.');
			return;
		}

		if (!isPasswordValid(newUser.password)) {
			alert('비밀번호 형식을 확인하세요.');
			return;
		}

		try {
			if (newUser.password === passwordConfirm) {
				const response = await userSignUp<MessageResponse>({ newUser });

				if (response.status === 201) {
					console.log(response);
					alert('성공적으로 가입되었습니다.');
					navigate('/login');
				}
			} else if (newUser.password !== passwordConfirm) {
				alert('비밀번호가 일치하지 않습니다.');
				return;
			}
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 400) {
				alert('이미 존재하는 회원입니다.');
			} else {
				console.error('가입 실패 : ', error);
			}
		}
	};

	// 이메일 중복체크 버튼
	const handleEmailCheckBtn = async () => {
		try {
			const response = await userEmailCheck(newUser.email);

			if (response.status === 200) {
				alert('사용 가능한 이메일입니다.');
			}
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 400) {
				alert('이미 존재하는 이메일입니다.');
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
