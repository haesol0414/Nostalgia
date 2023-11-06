import React, { useEffect, useState } from 'react';
import styles from './Order.module.scss';
import BlackButton from '../../components/Button/BlackButton';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import { Address, User } from '../../model/user';
import AddressSearch from '../../components/AddressSearch/AddressSearch';
import { NewOrder } from '../../model/order';
import OrderProductList from '../../components/OrderProductList/OrderProductList';
import { CartProduct } from '../../model/product';
import { createNewOrder } from '../../utils/apiRequests';

interface OrderResponse {
	message: string;
	orderNumber: string;
}

export default function Order() {
	// const navigate = useNavigate();
	const [newOrder, setNewOrder] = useState<NewOrder>();
	const [address, setAddress] = useState<Address>({
		city: '',
		detail: '',
		zipCode: '',
	});
	const shippingFee = 3000;

	// 장바구니 상품 불러오기
	useEffect(() => {
		const storedCart = localStorage.getItem('cart');
		if (storedCart) {
			const parsedCart: CartProduct[] = JSON.parse(storedCart);

			const totalProductPrice = parsedCart.reduce((acc, product) => {
				return acc + product.totalPrice;
			}, 0);

			const totalPayment = totalProductPrice + shippingFee;

			setNewOrder({
				recipient: '',
				phone: '',
				shippingAddress: address,
				purchase: parsedCart,
				shippingRequest: '',
				shippingFee: shippingFee,
				totalProductPrice,
				totalPayment,
			});
		}
	}, []);

	const handlePostCode = (data: any) => {
		if (data) {
			setAddress({
				city: data.address,
				detail: '',
				zipCode: data.zonecode,
			});
		}
	};

	// 주문하기
	const handlePayBtn = async () => {
		try {
			const response = await createNewOrder<OrderResponse>({ newOrder });

			if (response.status === 201) {
				alert('주문이 완료되었습니다.');
				// 주문 상세 내역 페이지로 이동
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
					<OrderProductList orderProducts={newOrder.purchase} />
					<Input
						text="수령인"
						value={newOrder.recipient}
						onChange={() => {}}
					/>
					<Input
						text="연락처"
						value={newOrder.phone}
						onChange={() => {}}
					/>
					<AddressSearch
						address={address}
						onComplete={handlePostCode}
					/>
					<Input
						text="상세 주소"
						value={address.detail}
						onChange={e =>
							setAddress({
								...address,
								detail: e.target.value,
							})
						}
					/>
					<Input
						text="배송 요청사항"
						value={newOrder.shippingRequest}
						onChange={() => {}}
					/>
					<div className={styles.payment}>
						<h6>
							배송비 : {newOrder.shippingFee.toLocaleString()}원
						</h6>
						<h6>
							총 상품 금액 :
							{newOrder.totalProductPrice.toLocaleString()}원
						</h6>
						<h6>
							총 결제 금액 :
							{newOrder.totalPayment.toLocaleString()}원
						</h6>
					</div>
					<div className={styles.buttons}>
						<BlackButton text="결제하기" onClick={handlePayBtn} />
					</div>
				</div>
			) : (
				<p>주문 정보를 표시할 수 없습니다.</p>
			)}
		</section>
	);
}

// {/*
// 					<BlackButton
// 						text="내 정보 불러오기"
// 						onClick={onDefaultAddress}
// 					/> */}

// const onDefaultAddress = () => {
// 	if (user?.address) {
// 		setAddress({
// 			city: user.address.city,
// 			zipCode: user.address.zipCode,
// 		});
// 	}
// };

// const [user, setUser] = useState<User>();
// 내 정보 불러오기
// useEffect(() => {
// 	const getUserInformation = async () => {
// 		try {
// 			const response = await getUserDetails<UserDetailResponse>();

// 			console.log('회원 정보 : ', response);
// 			if (response.data) {
// 				setUser(response.data.user);
// 				setAddress(response.data.user.address);
// 			}
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};
// 	getUserInformation();
// }, []);
