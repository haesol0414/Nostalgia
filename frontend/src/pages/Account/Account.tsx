import React, { useEffect, useState } from 'react';
import styles from './Account.module.scss';
import MenuBar from '../../components/MenuBar/MenuBar';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

export default function Account() {
	useAuth();

	const [username, setUsername] = useState<string>('');
	useEffect(() => {
		const storedUser = sessionStorage.getItem('user');
		if (storedUser) {
			const userObject = JSON.parse(storedUser);
			setUsername(userObject.name);
		}
	}, []);

	return (
		<section className={styles.accountSection}>
			{username ? (
				<>
					<div className={styles.mainBanner}>
						<p>나의 계정 </p>
						<p>반갑습니다, {username}님</p>
					</div>
					<div className={styles.menu}>
						<div>
							<h6>주문</h6>
							<ul>
								<MenuBar
									title="주문 내역"
									linkTo="/account/orders"
								></MenuBar>
							</ul>
						</div>
						<div>
							<h6>나의 정보</h6>
							<ul>
								<MenuBar
									title="나의 정보"
									linkTo="/account/personal-details"
								></MenuBar>
							</ul>
						</div>
					</div>
				</>
			) : (
				<LoadingSpinner />
			)}
		</section>
	);
}
