import React, { useState, useEffect } from 'react';
import Input from '../../components/Input/Input';
import styles from './UserDetails.module.scss';
import BlackButton from '../../components/Button/BlackButton';
import WhiteButton from '../../components/Button/WhiteButton';
import {
	MessageResponse,
	changePassword,
	getUserDetails,
	patchUserAddress,
	withdrawal,
} from '../../utils/apiRequests';
import { User, AddressWithPhone } from '../../model/user';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

interface UserDetailResponse {
	message: string;
	user: User;
}

interface NewPassword {
	password: string;
	passwordConfirm: string;
}

export default function UserDetails() {
	const navigate = useNavigate();
	const [, , removeCookie] = useCookies(['token']);
	const [user, setUser] = useState<User>();
	const [newPassword, setNewPassword] = useState<NewPassword>({
		password: '',
		passwordConfirm: '',
	});
	const [newUserInformation, setNewUserInformation] =
		useState<AddressWithPhone>({
			phone: '',
			city: '',
			detail: '',
		});

	// 정보 불러오기
	useEffect(() => {
		const getUserInformation = async () => {
			try {
				const response = await getUserDetails<UserDetailResponse>();

				console.log('회원 정보 : ', response);
				setUser(response.data.user);
			} catch (error) {
				console.log(error);
			}
		};

		getUserInformation();
	}, []);

	// 정보 수정 (연락처, 주소, 상세주소)
	const handleAddressUpdateBtn = async () => {
		try {
			const response = await patchUserAddress<MessageResponse>({
				newUserInformation,
			});

			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	// 비밀번호 변경
	const handlePasswordUpdateBtn = async () => {
		try {
			const response = await changePassword<MessageResponse>({
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
			if (confirm('정말 탈퇴하시겠습니까?')) {
				const response = await withdrawal<MessageResponse>();

				console.log(response);
				if (response.status === 200) {
					alert('탈퇴하셨습니다.');

					removeCookie('token');
					navigate('/');
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	return user ? (
		<>
			<section className={styles.myPageSection}>
				<div className={styles.myPageWrap}>
					<h2>마이페이지</h2>
					<div className={styles.block}>
						<div className={styles.textInput}>
							<p>이메일</p>
							<Input value={user.email} onChange={() => {}} />
						</div>

						<div className={styles.textInput}>
							<p>이름</p>
							<Input value={user.name} onChange={() => {}} />
						</div>
					</div>
					<div className={styles.textInput}>
						<p>연락처</p>
						<Input
							placeholder={user.phone ? user.phone : '연락처'}
							value={newUserInformation.phone}
							onChange={e =>
								setNewUserInformation({
									...newUserInformation,
									phone: e.target.value,
								})
							}
						/>
					</div>
					<div className={styles.textInput}>
						<p>주소</p>
						<Input
							placeholder={
								user.address.city ? user.address.city : '주소'
							}
							value={newUserInformation.city}
							onChange={e =>
								setNewUserInformation({
									...newUserInformation,
									city: e.target.value,
								})
							}
						/>
					</div>
					<div className={styles.textInput}>
						<p>상세주소</p>
						<Input
							placeholder={
								user.address.detail
									? user.address.detail
									: '상세 주소'
							}
							value={newUserInformation.detail}
							onChange={e =>
								setNewUserInformation({
									...newUserInformation,
									detail: e.target.value,
								})
							}
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
							value={newPassword.password}
							onChange={e =>
								setNewPassword({
									...newPassword,
									password: e.target.value,
								})
							}
						/>
					</div>
					<div className={styles.textInput}>
						<p>새 비밀번호 확인</p>
						<Input
							placeholder="새 비밀번호 확인"
							value={newPassword.passwordConfirm}
							onChange={e =>
								setNewPassword({
									...newPassword,
									passwordConfirm: e.target.value,
								})
							}
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
		</>
	) : (
		<></>
	);
}
