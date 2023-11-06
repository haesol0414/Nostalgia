import React, { useEffect, useState } from 'react';
import styles from './Order.module.scss';
import BlackButton from '../../components/Button/BlackButton';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import { getUserDetails } from '../../utils/apiRequests';
import { Address, User } from '../../model/user';
import { isTokenAvailable } from '../../utils/authUtils';
import AddressSearch from '../../components/AddressSearch/AddressSearch';
import { NewOrder } from '../../model/order';
import { CartProduct } from '../../model/product';
import OrderProductList from '../../components/OrderProductList/OrderProductList';

// interface OrderResponse {
// 	message: string;
// 	orderNumber: string;
// }

export default function Order() {
	// const navigate = useNavigate();
	const [newOrder, setNewOrder] = useState<NewOrder>();
	const [address, setAddress] = useState<Address>({
		city: '',
		detail: '',
		zipCode: '',
	});

	// 장바구니 상품 불러오기
	useEffect(() => {
		const storedCart = localStorage.getItem('cart');
		if (storedCart) {
			const parsedCart = JSON.parse(storedCart);

			setNewOrder({
				recipient: '',
				phone: '',
				shippingAddress: address,
				purchase: parsedCart,
				shippingRequest: '',
				shippingFee: 3000,
				totalPayment: 0,
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
						<h6>총 상품 금액 :{'이 부분 수정 필요'}원</h6>
						<h6>
							총 결제 금액 :{'여기도 설정 필요'}
							{newOrder.totalPayment.toLocaleString()}원
						</h6>
					</div>
					<div className={styles.buttons}>
						<BlackButton text="결제하기" onClick={() => {}} />
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
