import React from 'react';
import styles from './Input.module.scss';

interface InputProps {
	type?: string;
	id?: string;
	placeholder?: string;
	value?: string | number;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	autoComplete?: string;
	text?: string;
}

export default function Input({
	type,
	placeholder,
	value,
	onChange,
	required,
	autoComplete,
	text,
}: InputProps) {
	return (
		<div className={styles.inputBox}>
			{text ? <p>{text}</p> : <></>}
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
