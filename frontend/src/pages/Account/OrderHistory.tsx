import React from 'react';
import styles from './OrderHistory.module.scss';
import OrderList from '../../components/OrderList/OrderList';

interface OrderList {
	orderDate: string;
	orderNumber: string;
	detailLink: string;
}

export default function OrderHistory() {
	return (
		<section className={styles.userOrderSection}>
			<div className={styles.userOrderWrap}>
				<h2>주문 내역</h2>
				<ul>
					<OrderList
						orderDate="20210808"
						orderNumber="1234567"
						detailLink="/"
					></OrderList>
					<OrderList
						orderDate="20210808"
						orderNumber="1234567"
						detailLink="/"
					></OrderList>
				</ul>
			</div>
		</section>
	);
}
