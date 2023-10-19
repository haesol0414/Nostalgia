import React from 'react';
import styles from './Account.module.scss';
import AccountList from '../../components/AccountList/AccountList';

export default function Account() {
	return (
		<section className={styles.AccountSection}>
			<div className={styles.mainBanner}>
				<p>나의 계정</p>
			</div>
			<div>
				<h6>주문</h6>
				<ul>
					<AccountList title="주문 내역" linkTo="#"></AccountList>
				</ul>
			</div>

			<div className={styles.list}>
				<h6>나의 정보</h6>
				<ul>
					<AccountList
						title="나의 정보"
						linkTo="/account/personal-details"
					></AccountList>
					<AccountList title="위시 리스트" linkTo="#"></AccountList>
				</ul>
			</div>
		</section>
	);
}
