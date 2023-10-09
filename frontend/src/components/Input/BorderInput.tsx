import React from 'react';
import styles from './BorderInput.module.scss';

interface BorderInputProps {
	type: 'text' | 'number';
	onChange: (value: string | number | null) => void;
	value?: string | number | null;
}

export default function BorderInput({ type, onChange }: BorderInputProps) {
	//string타입
	const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		onChange(value);
	};

	//number타입
	const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.valueAsNumber;
		onChange(value);
	};

	return (
		<div className={styles.inputContainer}>
			{type === 'number' ? (
				<input
					type="number"
					className={styles.textInput}
					onChange={handleNumberChange}
				/>
			) : (
				<input
					type="text"
					className={styles.textInput}
					onChange={handleTextChange}
				/>
			)}
		</div>
	);
}
