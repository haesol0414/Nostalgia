import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
	text: string;
}

export default function LargeButton({ text }: ButtonProps) {
	return (
		<>
			<button className={styles.largeButton}>
				<h5>{text}</h5>
			</button>
		</>
	);
}
