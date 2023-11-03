import React from 'react';
import styles from './OrderList.module.scss';

interface OrderListProps {
	orderDate: string;
	orderNumber: string;
	detailLink: string;
}

export default function OrderList({
	orderDate,
	orderNumber,
	detailLink,
}: OrderListProps) {
	return (
		<>
			<li className={styles.orderList}>
				<h6>{orderDate}</h6>
				<div className={styles.orderNumber}>
					<span>주문 번호</span>
					<p>{orderNumber}</p>
				</div>
				<a href={detailLink}>상세 보기 +</a>
			</li>
		</>
	);
}
