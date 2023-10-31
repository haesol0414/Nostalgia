import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
	text: string;
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
}

export default function LargeButton({ text, type, onClick }: ButtonProps) {
	return (
		<>
			<button
				type={type}
				className={styles.largeButton}
				onClick={onClick}
			>
				<h5>{text}</h5>
			</button>
		</>
	);
}
