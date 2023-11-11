import React from 'react';
import styles from './ErrorText.module.scss';
import { FaPlus } from 'react-icons/fa';

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
