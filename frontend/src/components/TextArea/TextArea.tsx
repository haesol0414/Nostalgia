import React from 'react';
import styles from './TextArea.module.scss';

interface TextAreaProps {
	placeholder?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	required?: boolean;
}

export default function TextArea({
	placeholder,
	value,
	onChange,
	required,
}: TextAreaProps) {
	return (
		<div className={styles.textareaBox}>
			<textarea
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				required={required}
			/>
		</div>
	);
}
