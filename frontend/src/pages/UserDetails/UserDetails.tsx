import React, { useState, useEffect } from 'react';
import Input from '../../components/Input/Input';
import styles from './UserDetails.module.scss';
import BlackButton from '../../components/Button/BlackButton';
import WhiteButton from '../../components/Button/WhiteButton';
// import { useCookies } from 'react-cookie';
import axiosRequest from '../../apis';

interface userAddress {
	phone: string;
	address: string;
	detailAddress: string;
}

// interface Data {
// 	user: User;
// }

export default function UserDetails() {
	const [newPassword, setNewPassword] = useState<string>('');
	const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>('');
	const [address, setAddress] = useState<string>('');
	const [detailAddress, setDetailAddress] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const email = 'sol@sol.com';

	// 정보 불러오기
	useEffect(() => {
		const getUserInformation = async () => {
			try {
				console.log(email);

				const response = await axiosRequest.requestAxios(
					'get',
					`/users/${email}`,
					{ email },
				);

				console.log('회원 정보 : ', response);

				// setUser 해야함
			} catch (error) {
				console.log(error);
			}
		};

		getUserInformation();
	}, []);

	// 정보 수정 (연락처, 주소, 상세주소)
	const handleAddressUpdateBtn = async () => {
		try {
			const newAddress: userAddress = {
				phone,
				address,
				detailAddress,
			};

			const response = await axiosRequest.requestAxios(
				'patch',
				'/users',
				{
					newAddress,
				},
			);

			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	// 비밀번호 변경
	const handlePasswordUpdateBtn = async () => {
		try {
			const response = await axiosRequest.requestAxios('post', '/users', {
				newPassword,
			});

			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	// 회원 탈퇴
	const handleWithdrawalBtn = async () => {
		try {
			const response = await axiosRequest.requestAxios(
				'delete',
				'/users',
			);

			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section className={styles.myPageSection}>
			<div className={styles.myPageWrap}>
				<h2>마이페이지</h2>
				<div className={styles.block}>
					<div className={styles.textInput}>
						<p>이메일</p>
						<Input value="기존이메일" onChange={() => {}} />
					</div>

					<div className={styles.textInput}>
						<p>이름</p>
						<Input value="기존이름" onChange={() => {}} />
					</div>
				</div>
				<div className={styles.textInput}>
					<p>연락처</p>
					<Input
						placeholder="연락처"
						value={phone}
						onChange={e => setPhone(e.target.value)}
					/>
				</div>
				<div className={styles.textInput}>
					<p>주소</p>
					<Input
						placeholder="주소"
						value={address}
						onChange={e => setAddress(e.target.value)}
					/>
				</div>
				<div className={styles.textInput}>
					<p>상세주소</p>
					<Input
						placeholder="상세 주소"
						value={detailAddress}
						onChange={e => setDetailAddress(e.target.value)}
					/>
				</div>
				<BlackButton
					text="내 정보 변경"
					onClick={handleAddressUpdateBtn}
				></BlackButton>
				<h5>비밀번호 설정</h5>
				<div className={styles.textInput}>
					<p>새 비밀번호</p>
					<Input
						placeholder="새 비밀번호"
						value={newPassword}
						onChange={e => setNewPassword(e.target.value)}
					/>
				</div>
				<div className={styles.textInput}>
					<p>새 비밀번호 확인</p>
					<Input
						placeholder="새 비밀번호 확인"
						value={newPasswordConfirm}
						onChange={e => setNewPasswordConfirm(e.target.value)}
					/>
				</div>
				<p>
					* 비밀번호는 8자 이상으로 영문 소문자, 숫자, 특수 문자를
					모두 포함해야 합니다.
				</p>
				<BlackButton
					text="비밀번호 변경"
					onClick={handlePasswordUpdateBtn}
				></BlackButton>

				{/* 
				<h5>맞춤 정보</h5>
				<p>성별</p>
				<p>선호하는 태그</p>
				<BlackButton
					text="맞춤 정보 설정"
					onClick={() => {}}
				></BlackButton> */}

				<h5>회원 탈퇴</h5>
				<p>
					회원 탈퇴시 온라인 및 오프라인 회원 정보 및 구매 정보 등
					모든 정보가 삭제 됩니다.
				</p>
				<WhiteButton
					text="회원 탈퇴"
					onClick={handleWithdrawalBtn}
				></WhiteButton>
			</div>
		</section>
	);
}
