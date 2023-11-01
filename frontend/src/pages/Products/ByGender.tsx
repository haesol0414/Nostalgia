import React, { useEffect, useState } from 'react';
import styles from './ByGender.module.scss';
import Depth01 from '../../components/ImageList/Depth01';
import { useParams } from 'react-router-dom';
import { getAllProductsByCategory } from '../../utils/apiRequests';
import { Product } from '../../model/product';

interface ProductsByGenderResponse {
	message: string;
	productsByGender: Product[];
}

export default function ByGender() {
	const params = useParams();
	const gender = params.gender;
	let category: string;
	const [products, setProducts] = useState<Product[]>();

	if (gender === 'woman') {
		category = 'woman';
	} else if (gender === 'man') {
		category = 'man';
	} else {
		category = 'genderless';
	}

	// 카테고리별 상품 불러오기
	useEffect(() => {
		const getProductsByGender = async () => {
			try {
				const response =
					await getAllProductsByCategory<ProductsByGenderResponse>(
						category,
					);

				console.log('성별 카테고리별 상품 : ', response);

				if (response.data) {
					setProducts(response.data.productsByGender);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getProductsByGender();
	}, []);

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
