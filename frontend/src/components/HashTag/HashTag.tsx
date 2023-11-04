import React from 'react';
import styles from './HashTag.module.scss';

interface HashTagProps {
	tagName: string;
	backgroundColor?: string;
}

// 색상 코드 뽑기
function getRandomColor() {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

export default function HashTag({ tagName, backgroundColor }: HashTagProps) {
	const dynamicStyles = {
		backgroundColor: backgroundColor || getRandomColor(),
	};

	return (
		<>
			<button
				type="button"
				className={styles.hashTag}
				style={dynamicStyles}
			>
				{tagName}
			</button>
		</>
	);
}
