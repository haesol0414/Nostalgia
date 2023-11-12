import React, { useEffect, useState } from 'react';
import styles from './Order.module.scss';
import BlackButton from '../../components/Button/BlackButton';
import Input from '../../components/Input/Input';
import { Address, User } from '../../model/user';
import AddressSearch from '../../components/AddressSearch/AddressSearch';
import { NewOrder } from '../../model/order';
import OrderProductList from '../../components/OrderProductList/OrderProductList';
import { CartProduct } from '../../model/product';
import { createNewOrder, getUserDetails } from '../../utils/apiRequests';
import { formatPhoneNumber } from '../../utils/dataFormatter';
import { useLocation, useNavigate } from 'react-router-dom';
import SmallButton from '../../components/Button/SmallButton';
import Payment from '../../components/Payment/Payment';
import { useAuth } from '../../hooks/useAuth';
import CartPrice from '../../components/CartPrice/CartPrice';

interface OrderResponse {
	message: string;
	orderNumber: string;
}

interface UserDetailResponse {
	message: string;
	user: User;
}

// 기본 배송지로 설정 체크박스
export default function Order() {
	useAuth();

	const navigate = useNavigate();
	const [newOrder, setNewOrder] = useState<NewOrder>();
	const shippingFee = 3000;
	const location = useLocation();
	const selectedProductsToOrder: CartProduct[] =
		location.state?.selectedProducts || [];

	useEffect(() => {
		if (selectedProductsToOrder) {
			const totalProductPrice = selectedProductsToOrder.reduce(
				(acc, product) => {
					return acc + product.totalPrice;
				},
				0,
			);

			const totalPayment = totalProductPrice + shippingFee;

			setNewOrder({
				recipient: '',
				phone: '',
				shippingAddress: {
					city: '',
					detail: '',
					zipCode: '',
				},
				purchase: selectedProductsToOrder,
				shippingRequest: '',
				shippingFee: shippingFee,
				totalProductPrice,
				totalPayment,
			});
		}
	}, []);

	const handleAddressChange = (newAddress: Address) => {
		if (newOrder && newAddress) {
			const updatedOrder = {
				...newOrder,
				shippingAddress: {
					city: newAddress.city,
					detail: '',
					zipCode: newAddress.zipCode,
				},
			};
			setNewOrder(updatedOrder);
		}
	};

	// 내 정보 불러오기
	const onDefaultAddress = async () => {
		try {
			const response = await getUserDetails<UserDetailResponse>();

			if (response.data.user && newOrder) {
				setNewOrder({
					...newOrder,
					recipient: response.data.user.name,
					phone: response.data.user.phone,
					shippingAddress: {
						city: response.data.user.address.city,
						detail: response.data.user.address.detail,
						zipCode: response.data.user.address.zipCode,
					},
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleFieldChange = (field: string, value: any) => {
		if (newOrder) {
			if (field === 'shippingAddress') {
				setNewOrder({
					...newOrder,
					[field]: {
						...newOrder[field],
						detail: value,
					},
				});
			} else {
				setNewOrder({ ...newOrder, [field]: value });
			}
		}
	};

	// 주문하기 => i am port 등록 후 성공 시 api 호춡 ~> 나중에 주석처리 (결제 컴포넌트에서)
	const handlePayBtn = async () => {
		try {
			const response = await createNewOrder<OrderResponse>({ newOrder });

			if (response.status === 201) {
				alert('주문이 완료되었습니다.');
				// response.orderNumber로 주문 상세 내역 페이지로 이동, 로컬스토리지 비우기  ==>  이 부분 Payment에 적용하기
				localStorage.removeItem('cart');
				navigate(`/account/orders/${response.data.orderNumber}`);
			}
		} catch (error) {
			console.error('주문 실패 : ', error);
		}
	};

	return (
		<section className={styles.orderSection}>
			{newOrder && newOrder.purchase.length > 0 ? (
				<div className={styles.orderWrap}>
					<h2>주문하기</h2>
					<h5>상품 정보</h5>
					<OrderProductList orderProducts={newOrder.purchase} />
					<div className={styles.head}>
						<h5>주문 정보</h5>
						<SmallButton
							text="내 정보 불러오기"
							onClick={onDefaultAddress}
						/>
					</div>
					<Input
						text="수령인"
						value={newOrder.recipient}
						onChange={e =>
							handleFieldChange('recipient', e.target.value)
						}
					/>
					<Input
						text="연락처"
						value={formatPhoneNumber(newOrder.phone)}
						onChange={e =>
							handleFieldChange(
								'phone',
								e.target.value.replace(/\D/g, ''),
							)
						}
					/>
					<AddressSearch
						address={newOrder.shippingAddress}
						onAddressChange={handleAddressChange}
					/>
					<Input
						text="상세 주소"
						value={newOrder.shippingAddress.detail}
						onChange={e =>
							handleFieldChange('shippingAddress', e.target.value)
						}
					/>
					<Input
						text="배송 요청사항"
						value={newOrder.shippingRequest}
						onChange={e =>
							handleFieldChange('shippingRequest', e.target.value)
						}
					/>
					<h5 className={styles.paymentInfo}>결제 정보</h5>
					<CartPrice
						totalProductPrice={newOrder.totalProductPrice}
						shippingFee={newOrder.shippingFee}
					/>
					<div className={styles.buttons}>
						{/* <Payment newOrder={newOrder}></Payment> */}
						<BlackButton text="주문하기" onClick={handlePayBtn} />
					</div>
				</div>
			) : (
				<p>주문 정보를 표시할 수 없습니다.</p>
			)}
		</section>
	);
}
