/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import Depth01 from '../../components/ImageList/Depth01';
import Depth02 from '../../components/ImageList/Depth02';
import Depth03 from '../../components/ImageList/Depth03';
import Depth04 from '../../components/ImageList/Depth04';
import { womanPerfumes, womanBest } from '../../assets/datas/datas';
import { getMainProducts } from '../../utils/apiRequests';
import { Product } from '../../model/product';

interface MainProductsResponse {
	message: string;
	bestProducts: Product[];
	newProducts: Product[];
	bestProductsBygender: BestProductsBygender;
}

export interface BestProductsBygender {
	womanBest: Product;
	manBest: Product;
	genderlessBest: Product;
}

export default function Home() {
	const [bestProducts, setBestProducts] = useState<Product[]>();
	const [newProducts, setNewProducts] = useState<Product[]>();
	const [bestProdutsByGender, setbestProdutsByGender] =
		useState<BestProductsBygender>();

	useEffect(() => {
		const getHomeProducts = async () => {
			try {
				const response = await getMainProducts<MainProductsResponse>();

				console.log('홈 상품 : ', response);
				if (response.data) {
					setBestProducts(response.data.bestProducts);
					setNewProducts(response.data.newProducts);
					setbestProdutsByGender(response.data.bestProductsBygender);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getHomeProducts();
	}, []);

	return (
		<section className={styles.homeSection}>
			<div className={styles.visualBox}>
				<img
					src="https://images5.alphacoders.com/414/414410.jpg"
					alt="Main_Image"
				/>
				<div className={styles.visualText}>
					<h2 className={styles.bigTitle}>silder title</h2>
					<p className={styles.subText}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Consequatur maiores vitae laudantium assumenda beatae
						labore inventore repellat recusandae quibusdam.
					</p>
					<button className={styles.button}>
						<a href="#">BUTTON ‣</a>
					</button>
				</div>
			</div>
			<Depth01
				mainTitle="Best Product"
				subTitle="베스트 상품 모음"
				productList={bestProducts}
			></Depth01>
			{bestProdutsByGender ? (
				<Depth02 productList={bestProdutsByGender}></Depth02>
			) : (
				<></>
			)}
			<Depth03
				mainTitle="New Product"
				subTitle="신규 상품 모음"
				productList={newProducts}
			></Depth03>
			<Depth04
				mainTitle="For You"
				subTitle="나를 위한 추천"
				productList={womanPerfumes}
			></Depth04>
		</section>
	);
}
