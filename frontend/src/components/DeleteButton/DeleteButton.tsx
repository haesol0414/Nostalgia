import React from 'react';
import styles from './DeleteButton.module.scss';
import { FaTrash } from '@react-icons/all-files/fa/FaTrash';

interface DeleteButtonProps {
	onClick: () => void;
}

export default function DeleteButton({ onClick }: DeleteButtonProps) {
	return (
		<>
			<button
				type="button"
				className={styles.deleteButton}
				onClick={onClick}
			>
				<FaTrash className={styles.trashIcon} />
			</button>
		</>
	);
}
