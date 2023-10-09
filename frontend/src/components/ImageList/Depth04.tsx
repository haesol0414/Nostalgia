import React from 'react';
import styles from './Depth04.module.scss';

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
					<h2>{mainTitle}</h2>
					<p>{subTitle}</p>
				</div>

				<ul>
					{productList.map(product => (
						<li key={product._id}>
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
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
