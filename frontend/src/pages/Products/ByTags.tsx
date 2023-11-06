import React, { useEffect, useState } from 'react';
import styles from './ByTags.module.scss';
import Depth01 from '../../components/ImageList/Depth01';
import { useParams } from 'react-router-dom';
import { Product } from '../../model/product';
import { getAllProductsByTags } from '../../utils/apiRequests';

interface ProductsByTagsResponse {
	message: string;
	productsByTags: Product[];
}

export default function ByTags() {
	const params = useParams();
	const hashtag = params.hashtag;
	const [products, setProducts] = useState<Product[]>();

	useEffect(() => {
		const getProductsByTags = async () => {
			if (hashtag) {
				console.log(hashtag);
				try {
					const response =
						await getAllProductsByTags<ProductsByTagsResponse>(
							hashtag,
						);

					console.log('태그별 카테고리별 상품 : ', response);

					if (response.data) {
						setProducts(response.data.productsByTags);
					}
				} catch (error) {
					console.log(error);
				}
			}
		};
		getProductsByTags();
	}, []);

	return (
		<section className={styles.genderSection}>
			<Depth01
				mainTitle={hashtag ? hashtag : ''}
				subTitle={''}
				productList={products}
			></Depth01>
		</section>
	);
}
