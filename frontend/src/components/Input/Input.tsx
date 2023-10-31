import React from 'react';
import styles from './Input.module.scss';

interface InputProps {
	type?: string;
	id?: string;
	placeholder?: string;
	value?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	autoComplete?: string;
}

export default function Input({
	type,
	placeholder,
	value,
	onChange,
	required,
	autoComplete,
}: InputProps) {
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
