import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Payment.module.scss';
import { RequestPayParams, RequestPayResponse } from 'iamport-typings';
import { NewOrder } from '../../model/order';
import { createNewOrder } from '../../api/apiRequests';

interface PaymentProps {
	newOrder: NewOrder;
}

interface OrderResponse {
	message: string;
	orderNumber: string;
}

export default function Payment({ newOrder }: PaymentProps) {
	const navigate = useNavigate();

	const onClickPayment = () => {
		const { IMP } = window;

		if (IMP) {
			IMP.init('imp75724522');

			const name = `${newOrder.purchase[0].title}${
				newOrder.purchase.length === 1
					? ''
					: ` 외 ${newOrder.purchase.length - 1}건`
			}`;

			const data: RequestPayParams = {
				pg: `nice`,
				pay_method: 'card',
				merchant_uid: `mid_${new Date().getTime()}`,
				amount: newOrder.totalPayment,
				name: name,
				buyer_name: newOrder.recipient,
				buyer_tel: newOrder.phone,
				buyer_addr: `${newOrder.shippingAddress.city} ${newOrder.shippingAddress.detail}`,
				buyer_postcode: newOrder.shippingAddress.zipCode,
			};

			const callback = async (response: RequestPayResponse) => {
				const { success, error_msg } = response;
				if (success) {
					const response = await createNewOrder<OrderResponse>({
						newOrder,
					});

					if (response.status === 201) {
						alert('주문이 완료되었습니다.');

						localStorage.removeItem('cart');
						navigate(
							`/account/orders/${response.data.orderNumber}`,
						);
					}
				} else {
					alert(`결제 실패: ${error_msg}`);
				}
			};

			IMP.request_pay(data, callback);
		}
	};

	return (
		<>
			<button className={styles.blackButton} onClick={onClickPayment}>
				결제하기
			</button>
		</>
	);
}
