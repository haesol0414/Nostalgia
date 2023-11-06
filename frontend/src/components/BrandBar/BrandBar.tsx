import React from 'react';
import styles from './BrandBar.module.scss';
import { Product } from '../../model/product';

interface BrandBarProps {
	brandName: string;
	products: Product;
}

export default function BrandBar({ products, brandName }: BrandBarProps) {

	return (
		<>
			<div className={styles.brandBar}></div>
		</>
	);
}
