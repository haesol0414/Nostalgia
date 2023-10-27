import React from 'react';
import styles from './ByGender.module.scss';
import Depth01 from '../../components/ImageList/Depth01';
import { womanPerfumes, manPerfumes } from '../../assets/datas/datas';
import { useParams } from 'react-router-dom';

// 수정필요

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
	const gender = params.gender;
	let category: string;
	let products: Products = [];

	if (gender === 'woman') {
		category = 'woman';
		products = womanPerfumes;
	} else if (gender === 'man') {
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
