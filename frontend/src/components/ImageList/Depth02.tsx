import React from 'react';
import styles from './Depth02.module.scss';
import { womanBest } from '../../assets/datas/datas';

export default function Depth02() {
	return (
		<section className={styles.dep02}>
			<div className={styles.inner}>
				<div className={styles.imageWrap}>
					<img src={womanBest.mainImage} alt="Woman_Best" />
				</div>
				<div className={styles.title}>
					<h2>여성 향수 BEST</h2>
					<p>
						{womanBest.brand} {womanBest.title}
					</p>
				</div>
			</div>
		</section>
	);
}
