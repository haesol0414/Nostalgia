import React, { useState } from 'react';
import styles from './DropdownOption.module.scss';

interface DropdownOptionProps {
	sizes: number[];
	prices: number[];
	onChange: (selectedSize: number, price: number) => void;
}

const DropdownOption: React.FC<DropdownOptionProps> = ({
	sizes,
	prices,
	onChange,
}) => {
	const [selectedSize, setSelectedSize] = useState<number>(sizes[0]);
	const [totalPrice, setTotalPrice] = useState<number>(prices[0]);
	const [isOpen, setIsOpen] = useState(false);

	const handleSizeChange = (size: number) => {
		setSelectedSize(size);
		const selectedIndex = sizes.indexOf(size);

		if (selectedIndex !== -1) {
			const newPrice = prices[selectedIndex];
			setTotalPrice(newPrice);
			onChange(size, newPrice);
		} else {
			setTotalPrice(prices[0]);
			onChange(size, sizes[0]);
		}
		setIsOpen(false);
	};

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={styles.dropdownOption}>
			<div className={styles.dropdownHeader} onClick={toggleDropdown}>
				<span className={styles.selectedSize}>
					{selectedSize || sizes[0]}ml
				</span>
				<i className={styles.arrowDownIcon}></i>
			</div>
			{isOpen && (
				<ul className={styles.dropdownList}>
					{sizes.map(size => (
						<li key={size} onClick={() => handleSizeChange(size)}>
							{size}ml
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default DropdownOption;
