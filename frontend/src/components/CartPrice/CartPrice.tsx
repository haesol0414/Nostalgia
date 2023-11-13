import React from 'react';
import styles from './CartPrice.module.scss';

interface CartPriceProps {
	totalProductPrice: number;
	shippingFee: number;
}

export default function CartPrice({
	totalProductPrice,
	shippingFee,
}: CartPriceProps) {
	return (
		<div className={styles.cartPrice}>
			<div className={styles.row}>
				<div className={styles.cell}>총 상품 금액</div>
				<div className={styles.cell}>+</div>
				<div className={styles.cell}>배송비</div>
				<div className={styles.cell}>=</div>
				<div className={styles.cell}>총 결제 금액</div>
			</div>
			<div className={styles.row}>
				<div className={styles.cell}>
					{totalProductPrice.toLocaleString()}원
				</div>
				<div className={styles.cell}>+</div>
				<div className={styles.cell}>
					{shippingFee.toLocaleString()}원
				</div>
				<div className={styles.cell}>=</div>
				<div className={styles.cell}>
					{(shippingFee + totalProductPrice).toLocaleString()}원
				</div>
			</div>
		</div>
	);
}
