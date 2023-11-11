import React from 'react';
import styles from './OrderProductList.module.scss';
import { CartProduct } from '../../model/product';

interface OrderProductListProps {
	orderProducts?: CartProduct[];
}

export default function OrderProductList({
	orderProducts,
}: OrderProductListProps) {
	return (
		<>
			{orderProducts && orderProducts.length > 0 ? (
				<ul className={styles.orderProductList}>
					{orderProducts.map((product, index) => (
						<>
							<a href={`/products/${product._id}`}>
								<li key={index} className={styles.orderProduct}>
									<img
										src={product.mainImage}
										alt={product.title}
									/>
									<div className={styles.textInfo}>
										<div className={styles.productInfo}>
											<h5>{product.title}</h5>
											<p className={styles.concentration}>
												{product.concentration}
											</p>
											<p className={styles.size}>
												{product.selectedSize}ml
											</p>
										</div>
										<div className={styles.priceInfo}>
											<p>수량 {product.orderAmount}</p>
											<h6>
												{product.totalPrice.toLocaleString()}
												원
											</h6>
										</div>
									</div>
								</li>
							</a>
						</>
					))}
				</ul>
			) : (
				<p>상품을 표시할 수 없습니다.</p>
			)}
		</>
	);
}
