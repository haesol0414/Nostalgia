import React, { ChangeEvent } from 'react';
import styles from './SelectBox.module.scss';

interface SelectBoxProps {
	options: string[];
	selectedValue: string;
	onSelect: (value: string) => void;
}

export default function SelectBox({
	options,
	selectedValue,
	onSelect,
}: SelectBoxProps) {
	return (
		<select
			className={styles.selectBox}
			value={selectedValue}
			onChange={(e: ChangeEvent<HTMLSelectElement>) =>
				onSelect(e.target.value)
			}
		>
			<option value="">Select Option</option>
			{options.map(option => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
	);
}
