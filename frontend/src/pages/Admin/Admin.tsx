import React from 'react';
import styles from './Admin.module.scss';
import { useAuth } from '../../hooks/useAuth';
import MenuBar from '../../components/MenuBar/MenuBar';

export default function Admin() {
	useAuth();

	return (
		<>
			<section className={styles.adminSection}>
				<div className={styles.head}>
					<h2>관리자 페이지</h2>
				</div>
				<div className={styles.menu}>
					<div>
						<h6>상품</h6>
						<ul>
							<MenuBar
								title="전체 상품 관리"
								linkTo="/admin/products"
							></MenuBar>
							<MenuBar
								title="상품 추가"
								linkTo="/admin/add-product"
							></MenuBar>
						</ul>
					</div>
					{/* <div className={styles.list}>
						<h6>주문</h6>
						<ul>
							<MenuBar title="주문 관리" linkTo="#"></MenuBar>
						</ul>
					</div> */}
				</div>
			</section>
		</>
	);
}
