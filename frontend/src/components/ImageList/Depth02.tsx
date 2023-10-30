import React from 'react';
import styles from './Depth02.module.scss';
import { Link } from 'react-router-dom';

interface Props {
	product: Product;
}

interface Product {
	_id: string;
	title: string;
	brand: string;
	price: number;
	mainImage: string;
}

// WOMAN BEST -> MAN BEST -> GENDERLESS BEST 순으로 슬라이더 효과주면 좋을 것 같음
export default function Depth02({ product }: Props) {
	return (
		<section className={styles.dep02}>
			<div className={styles.inner}>
				<Link to={`/products/${product._id}`}>
					<div className={styles.imageWrap}>
						<img src={product.mainImage} alt="Woman_Best" />
					</div>
				</Link>
				<div className={styles.textWrap}>
					<h1>WOMAN BEST</h1>
					{product ? (
						<>
							<p className={styles.brand}>{product.brand}</p>
							<h3>{product.title}</h3>
						</>
					) : (
						<></>
					)}
				</div>
			</div>
		</section>
	);
}
