import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Depth03.module.scss';
import { Product } from '../../model/product';

interface Props {
	mainTitle: string;
	subTitle: string;
	productList?: Product[];
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
									<div className={styles.textInfo}>
										<p className={styles.brand}>
											{product.brand}
										</p>
										<h5 className={styles.productTitle}>
											{product.title}
										</h5>
										<p className={styles.description}>
											{product.description}
										</p>
									</div>
									<div className={styles.imageWrap}>
										<img
											src={product.mainImage[0]}
											alt={product.title}
										/>
									</div>
								</Link>
							</li>
						))
					) : (
						<>
							<h5>상품이 없습니다.</h5>
						</>
					)}
				</ul>
			</div>
		</section>
	);
}
