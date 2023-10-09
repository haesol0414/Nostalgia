import React from 'react';
import styles from './Depth01.module.scss';
import { Link } from 'react-router-dom';

interface Props {
	mainTitle: string;
	subTitle: string;
	productList?: Product[];
}

interface Product {
	_id: string;
	title: string;
	brand: string;
	price: number;
	mainImage: string;
}

export default function Depth01({ mainTitle, subTitle, productList }: Props) {
	return (
		<section className={styles.dep01}>
			<div className={styles.title}>
				<h2>{mainTitle}</h2>
				<p>{subTitle}</p>
			</div>
			<ul>
				{productList?.length ? (
					productList.map(product => (
						<li key={product._id}>
							<Link to={`/products/${product._id}`}>
								<div className={styles.imageWrap}>
									<img
										src={product.mainImage}
										alt={product.title}
									/>
								</div>
								<div className={styles.textWrap}>
									<p className="brand">{product.brand}</p>
									<h5>{product.title}</h5>
									<p>{product.price.toLocaleString()}원</p>
								</div>
							</Link>
						</li>
					))
				) : (
					<h3 className={styles.empty}>상품이 없습니다.</h3>
				)}
			</ul>
		</section>
	);
}
