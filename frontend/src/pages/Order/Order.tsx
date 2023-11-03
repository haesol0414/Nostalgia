import React, { useEffect, useState } from 'react';
import styles from './Order.module.scss';
import BlackButton from '../../components/Button/BlackButton';
import { testProduct } from '../../assets/datas/datas';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import { getUserDetails } from '../../utils/apiRequests';
import { User } from '../../model/user';
import WhiteButton from '../../components/Button/WhiteButton';
import { isTokenAvailable } from '../../utils/authUtils';

interface UserDetailResponse {
	message: string;
	user: User;
}

export default function Order() {
	const navigate = useNavigate();
	const [user, setUser] = useState<User>();
	// const [user, setUser] = useState<User>(); -> 배송 요청사항

	// 유저 정보 불러오기
	useEffect(() => {
		const getUserInformation = async () => {
			try {
				const response = await getUserDetails<UserDetailResponse>();

				console.log('회원 정보 : ', response);
				if (response.data) {
					setUser(response.data.user);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getUserInformation();
	}, []);

	// 장바구니 상품 불러오기

	return user ? (
		<>
			<section className={styles.orderSection}>
				<div className={styles.orderWrap}>
					<h2>주문하기</h2>

					<div className={styles.orderProducts}></div>

					<Input text="이름" value={user.name} onChange={() => {}} />
					<Input
						text="연락처"
						value={user.phone}
						onChange={() => {}}
					/>

					<div className={styles.address}>
						<Input
							text="주소"
							value={user.address.city}
							onChange={() => {}}
						/>
						<WhiteButton
							text="주소 검색"
							onClick={() => {}}
						></WhiteButton>
					</div>
					<Input
						text="우편번호"
						value={user.address.zipCode?.toString()}
						onChange={() => {}}
					/>
					<Input
						text="상세 주소"
						value={user.address.detail}
						onChange={() => {}}
					/>
					<Input
						text="배송 요청사항"
						value={user.address.detail}
						onChange={() => {}}
					/>
					<div className={styles.buttons}>
						<BlackButton text="결제하기" onClick={() => {}} />
					</div>
				</div>
			</section>
		</>
	) : (
		<></>
	);
}
