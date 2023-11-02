import React, { useEffect, useState } from 'react';
import styles from './Cart.module.scss';
import BlackButton from '../../components/Button/BlackButton';
import WhiteButton from '../../components/Button/WhiteButton';
import { useNavigate } from 'react-router-dom';
import { CartProduct } from '../../model/product';

export default function Cart() {
	const navigate = useNavigate();
	const [cart, setCart] = useState<CartProduct[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const handleContinueBtn = () => {
		navigate('/');
	};

	// 장바구니 불러오기
	useEffect(() => {
		const storedCart = localStorage.getItem('cart');
		if (storedCart) {
			const parsedCart = JSON.parse(storedCart);
			setCart(parsedCart);

			setIsLoading(false);
		}
	}, [isLoading]);
	console.log('cart:', cart);

	const removeFromCart = (cartProduct: CartProduct) => {
		const updatedCart = cart.filter(item => item !== cartProduct); // cart 배열에서 아이템 제거
		setCart(updatedCart); // cart 배열 업데이트

		// 업데이트된 장바구니 정보를 로컬 스토리지에 저장
		localStorage.setItem('cart', JSON.stringify(updatedCart));
	};

	return (
		<>
			<section className={styles.cartSection}>
				<div className={styles.cartWrap}>
					<h2>장바구니</h2>
					{isLoading && cart.length > 0 ? (
						<p>로딩 중...</p>
					) : !isLoading && cart.length > 0 ? (
						cart.map((cartProduct, index) => (
							<div className={styles.cartProduct} key={index}>
								<div className={styles.middle}>
									<img src={cartProduct.mainImage} />
									<div className={styles.textInfo}>
										<h5>{cartProduct.title}</h5>
										<p className={styles.concentration}>
											{cartProduct.concentration}
										</p>
										<p className={styles.size}>
											{cartProduct.selectedSize}ml
										</p>
										<p>{cartProduct.orderAmount}개</p>
										<button
											className={styles.deleteButton}
											onClick={() => {
												removeFromCart(cartProduct);
											}}
										>
											삭제
										</button>
									</div>
								</div>
								<div className={styles.bottom}>
									<h6 className={styles.price}>
										{cartProduct.totalPrice}원
									</h6>
								</div>
							</div>
						))
					) : (
						<p>장바구니에 상품이 없습니다.</p>
					)}
					<div className={styles.buttons}>
						<BlackButton text="주문하기" onClick={() => {}} />
						<WhiteButton
							text="계속 쇼핑하기"
							onClick={handleContinueBtn}
						/>
					</div>
				</div>
			</section>
		</>
	);
}
