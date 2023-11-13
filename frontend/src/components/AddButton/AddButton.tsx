import React from 'react';
import styles from './AddButton.module.scss';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';

interface AddButtonProps {
	onClick: () => void;
}

export default function AddButton({ onClick }: AddButtonProps) {
	return (
		<>
			<button
				type="button"
				className={styles.addButton}
				onClick={onClick}
			>
				<FaPlus className={styles.plusIcon} />
			</button>
		</>
	);
}
