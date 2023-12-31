import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './OrderDetails.module.scss';
import { Order } from '../../model/order';
import { getUserOrderDetails } from '../../api/apiRequests';
import { formatDate } from '../../utils/dataFormatter';
import OrderProductList from '../../components/OrderProductList/OrderProductList';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

interface OrderDetailsResponse {
	message: string;
	orderDetails: Order;
}

export default function OrderDetails() {
	const params = useParams();
	const orderNumber = params.orderNumber;
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

						<h5 className={styles.title}>상품 정보</h5>
						<OrderProductList
							orderProducts={orderDetails.purchase}
						/>

						<h5 className={styles.title}>배송지 정보</h5>
						<div className={styles.table}>
							<table>
								<tbody>
									<tr>
										<td>수령인</td>
										<td>{orderDetails?.recipient}</td>
									</tr>
									<tr>
										<td>우편번호</td>
										<td>
											{
												orderDetails?.shippingAddress
													.zipCode
											}
										</td>
									</tr>
									<tr>
										<td>주소</td>
										<td>
											{orderDetails?.shippingAddress.city}
										</td>
									</tr>
									<tr>
										<td>상세 주소</td>
										<td>
											{
												orderDetails?.shippingAddress
													.detail
											}
										</td>
									</tr>
									<tr>
										<td>배송 요청사항</td>
										<td>{orderDetails?.shippingRequest}</td>
									</tr>
									<tr>
										<td>배송 상태</td>
										<td>{orderDetails?.orderStatus}</td>
									</tr>
								</tbody>
							</table>
						</div>

						<h5 className={styles.title}>결제 정보</h5>
						<div className={styles.table}>
							<table>
								<tbody>
									<tr>
										<td>배송비</td>
										<td>
											{orderDetails.shippingFee.toLocaleString()}
											원
										</td>
									</tr>
									<tr>
										<td>총 상품 금액</td>
										<td>
											{orderDetails.totalProductPrice.toLocaleString()}
											원
										</td>
									</tr>
									<tr>
										<td>총 결제 금액</td>
										<td>
											{orderDetails.totalPayment.toLocaleString()}
											원
										</td>
									</tr>
									<tr>
										<td>결제 수단</td>
										<td>{orderDetails.payMethod}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</>
				) : (
					<div className={styles.loading}>
						<LoadingSpinner />
					</div>
				)}
				<div className={styles.orderHistoryLink}>
					<a href="/account/orders">{'< 주문 전체'}</a>
				</div>
			</div>
		</section>
	);
}
