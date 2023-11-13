import React from 'react';
import styles from './ErrorText.module.scss';

interface ErrorTextProps {
	message: string;
}

export default function ErrorText({ message }: ErrorTextProps) {
	return (
		<>
			<span className={styles.errorText}>* {message}</span>
		</>
	);
}
