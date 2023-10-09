import React from 'react';
import styles from './Button.module.scss';


interface ButtonProps {
	text: string;
	onClick: () => void;
}

export default function SmallButton({ text, onClick }: ButtonProps) {
	return (
		<>
			<button className={styles.smallButton} onClick={onClick}>
				<p>{text}</p>
			</button>
		</>
	);
}
