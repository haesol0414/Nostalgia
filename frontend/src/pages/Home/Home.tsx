/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import Depth01 from '../../components/ImageList/Depth01';
import Depth02 from '../../components/ImageList/Depth02';
import Depth03 from '../../components/ImageList/Depth03';
import Depth04 from '../../components/ImageList/Depth04';
import { womanPerfumes } from '../../assets/datas/datas';
import { getMainProducts } from '../../utils/apiRequests';
import { Product } from '../../model/product';
import { useRecoilValue } from 'recoil';

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
					<h2 className={styles.bigTitle}>COCO MADEMOISELLE</h2>
					<p className={styles.subText}>
						코코 마드모아젤. 신선하면서도 거부할 수 없는 양면성의
						매력을 지닌 매혹적이고 여성스러운 향수입니다. 매일
						새로움을 원하는, 장난기 가득하면서 도발적이고, 자유
						분방하고 사랑스러운 여성에게 잘 어울립니다.
					</p>
					<button className={styles.button}>
						<a href="/products/654fd207ad6f1543e3ace47a">
							바로 가기 ‣
						</a>
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
			{/* <Depth04
				mainTitle="For You"
				subTitle="나를 위한 추천"
				productList={womanPerfumes}
			></Depth04> */}
		</section>
	);
}
