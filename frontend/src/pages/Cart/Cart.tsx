import React from 'react';
import styles from './Cart.module.scss';
import BlackButton from '../../components/Button/BlackButton';
import { testProduct } from '../../assets/datas/datas';
import WhiteButton from '../../components/Button/WhiteButton';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
	const navigate = useNavigate();

	const handleContinueBtn = () => {
		navigate('/');
	};

	return (
		<section className={styles.cartSection}>
			<div className={styles.cartWrap}>
				<h2>장바구니</h2>

				<div className={styles.cartProduct}>
					<div className={styles.middle}>
						<img src={testProduct.mainImage} />
						<div className={styles.textInfo}>
							<h5>{testProduct.title}</h5>
							<p className={styles.concentration}>오 드 빠르펭</p>
							<p className={styles.size}>35ml</p>

							{/* <button className={styles.deleteButton}>
								삭제
							</button>  =>  위로 땡길까 싶음 */}
						</div>
					</div>
					<div className={styles.bottom}>
						<h6 className={styles.price}>155,550원</h6>
					</div>
				</div>

				<div className={styles.buttons}>
					<BlackButton text="주문하기" onClick={() => {}} />
					<WhiteButton
						text="계속 쇼핑하기"
						onClick={handleContinueBtn}
					/>
				</div>
			</div>
		</section>
	);
}
