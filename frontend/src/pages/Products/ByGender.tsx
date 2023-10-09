import React from 'react';
import styles from './ByGender.module.scss';
import Depth01 from '../../components/ImageList/Depth01';
import { womanPerfumes, manPerfumes } from '../../assets/datas/datas';
import { useParams } from 'react-router-dom';

interface Product {
	_id: string;
	title: string;
	brand: string;
	price: number;
	mainImage: string;
}

// Products 배열 인터페이스
interface Products extends Array<Product> {}

export default function ByGender() {
	const params = useParams();
	const categoryName = params.categoryName;
	console.log(categoryName);
	let category: string;
	let products: Products = [];

	if (categoryName === 'woman') {
		category = 'woman';
		products = womanPerfumes;
	} else if (categoryName === 'man') {
		category = 'man';
		products = manPerfumes;
	} else {
		category = 'genderless';
	}

	return (
		<section className={styles.genderSection}>
			<Depth01
				mainTitle={category}
				subTitle="향수 모음"
				productList={products}
			></Depth01>
		</section>
	);
}
