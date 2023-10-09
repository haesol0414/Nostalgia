import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProductDetails.module.scss';
import { womanBest } from '../../assets/datas/datas';
import BlackButton from '../../components/Button/BlackButton';
import DropdownOption from '../../components/DropdownOption/DropdownOption';

const size = ['35ml', '100ml'];
const price = [120000, 240000];

export default function ProductDetails() {
	const params = useParams();
	const productId = params.productId;
	console.log(productId);

	const [totalPrice, setTotalPrice] = useState<number | null>(null);
	const [selectedSize, setSelectedSize] = useState<string>('');

	const handlePriceChange = (
		selectedSize: string,
		newPrice: number | null,
	) => {
		setTotalPrice(newPrice);
		setSelectedSize(selectedSize);
	};

	const handleCartBtn = () => {
		alert(
			`${productId} 상품이 장바구니에 추가 되었습니다. ${selectedSize} , ${totalPrice}`,
		);
	};

	return (
		<section className={styles.detailSection}>
			<div className={styles.main}>
				<div className={styles.imageWrap}>
					<img src={womanBest.mainImage} />
				</div>

				<div className={styles.titleWrap}>
					<h5 className={styles.title}>{womanBest.title} </h5>
					<p className={styles.concentration}>오 드 빠르펭</p>
					<h6 className={styles.price}>
						{totalPrice !== null
							? `${totalPrice.toLocaleString()}원`
							: `${price[0].toLocaleString()}원`}
					</h6>

					<p>선택 가능한 사이즈: {size.length}</p>
					<DropdownOption
						sizes={size}
						prices={price}
						onChange={handlePriceChange}
					/>
					<BlackButton
						text="장바구니에 추가하기"
						onClick={handleCartBtn}
					></BlackButton>
				</div>
			</div>
		</section>
	);
}
