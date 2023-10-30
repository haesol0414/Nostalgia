import React from 'react';
import styles from './Depth03.module.scss';
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

export default function Depth03({ mainTitle, subTitle, productList }: Props) {
	return (
		<section className={styles.dep03}>
			<div className={styles.inner}>
				<div className={styles.title}>
					<h2>{mainTitle}</h2>
					<p>{subTitle}</p>
				</div>

				<ul>
					{productList?.length ? (
						productList.map(product => (
							<li key={product._id}>
								<Link to={`/products/${product._id}`}>
									<h5 className={styles.title}>
										{product.title}
									</h5>
									<p className={styles.brand}>
										{product.brand}
									</p>
									<div className={styles.imageWrap}>
										<img
											src={product.mainImage}
											alt={product.title}
										/>
									</div>
								</Link>
							</li>
						))
					) : (
						<></>
					)}
				</ul>
			</div>
		</section>
	);
}
