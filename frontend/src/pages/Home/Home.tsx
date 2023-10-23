/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from 'react';
import styles from './Home.module.scss';
import Depth01 from '../../components/ImageList/Depth01';
import Depth02 from '../../components/ImageList/Depth02';
import Depth03 from '../../components/ImageList/Depth03';
import Depth04 from '../../components/ImageList/Depth04';
import { womanPerfumes } from '../../assets/datas/datas';

export default function Home() {
	return (
		<section className={styles.homeSection}>
			<div className={styles.visualBox}>
				<img
					src="https://images5.alphacoders.com/414/414410.jpg"
					alt="Main_Image"
				/>
				<div className={styles.visualText}>
					<h2 className={styles.bigTitle}>silder title</h2>
					<p className={styles.subText}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Consequatur maiores vitae laudantium assumenda beatae
						labore inventore repellat recusandae quibusdam.
					</p>
					<a href="#" className={styles.button}>
						<span>BUTTON</span>
					</a>
				</div>
			</div>
			<Depth01
				mainTitle="Best Product"
				subTitle="베스트 상품 모음"
				productList={womanPerfumes}
			></Depth01>
			<Depth02></Depth02>
			<Depth03></Depth03>
			<Depth04
				mainTitle="For You"
				subTitle="나를 위한 추천"
				productList={womanPerfumes}
			></Depth04>
		</section>
	);
}
