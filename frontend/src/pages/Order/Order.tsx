import React, { useEffect, useState } from 'react';
import styles from './Order.module.scss';
import BlackButton from '../../components/Button/BlackButton';
import { testProduct } from '../../assets/datas/datas';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import { getUserDetails } from '../../utils/apiRequests';
import { User } from '../../model/user';
import WhiteButton from '../../components/Button/WhiteButton';

interface UserDetailResponse {
	message: string;
	user: User;
}

export default function Order() {
	// const navigate = useNavigate();
	const [user, setUser] = useState<User>();

	// 정보 불러오기
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

	return user ? (
		<>
			<section className={styles.orderSection}>
				<div className={styles.orderWrap}>
					<h2>주문</h2>
					<div className={styles.textInput}>
						<p>이름</p>
						<Input value={user.name} onChange={() => {}} />
					</div>

					<div className={styles.textInput}>
						<p>연락처</p>
						<Input value={user.phone} onChange={() => {}} />
					</div>

					<div className={styles.address}>
						<div className={styles.textInput}>
							<p>주소</p>
							<Input
								value={user.address.city}
								onChange={() => {}}
							/>
						</div>
						<WhiteButton
							text="주소 검색"
							onClick={() => {}}
						></WhiteButton>
					</div>
					<div className={styles.textInput}>
						<p>상세 주소</p>
						<Input
							value={user.address.detail}
							onChange={() => {}}
						/>
					</div>
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
