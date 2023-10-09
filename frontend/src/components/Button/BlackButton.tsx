import React from 'react';
import styles from './Button.module.scss';


interface ButtonProps {
	text: string;
	onClick: () => void;
}

export default function BlackButton({ text, onClick }: ButtonProps) {
	return (
		<button className={styles.blackButton} onClick={onClick}>
			<p>{text}</p>
		</button>
	);
}
