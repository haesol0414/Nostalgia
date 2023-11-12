import React, { useState } from 'react';
import styles from './Depth01.module.scss';
import { Link } from 'react-router-dom';
import { Product } from '../../model/product';
import WhiteButton from '../Button/WhiteButton';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

interface Props {
	mainTitle: string;
	subTitle: string;
	productList?: Product[];
}

export default function Depth01({ mainTitle, subTitle, productList }: Props) {
	const [visibleProducts, setVisibleProducts] = useState<number>(8);

	const showMoreProducts = () => {
		setVisibleProducts(prev => prev + 8);
	};

	return (
		<section className={styles.dep01}>
			<div className={styles.title}>
				<h2 className={styles.mainTitle}>{mainTitle}</h2>
				<p className={styles.subTitle}>{subTitle}</p>
			</div>
			{!productList ? (
				<div className={styles.empty}>
					<h5>상품이 없습니다.</h5>
				</div>
			) : (
				<>
					<ul>
						{productList?.length ? (
							productList
								.slice(0, visibleProducts)
								.map(product => (
									<li key={product._id}>
										<Link to={`/products/${product._id}`}>
											<div className={styles.imageWrap}>
												<img
													src={product.mainImage[0]}
													alt={product.title}
												/>
											</div>
											<div className={styles.textWrap}>
												<p className={styles.brand}>
													{product.brand}
												</p>
												<h5 className={styles.title}>
													{product.title}
												</h5>
												{product.currentAmount > 0 ? (
													<p className={styles.price}>
														{product.priceBySize[0].price.toLocaleString()}
														원
													</p>
												) : (
													<p>SOLD OUT</p>
												)}
											</div>
										</Link>
									</li>
								))
						) : (
							<LoadingSpinner />
						)}
					</ul>
					{productList?.length &&
						productList.length > visibleProducts && (
							<div className={styles.showMore}>
								<WhiteButton
									text="More"
									onClick={showMoreProducts}
								></WhiteButton>
							</div>
						)}
				</>
			)}
		</section>
	);
}
