import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
	text: string;
	onClick: () => void;
}

export default function WhiteButton({ text, onClick }: ButtonProps) {
	return (
		<>
			<button className={styles.whiteButton} onClick={onClick}>
				<p>{text}</p>
			</button>
		</>
	);
}
