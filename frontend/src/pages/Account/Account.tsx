import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Account.module.scss';
import AccountList from '../../components/AccountList/AccountList';
import { isTokenAvailable } from '../../utils/authUtils';

export default function Account() {
	const navigate = useNavigate();
	const isLoggedIn = isTokenAvailable();

	useEffect(() => {
		if (!isLoggedIn) {
			alert('로그인이 필요한 페이지입니다.');
			navigate('/login');
		}
	}, [isLoggedIn]);

	return (
		<>
			{isLoggedIn ? (
				<section className={styles.accountSection}>
					<div className={styles.mainBanner}>
						<p>나의 계정</p>
					</div>
					<div>
						<h6>주문</h6>
						<ul>
							<AccountList
								title="주문 내역"
								linkTo="/account/orders"
							></AccountList>
						</ul>
					</div>

					<div className={styles.list}>
						<h6>나의 정보</h6>
						<ul>
							<AccountList
								title="나의 정보"
								linkTo="/account/personal-details"
							></AccountList>
							<AccountList
								title="위시 리스트"
								linkTo="#"
							></AccountList>
						</ul>
					</div>
				</section>
			) : null}
		</>
	);
}
