import React from 'react';
import styles from './ModifyButton.module.scss';
import { ImPencil } from '@react-icons/all-files/im/ImPencil';

interface ModifyButtonProps {
	onClick: () => void;
}

export default function ModifyButton({ onClick }: ModifyButtonProps) {
	return (
		<>
			<button
				type="button"
				className={styles.modifyButton}
				onClick={onClick}
			>
				<ImPencil className={styles.pencilIcon} />
			</button>
		</>
	);
}
