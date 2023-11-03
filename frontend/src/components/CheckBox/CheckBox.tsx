import React from 'react';
import styles from './CheckBox.module.scss';
import { CartProduct } from '../../model/product';

interface CheckBoxProps {
	product: CartProduct;
	isChecked: boolean;
	onToggle: (product: CartProduct, isChecked: boolean) => void;
}

export default function CheckBox({
	product,
	isChecked,
	onToggle,
}: CheckBoxProps) {
	const handleCheckBoxChange = () => {
		onToggle(product, !isChecked);
	};

	return (
		<label className={styles.checkBoxContainer}>
			<input
				className={styles.checkBoxInput}
				type="checkbox"
				checked={isChecked}
				onChange={handleCheckBoxChange}
			/>
		</label>
	);
}
