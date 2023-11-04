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
import SelectBox from '../../components/SelectBox/SelectBox';
import { gender, hashTags } from '../../assets/datas/enum';

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

	// 초기값 기존 정보로 재설정 필요
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

				if (response.data.user.phone || response.data.user.address) {
					setNewUserInformation({
						phone: response.data.user.phone || '',
						city: response.data.user.address.city || '',
						detail: response.data.user.address.detail || '',
					});
				}
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
			if (response.status === 200) {
				alert('성공적으로 변경되었습니다.');
			}
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

	const handleUserFieldChange = (field: string, value: any) => {
		if (user) {
			setUser({ ...user, [field]: value });
		}
	};

	return user ? (
		<>
			<section className={styles.myPageSection}>
				<div className={styles.myPageWrap}>
					<h2>마이페이지</h2>
					<div className={styles.textInput}>
						<div className={styles.block}>
							<Input
								text="이메일"
								value={user.email}
								onChange={() => {}}
							/>

							<Input
								text="이름"
								value={user.name}
								onChange={() => {}}
							/>
						</div>
						<Input
							text="연락처"
							placeholder="연락처"
							value={newUserInformation.phone}
							onChange={e =>
								handleUserFieldChange('phone', e.target.value)
							}
						/>
						<Input
							text="주소"
							placeholder="주소"
							value={newUserInformation.city}
							onChange={e =>
								handleUserFieldChange('city', e.target.value)
							}
						/>
						<Input
							text="상세 주소"
							placeholder="상세 주소"
							value={newUserInformation.detail}
							onChange={e =>
								handleUserFieldChange('detail', e.target.value)
							}
						/>
						<BlackButton
							text="내 정보 변경"
							onClick={handleAddressUpdateBtn}
						></BlackButton>
					</div>
					<h5>비밀번호 변경</h5>
					<div className={styles.textInput}>
						<Input
							text="새 비밀번호"
							placeholder="새 비밀번호"
							value={newPassword.password}
							onChange={e =>
								setNewPassword({
									...newPassword,
									password: e.target.value,
								})
							}
						/>
						<Input
							text="새 비밀번호 확인"
							placeholder="새 비밀번호 확인"
							value={newPassword.passwordConfirm}
							onChange={e =>
								setNewPassword({
									...newPassword,
									passwordConfirm: e.target.value,
								})
							}
						/>
						<span>
							* 비밀번호는 8자 이상으로 영문 소문자, 숫자, 특수
							문자를 모두 포함해야 합니다.
						</span>
						<BlackButton
							text="비밀번호 변경"
							onClick={handlePasswordUpdateBtn}
						></BlackButton>
					</div>

					<h5>맞춤 정보</h5>
					<div className={styles.userPreference}>
						<p>맞춤 성별</p>
						<SelectBox
							options={gender}
							selectedValue={user.gender}
							onSelect={selectedValue =>
								handleUserFieldChange('gender', selectedValue)
							}
						/>
					</div>
					<div className={styles.userPreference}>
						<p>선호하는 태그</p>
						<SelectBox
							options={hashTags}
							selectedValue={user.preference}
							onSelect={selectedValue =>
								handleUserFieldChange(
									'preference',
									selectedValue,
								)
							}
						/>
					</div>
					<BlackButton
						text="맞춤 정보 설정"
						onClick={() => {}}
					></BlackButton>
					<h5>회원 탈퇴</h5>
					<span>
						회원 탈퇴시 온라인 및 오프라인 회원 정보 및 구매 정보 등
						모든 정보가 삭제 됩니다.
					</span>
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
