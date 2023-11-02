import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ProductDetails.module.scss';
import BlackButton from '../../components/Button/BlackButton';
import SizeDropdown from '../../components/SizeDropdown/SizeDropdown';
import { CartProduct, Product } from '../../model/product';
import { getProductsDetails } from '../../utils/apiRequests';

interface ProductDetailResponse {
	message: string;
	productInfo: Product;
}

export default function ProductDetails() {
	const navigate = useNavigate();
	const params = useParams();
	const productId = params.productId;
	const [product, setProduct] = useState<Product>();
	const [selectedPrice, setSelectedPrice] = useState<number>(0);
	const [selectedSize, setSelectedSize] = useState<number>(0);
	const [cart, setCart] = useState<CartProduct[]>([]);
	const sizes: number[] = [];
	const prices: number[] = [];

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
						setSelectedPrice(
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

	if (product) {
		product.priceBySize.forEach(item => {
			sizes.push(item.size);
			prices.push(item.price);
			console.log(sizes);
		});
	}

	const handlePriceChange = (selectedSize: number, newPrice: number) => {
		setSelectedPrice(newPrice);
		setSelectedSize(selectedSize);
	};

	const addToCart = () => {
		if (product) {
			// orderAmount 조정하는 부분 필요
			const newCartProduct: CartProduct = {
				_id: product._id,
				title: product.title,
				brand: product.brand,
				selectedSize: selectedSize,
				selectedPrice: selectedPrice,
				concentration: product.concentration,
				mainImage: product.mainImage[0],
				orderAmount: 1,
				totalPrice: selectedPrice,
			};

			const updatedCart = [...cart, newCartProduct];
			localStorage.setItem('cart', JSON.stringify(updatedCart));

			alert(`${product.title} 상품이 장바구니에 추가 되었습니다.`);

			navigate('/cart');
		}
	};

	return (
		<section className={styles.detailSection}>
			{product ? (
				<div className={styles.main}>
					<div className={styles.imageWrap}>
						<img src={product.mainImage[0]} alt={product.title} />
					</div>

					<div className={styles.titleWrap}>
						<h5 className={styles.title}>{product.title} </h5>
						<p className={styles.concentration}>오 드 빠르펭</p>
						<h6 className={styles.price}>
							{selectedPrice !== null
								? `${selectedPrice.toLocaleString()}원`
								: `${product.priceBySize[0].price.toLocaleString()}원`}
						</h6>

						<p>
							선택 가능한 사이즈:
							{product.priceBySize.length}
						</p>
						<SizeDropdown
							sizes={sizes}
							prices={prices}
							onChange={handlePriceChange}
						/>
						<BlackButton
							text="장바구니에 추가하기"
							onClick={addToCart}
						></BlackButton>
					</div>
				</div>
			) : (
				<p>상품을 조회할 수 없습니다.</p>
			)}
		</section>
	);
}
