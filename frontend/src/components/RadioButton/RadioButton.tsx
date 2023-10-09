import React from 'react';
import styles from './RadioButton.module.scss';

interface RadioButtonProps {
	label: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
}

export default function RadioButton({
	label,
	checked,
	onChange,
}: RadioButtonProps) {
	const handleChange = () => {
		onChange(!checked);
	};
	return (
		<label
			className={`${styles.radioButton} ${checked ? styles.checked : ''}`}
		>
			<input type="radio" checked={checked} onChange={handleChange} />
			{label}
		</label>
	);
}
