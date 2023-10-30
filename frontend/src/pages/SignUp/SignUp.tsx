import React, { useState } from 'react';
import Input from '../../components/Input/Input';
import styles from './SignUp.module.scss';
import BlackButton from '../../components/Button/BlackButton';
import WhiteButton from '../../components/Button/WhiteButton';
import { NewUser } from '../../model/user';
import {
	MessageResponse,
	userEmailCheck,
	userSignUp,
} from '../../utils/apiRequests';

export default function SignUp() {
	const [newUser, setNewUser] = useState<NewUser>({
		email: '',
		name: '',
		password: '',
	});
	const [passwordConfirm, setPasswordConfirm] = useState<string>('');

	// 가입하기 버튼
	const handleRigisterBtn = async () => {
		try {
			if (newUser.password === passwordConfirm) {
				const response = await userSignUp<MessageResponse>({ newUser });

				if (response.status === 201) {
					console.log(response);
					alert('성공적으로 가입되었습니다.');
				}
			} else {
				alert('비밀번호가 일치하지 않습니다.');
				// 나중에 인풋 밑에 경고 문구 띄우는걸로 바꾸기 (+ 이메일, 비밀번호 형식 체크)
			}
		} catch (error) {
			console.log('가입 실패 : ', error);
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
			console.log(error);
		}
	};

	return (
		<section className={styles.signUpSection}>
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
			></Input>
			<Input
				type="password"
				placeholder="비밀번호 확인"
				value={passwordConfirm}
				onChange={e => setPasswordConfirm(e.target.value)}
				required={true}
			></Input>
			<BlackButton
				text="가입하기"
				onClick={handleRigisterBtn}
			></BlackButton>
		</section>
	);
}
