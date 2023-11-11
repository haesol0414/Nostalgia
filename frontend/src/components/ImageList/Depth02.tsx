import React from 'react';
import styles from './Depth02.module.scss';
import { Link } from 'react-router-dom';
import { BestProductsBygender } from '../../pages/Home/Home';

interface Props {
	productList: BestProductsBygender;
}

// WOMAN BEST -> MAN BEST -> GENDERLESS BEST 순으로 슬라이더 효과주면 좋을 것 같음
export default function Depth02({ productList }: Props) {
	return (
		<section className={styles.dep02}>
			<div className={styles.inner}>
				<Link to={`/products/${productList.womanBest._id}`}>
					<div className={styles.imageWrap}>
						<img
							src={productList.womanBest.mainImage[0]}
							alt="best_product"
						/>
					</div>
				</Link>
				<div className={styles.textWrap}>
					<h1>WOMAN BEST</h1>
					{productList.womanBest ? (
						<>
							<p className={styles.brand}>
								{productList.womanBest.brand}
							</p>
							<h3 className={styles.title}>
								{productList.womanBest.title}
							</h3>
							<p className={styles.description}>
								{productList.womanBest.description}
							</p>
						</>
					) : (
						<>
							<h5>상품이 없습니다.</h5>
						</>
					)}
				</div>
			</div>
		</section>
	);
}
