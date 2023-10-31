import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
	text: string;
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
}

export default function BlackButton({ text, type, onClick }: ButtonProps) {
	return (
		<button type={type} className={styles.blackButton} onClick={onClick}>
			<p>{text}</p>
		</button>
	);
}
