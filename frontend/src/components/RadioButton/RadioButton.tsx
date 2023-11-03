import React from 'react';
import styles from './RadioButton.module.scss';
import { Product } from '../../model/product';

interface RadioButtonProps {
	product: Product;
	selectedProductId: string;
	onRadioChange: (productId: string) => void;
}

export default function RadioButton({
	product,
	selectedProductId,
	onRadioChange,
}: RadioButtonProps) {
	const isSelected = product._id === selectedProductId;

	const handleRadioChange = () => {
		if (!isSelected) {
			console.log(product);
			onRadioChange(product._id);
		}
	};

	return (
		<label className={styles.checkBoxContainer}>
			<input
				type="radio"
				value={product._id}
				checked={isSelected}
				onChange={handleRadioChange}
			/>
		</label>
	);
}
