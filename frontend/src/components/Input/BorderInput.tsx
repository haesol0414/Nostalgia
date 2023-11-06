import React from 'react';
import styles from './BorderInput.module.scss';

interface BorderInputProps {
	type?: string;
	id?: string;
	placeholder?: string;
	value: string | number;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	autoComplete?: string;
}

export default function BorderInput({
	type,
	placeholder,
	value,
	onChange,
	required,
	autoComplete,
}: BorderInputProps) {
	return (
		<div className={styles.inputBox}>
			<input
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				required={required}
				autoComplete={autoComplete}
			/>
		</div>
	);
}
