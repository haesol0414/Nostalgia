import React, { useEffect, useState } from 'react';
import styles from './OrderHistory.module.scss';
import OrderList from '../../components/OrderList/OrderList';
import { getUserOrderHistory } from '../../utils/apiRequests';
import { formatDate, formatPhoneNumber } from '../../utils/dataFormatter';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

interface OrderHistory {
	_id: string;
	orderDate: Date;
}

interface OrderHistoryResponse {
	message: string;
	orderHistory: OrderHistory[];
}

export default function OrderHistory() {
	const [orderHistory, setOrderHistory] = useState<OrderHistory[]>();

	useEffect(() => {
		const getOrderHistory = async () => {
			try {
				const response =
					await getUserOrderHistory<OrderHistoryResponse>();

				if (response.data.orderHistory) {
					console.log('주문 내역 : ', response);

					setOrderHistory(response.data.orderHistory);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getOrderHistory();
	}, []);

	return (
		<section className={styles.userOrderSection}>
			<div className={styles.userOrderWrap}>
				<h2>주문 내역</h2>
				{orderHistory ? (
					<ul>
						{orderHistory.length > 0 ? (
							<>
								{' '}
								{orderHistory.map(history => (
									<OrderList
										key={history._id}
										orderDate={formatDate(
											history.orderDate,
										)}
										orderNumber={history._id}
									/>
								))}
							</>
						) : (
							<p>주문 내역이 없습니다.</p>
						)}
					</ul>
				) : (
					<LoadingSpinner />
				)}
			</div>
		</section>
	);
}
