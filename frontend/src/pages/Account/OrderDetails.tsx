import React, { useEffect, useState } from 'react';
import styles from './OrderDetails.module.scss';
import { useParams } from 'react-router-dom';
import { Order } from '../../model/order';
import { getUserOrderDetails } from '../../utils/apiRequests';
import { formatDate } from '../../utils/dataFormatter';
import OrderProductList from '../../components/OrderProductList/OrderProductList';

interface OrderDetailsResponse {
	message: string;
	orderDetails: Order;
}

export default function OrderDetails() {
	const params = useParams();
	const orderNumber = params.orderNumber;
	// const orderNumber = '6549ea9cb65a1df6368299c7';
	const [orderDetails, setOrderDetails] = useState<Order>();

	// 정보 불러오기
	useEffect(() => {
		const getOrderDetails = async () => {
			try {
				if (orderNumber) {
					const response =
						await getUserOrderDetails<OrderDetailsResponse>(
							orderNumber,
						);

					console.log('주문 상세 : ', response);

					if (response.data.orderDetails) {
						setOrderDetails(response.data.orderDetails);
					}
				}
			} catch (error) {
				console.log(error);
			}
		};
		getOrderDetails();
	}, []);

	let formattedDate;
	if (orderDetails?.orderDate) {
		formattedDate = formatDate(orderDetails.orderDate);
	}

	return (
		<section className={styles.orderDetailSection}>
			<div className={styles.orderDetailrWrap}>
				<h2>주문 상세 내역</h2>
				{orderNumber && orderDetails && formattedDate ? (
					<>
						<div className={styles.mainInfo}>
							<p>주문 번호는 {orderNumber} 입니다.</p>
							<p>{formattedDate}에 주문이 완료 되었습니다.</p>
						</div>

						<div className={styles.addressInfo}>
							<h5>배송 주소</h5>
							<p>수령인 : {orderDetails?.recipient}</p>
							<p>
								우편번호 :{' '}
								{orderDetails?.shippingAddress.zipCode}
							</p>
							<p>주소 : {orderDetails?.shippingAddress.city}</p>
							<p>
								상세 주소 :{' '}
								{orderDetails?.shippingAddress.detail}
							</p>
						</div>

						<h5>상품 정보</h5>
						<OrderProductList
							orderProducts={orderDetails.purchase}
						/>
						<div className={styles.payment}>
							<h6>
								배송비 :{' '}
								{orderDetails.shippingFee.toLocaleString()}원
							</h6>
							<h6>
								총 상품 금액 :{' '}
								{orderDetails.totalProductPrice.toLocaleString()}
								원
							</h6>
							<h6>
								총 결제 금액 :{' '}
								{orderDetails.totalPayment.toLocaleString()}원
							</h6>
						</div>
					</>
				) : (
					<p>주문 내역을 조회할 수 없습니다.</p>
				)}
			</div>
		</section>
	);
}
