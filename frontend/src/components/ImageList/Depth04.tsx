import React from 'react';
import styles from './Depth04.module.scss';
import { Link } from 'react-router-dom';

interface Props {
	mainTitle: string;
	subTitle: string;
	productList: Product[];
}

interface Product {
	_id: string;
	title: string;
	brand: string;
	price: number;
	mainImage: string;
}

export default function Depth04({ mainTitle, subTitle, productList }: Props) {
	return (
		<section className={styles.dep04}>
			<div>
				<div className={styles.title}>
					<h2 className={styles.mainTitle}>{mainTitle}</h2>
					<p className={styles.subTitle}>{subTitle}</p>
				</div>

				<ul>
					{productList.map(product => (
						<li key={product._id}>
							<Link to={`/products/${product._id}`}>
								<div className={styles.imageWrap}>
									<img
										src={product.mainImage}
										alt={product.title}
									/>
								</div>
							</Link>
							<div className={styles.textWrap}>
								<p className={styles.brand}>{product.brand}</p>
								<h5 className={styles.title}>
									{product.title}
								</h5>
								<p>{product.price.toLocaleString()}원</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
