import React from 'react';
import styles from './Footer.module.scss';

export default function Footer() {
	return (
		<section className={styles.footerSection}>
			<div className={styles.inner}>
				<h1>Nostalgia</h1>
				<p>
					Copyright 2023. Nostalgia All pictures cannot be copied
					without permission.
				</p>
			</div>
		</section>
	);
}
