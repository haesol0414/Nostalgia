import React from 'react';
import styles from './QuantitySelector.module.scss';

interface QuantitySelectorProps {
	quantity: number;
	onIncrease: () => void;
	onDecrease: () => void;
}

export default function QuantitySelector({
	quantity,
	onIncrease,
	onDecrease,
}: QuantitySelectorProps) {
	return (
		<div className={styles.quantitySelector}>
			<button className={styles.quantityButton} onClick={onDecrease}>
				-
			</button>
			<p className={styles.quantity}>{quantity}</p>
			<button className={styles.quantityButton} onClick={onIncrease}>
				+
			</button>
		</div>
	);
}
