import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ProductDetails.module.scss';
import BlackButton from '../../components/Button/BlackButton';
import SizeDropdown from '../../components/SizeDropdown/SizeDropdown';
import { CartProduct, Product } from '../../model/product';
import { getProductsDetails } from '../../utils/apiRequests';
import QuantitySelector from '../../components/QuantitySelector/QuantitySelector';
import HashTag from '../../components/HashTag/HashTag';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Refund from '../../assets/refund.png';

interface ProductDetailResponse {
	message: string;
	productInfo: Product;
}

export default function ProductDetails() {
	const navigate = useNavigate();
	const params = useParams();
	const productId = params.productId;
	const [product, setProduct] = useState<Product>();
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const [selectedSize, setSelectedSize] = useState<number>(0);
	const [cart, setCart] = useState<CartProduct[]>([]);
	const sizes: number[] = [];
	const prices: number[] = [];
	const [orderAmount, setOrderAmount] = useState<number>(1);

	// 상품 상세 불러오기
	useEffect(() => {
		const storedCart = localStorage.getItem('cart');
		if (storedCart) {
			setCart(JSON.parse(storedCart));
		}

		const getProductInformation = async () => {
			if (productId) {
				try {
					const response =
						await getProductsDetails<ProductDetailResponse>(
							productId,
						);

					console.log('상품 상세 정보 : ', response);

					if (response.data) {
						setProduct(response.data.productInfo);
						setTotalPrice(
							response.data.productInfo.priceBySize[0].price,
						);
						setSelectedSize(
							response.data.productInfo.priceBySize[0].size,
						);
					}
				} catch (error) {
					console.log(error);
				}
			}
		};
		getProductInformation();
	}, [productId]);

	// 초기 사이즈 및 수량 설정
	if (product) {
		product.priceBySize.forEach(item => {
			sizes.push(item.size);
			prices.push(item.price);
		});
	}

	const handlePriceChange = (selectedSize: number, totalPrice: number) => {
		setTotalPrice(totalPrice);
		setSelectedSize(selectedSize);
		setOrderAmount(1);
	};

	// 수량 조절
	const handleAmountIncrease = () => {
		setOrderAmount(orderAmount + 1);
		updatetotalPrice(orderAmount + 1);
	};

	const handleAmountDecrease = () => {
		if (orderAmount > 1) {
			setOrderAmount(orderAmount - 1);
			updatetotalPrice(orderAmount - 1);
		}
	};

	// 최종 가격 업데이트
	const updatetotalPrice = (orderAmount: number) => {
		if (product) {
			const selectedSizePrice = product.priceBySize.find(
				item => item.size === selectedSize,
			);

			if (selectedSizePrice) {
				setTotalPrice(selectedSizePrice.price * orderAmount);
			}
		}
	};

	// 장바구니 담기
	// 장바구니 담기
	const addToCart = () => {
		if (product) {
			const selectedSizeIndex: number = product.priceBySize.findIndex(
				item => item.size === selectedSize,
			);

			const existingCartItemIndex: number = cart.findIndex(
				item =>
					item._id === product._id &&
					item.selectedSize === selectedSize,
			);

			if (existingCartItemIndex !== -1) {
				// 이미 장바구니에 있는 상품이면 수량 증가
				const updatedCart = [...cart];
				updatedCart[existingCartItemIndex].orderAmount += orderAmount;
				updatedCart[existingCartItemIndex].totalPrice +=
					totalPrice * orderAmount;
				localStorage.setItem('cart', JSON.stringify(updatedCart));
			} else {
				// 장바구니에 없는 상품이면 추가
				const newCartProduct: CartProduct = {
					_id: product._id,
					title: product.title,
					brand: product.brand,
					selectedSize: selectedSize,
					cost: product.priceBySize[selectedSizeIndex].price,
					concentration: product.concentration,
					mainImage: product.mainImage[0],
					orderAmount: orderAmount,
					totalPrice: totalPrice,
				};

				const updatedCart = [...cart, newCartProduct];
				localStorage.setItem('cart', JSON.stringify(updatedCart));
			}

			alert(`${product.title} 상품이 장바구니에 추가 되었습니다.`);
			navigate('/cart');
		}
	};

	return (
		<section className={styles.detailSection}>
			{product ? (
				<>
					<div className={styles.main}>
						<div className={styles.imageWrap}>
							<img
								src={product.mainImage[0]}
								alt={product.title}
							/>
						</div>

						<div className={styles.productInfo}>
							<h5 className={styles.title}>{product.title} </h5>
							<p className={styles.concentration}>
								{product.concentration}
							</p>
							<p>{product.description}</p>
							<div className={styles.tagAndPrice}>
								<HashTag tagName={product.hashTag} />
								<h6>
									{totalPrice !== null
										? `${totalPrice.toLocaleString()}원`
										: `${product.priceBySize[0].price.toLocaleString()}원`}
								</h6>
							</div>

							<p>
								선택 가능한 사이즈: {product.priceBySize.length}
							</p>
							<SizeDropdown
								sizes={sizes}
								prices={prices}
								onChange={handlePriceChange}
							/>

							<div className={styles.quantitySelector}>
								<QuantitySelector
									quantity={orderAmount}
									onIncrease={handleAmountIncrease}
									onDecrease={handleAmountDecrease}
								></QuantitySelector>
							</div>
							{product.currentAmount > 0 ? (
								<BlackButton
									text="장바구니에 추가하기"
									onClick={addToCart}
								></BlackButton>
							) : (
								<div className={styles.soldOut}>
									<BlackButton text="SOLD OUT"></BlackButton>
								</div>
							)}
						</div>
					</div>
				</>
			) : (
				<LoadingSpinner />
			)}
		</section>
	);
}
