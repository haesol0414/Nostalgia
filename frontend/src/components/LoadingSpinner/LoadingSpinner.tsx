import React from 'react';
import styles from './LoadingSpinner.module.scss';
import Spinner from '../../assets/spinner.gif';

export default function LoadingSpinner() {
	return (
		<div className={styles.loadingSpinner}>
			<img src={Spinner} alt="로딩 중..." width="5%" />
		</div>
	);
}
