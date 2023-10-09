import React, { useState } from 'react';
import styles from './DropdownOption.module.scss';

interface DropdownOptionProps {
	sizes: string[];
	prices: number[];
	onChange: (selectedSize: string, price: number | null) => void;
}

const DropdownOption: React.FC<DropdownOptionProps> = ({
	sizes,
	prices,
	onChange,
}) => {
	const [selectedSize, setSelectedSize] = useState<string>('');
	const [totalPrice, setTotalPrice] = useState<number | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const handleSizeChange = (size: string) => {
		setSelectedSize(size);
		const selectedIndex = sizes.indexOf(size);

		if (selectedIndex !== -1) {
			const newPrice = prices[selectedIndex];
			setTotalPrice(newPrice);
			onChange(size, newPrice);
		} else {
			setTotalPrice(null);
			onChange(size, null);
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
					{selectedSize || sizes[0]}
				</span>
				<i className={styles.arrowDownIcon}></i>
			</div>
			{isOpen && (
				<ul className={styles.dropdownList}>
					{sizes.map(size => (
						<li key={size} onClick={() => handleSizeChange(size)}>
							{size}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default DropdownOption;
