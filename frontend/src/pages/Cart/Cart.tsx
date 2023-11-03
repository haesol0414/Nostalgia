import React, { useEffect, useState } from 'react';
import styles from './Cart.module.scss';
import BlackButton from '../../components/Button/BlackButton';
import WhiteButton from '../../components/Button/WhiteButton';
import { useNavigate } from 'react-router-dom';
import { CartProduct } from '../../model/product';
import QuantitySelector from '../../components/QuantitySelector/QuantitySelector';
import CheckBox from '../../components/CheckBox/CheckBox';

export default function Cart() {
	const navigate = useNavigate();
	const [cart, setCart] = useState<CartProduct[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedProducts, setSelectedProducts] = useState<CartProduct[]>([]);

	const handleShopContinueBtn = () => {
		navigate('/');
	};

	// 장바구니 불러오기
	useEffect(() => {
		const storedCart = localStorage.getItem('cart');
		if (storedCart) {
			const parsedCart = JSON.parse(storedCart);

			setCart(parsedCart);
			setSelectedProducts(parsedCart);
			setIsLoading(false);
		}
	}, [isLoading]);

	// 장바구니 상품 제거
	const removeFromCart = (cartProduct: CartProduct) => {
		const updatedCart = cart.filter(item => item !== cartProduct);
		setCart(updatedCart);

		localStorage.setItem('cart', JSON.stringify(updatedCart));
	};

	// 장바구니 상품 수량 조절
	const handleIncrease = (index: number) => {
		const updatedCart = [...cart];

		updatedCart[index].orderAmount += 1;
		updatedCart[index].totalPrice =
			updatedCart[index].orderAmount * updatedCart[index].cost;

		setCart(updatedCart);

		localStorage.setItem('cart', JSON.stringify(updatedCart));
	};

	// 체크박스
	const handleToggleCheckbox = (
		selectedProduct: CartProduct,
		isChecked: boolean,
	) => {
		console.log(selectedProducts);
		if (isChecked) {
			setSelectedProducts(prevSelectedProducts => [
				...prevSelectedProducts,
				selectedProduct,
			]);
		} else {
			setSelectedProducts(prevSelectedProducts =>
				prevSelectedProducts.filter(
					prev => prev._id !== selectedProduct._id,
				),
			);
		}
	};

	const handleDecrease = (index: number) => {
		const updatedCart = [...cart];

		if (updatedCart[index].orderAmount > 1) {
			updatedCart[index].orderAmount -= 1;
			updatedCart[index].totalPrice =
				updatedCart[index].orderAmount * updatedCart[index].cost;

			setCart(updatedCart);

			localStorage.setItem('cart', JSON.stringify(updatedCart));
		}
	};

	// 주문하기 버튼
	const handleOrderBtn = () => {
		// navigate('/orders');
		console.log(selectedProducts);
		// 가격 총 합 계산
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
								<div className={styles.left}>
									<CheckBox
										key={cartProduct._id}
										product={cartProduct}
										isChecked={selectedProducts.some(
											p => p._id === cartProduct._id,
										)}
										onToggle={handleToggleCheckbox}
									/>
									<img src={cartProduct.mainImage} />
								</div>
								<div className={styles.textInfo}>
									<div className={styles.middle}>
										<div className={styles.textInfo}>
											<h5>{cartProduct.title}</h5>
											<p className={styles.concentration}>
												{cartProduct.concentration}
											</p>
											<p className={styles.size}>
												{cartProduct.selectedSize}ml
											</p>
											<div
												className={
													styles.quantitySelector
												}
											>
												<QuantitySelector
													quantity={
														cartProduct.orderAmount
													}
													onIncrease={() =>
														handleIncrease(index)
													}
													onDecrease={() =>
														handleDecrease(index)
													}
												></QuantitySelector>
											</div>
										</div>
									</div>
									<div className={styles.bottom}>
										<button
											className={styles.deleteButton}
											onClick={() => {
												removeFromCart(cartProduct);
											}}
										>
											삭제
										</button>
										<h6 className={styles.price}>
											{cartProduct.totalPrice.toLocaleString()}
											원
										</h6>
									</div>
								</div>
							</div>
						))
					) : (
						<p>장바구니에 상품이 없습니다.</p>
					)}
					<div className={styles.totalOrderPrice}>
						<h5>Total : </h5>
						<h5>배송비 : </h5>
					</div>
					<div className={styles.buttons}>
						<BlackButton text="주문하기" onClick={handleOrderBtn} />
						<WhiteButton
							text="계속 쇼핑하기"
							onClick={handleShopContinueBtn}
						/>
					</div>
				</div>
			</section>
		</>
	);
}
