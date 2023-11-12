import React, { useEffect, useState } from 'react';
import styles from './Depth04.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import BlackButton from '../Button/BlackButton';
import { getUserPreferenceProducts } from '../../utils/apiRequests';
import { Product } from '../../model/product';
import { isTokenAvailable } from '../../utils/authUtils';

interface Props {
	mainTitle: string;
	subTitle: string;
	productList: TestProduct[];
}

interface TestProduct {
	_id: string;
	title: string;
	brand: string;
	price: number;
	mainImage: string;
}

interface UserPreferenceResponse {
	message: string;
	userPreferences: Product[];
}

export default function Depth04({ mainTitle, subTitle, productList }: Props) {
	const navigate = useNavigate();
	const [hasPreference, setHasPreference] = useState<boolean>(false);
	const [preferredProducts, setPreferredProducts] = useState<Product[]>();
	const [email, setEmail] = useState<string>('');
	const isLoggedIn = isTokenAvailable();

	const guestNavigateLogin = () => {
		navigate('/login');
	};
	const userNavigateAccount = () => {
		navigate('/account/personal-details');
	};

	const getUserPreferredProducts = async () => {
		setHasPreference(true);

		try {
			const response =
				await getUserPreferenceProducts<UserPreferenceResponse>({
					email,
				});

			if (
				response.data.userPreferences.length === 0 &&
				response.data.message === '맞춤 정보 설정이 필요합니다.'
			) {
				setHasPreference(false);
			} else if (response.data.userPreferences) {
				setPreferredProducts(response.data.userPreferences);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (isLoggedIn) {
			const storedUser = sessionStorage.getItem('user');
			if (storedUser) {
				const userObject = JSON.parse(storedUser);
				setEmail(userObject.email);
			}
		} else {
			return;
		}
	}, []);

	useEffect(() => {
		if (email !== '') {
			getUserPreferredProducts();
		}
	}, [email]);

	return (
		<section className={styles.dep04}>
			<div>
				<div className={styles.title}>
					<h2 className={styles.mainTitle}>{mainTitle}</h2>
					<p className={styles.subTitle}>{subTitle}</p>
				</div>

				{isLoggedIn && hasPreference && preferredProducts ? (
					<ul>
						{preferredProducts.length === 0 ? (
							<h5 className={styles.notice}>
								맞춤 정보에 알맞은 상품이 없습니다.
							</h5>
						) : (
							<>
								{preferredProducts.map(product => (
									<li key={product._id}>
										<Link to={`/products/${product._id}`}>
											<div className={styles.imageWrap}>
												<img
													src={product.mainImage[0]}
													alt={product.title}
												/>
											</div>
										</Link>
										<div className={styles.textWrap}>
											<p className={styles.brand}>
												{product.brand}
											</p>
											<h5 className={styles.title}>
												{product.title}
											</h5>
											<p>
												{product.priceBySize[0].price.toLocaleString()}
												원
											</p>
										</div>
									</li>
								))}
							</>
						)}
					</ul>
				) : (
					<div className={styles.nonePreference}>
						<span>
							맞춤 정보 설정 후, 나와 맞는 상품을 찾아보실 수
							있습니다.
						</span>
						<BlackButton
							text="맞춤 정보 설정하기"
							onClick={() => {
								isLoggedIn
									? userNavigateAccount()
									: guestNavigateLogin();
							}}
						/>
						<div className={styles.blurOverlay}>
							<ul>
								{productList.map(product => (
									<li key={product._id}>
										<Link to={`/products/${product._id}`}>
											<div className={styles.imageWrap}>
												<img
													src={product.mainImage}
													alt={product.title}
												/>
											</div>
										</Link>
										<div className={styles.textWrap}>
											<p className={styles.brand}>
												{product.brand}
											</p>
											<h5 className={styles.title}>
												{product.title}
											</h5>
											<p>
												{product.price.toLocaleString()}
												원
											</p>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
