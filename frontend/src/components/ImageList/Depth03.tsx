import React from 'react';
import styles from './Depth03.module.scss';

export default function Depth03() {
	return (
		<section className={styles.dep03}>
			<div className={styles.inner}>
				<div className={styles.title}>
					<h2>Depth03 Title</h2>
					<p>New Products</p>
				</div>

				<ul>
					<li>
						<a href="#">
							<h4>상품명</h4>
							<p>
								Lorem ipsum, dolor sit amet consectetur
								adipisicing elit.
							</p>
							<div className={styles.imageWrap}></div>
						</a>
					</li>
					<li>
						<a href="#">
							<h4>상품명</h4>
							<p>
								Lorem ipsum, dolor sit amet consectetur
								adipisicing elit.
							</p>
							<div className={styles.imageWrap}></div>
						</a>
					</li>
					<li>
						<a href="#">
							<h4>상품명</h4>
							<p>
								Lorem ipsum, dolor sit amet consectetur
								adipisicing elit.
							</p>
							<div className={styles.imageWrap}></div>
						</a>
					</li>
					<li>
						<a href="#">
							<h4>상품명</h4>
							<p>
								Lorem ipsum, dolor sit amet consectetur
								adipisicing elit.
							</p>
							<div className={styles.imageWrap}></div>
						</a>
					</li>
				</ul>
			</div>
		</section>
	);
}
