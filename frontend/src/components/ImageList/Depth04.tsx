import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Depth04.module.scss';
import BlackButton from '../Button/BlackButton';
import { getUserPreferenceProducts } from '../../api/apiRequests';
import { Product } from '../../model/product';
import { isTokenAvailable } from '../../utils/authUtils';
import HashTag from '../HashTag/HashTag';

interface Props {
	mainTitle: string;
	subTitle: string;
	productList: TestProduct[];
}

interface UserPreferenceProductsResponse {
	message: string;
	userPreferences: Product[];
}

interface userPreference {
	gender: string;
	preference: string;
}

interface TestProduct {
	_id: string;
	title: string;
	brand: string;
	price: number;
	mainImage: string;
}

export default function Depth04({ mainTitle, subTitle, productList }: Props) {
	const navigate = useNavigate();
	const [hasPreference, setHasPreference] = useState<boolean>(false);
	const [preferredProducts, setPreferredProducts] = useState<Product[]>();
	const [currentUserPreference, setCurrentUserPreference] =
		useState<userPreference>();
	const isLoggedIn = isTokenAvailable();

	const guestNavigateLogin = () => {
		navigate('/login');
	};
	const userNavigateAccount = () => {
		navigate('/account/personal-details');
	};

	const getUserPreferredProducts = async (
		currentUserPreference: userPreference,
	) => {
		try {
			const response =
				await getUserPreferenceProducts<UserPreferenceProductsResponse>(
					{
						currentUserPreference,
					},
				);

			if (response.data.userPreferences) {
				setPreferredProducts(response.data.userPreferences);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (isLoggedIn) {
			const userPreference = sessionStorage.getItem('userPreference');

			if (userPreference) {
				setCurrentUserPreference(JSON.parse(userPreference));

				if (
					userPreference &&
					Object.keys(JSON.parse(userPreference)).length === 0
				) {
					setHasPreference(false);
				} else if (userPreference) {
					setCurrentUserPreference(JSON.parse(userPreference));
				}
			}
		} else {
			return;
		}
	}, []);

	useEffect(() => {
		if (
			currentUserPreference &&
			Object.keys(currentUserPreference).length === 0
		) {
			setHasPreference(false);
			return;
		}

		if (
			currentUserPreference &&
			currentUserPreference.gender !== '' &&
			currentUserPreference.preference !== ''
		) {
			setHasPreference(true);

			getUserPreferredProducts(currentUserPreference);
		}
	}, [currentUserPreference]);

	return (
		<section className={styles.dep04}>
			<div>
				<div className={styles.title}>
					<h2 className={styles.mainTitle}>{mainTitle}</h2>
					<p className={styles.subTitle}>{subTitle}</p>

					{isLoggedIn &&
					hasPreference &&
					preferredProducts &&
					preferredProducts.length > 0 ? (
						<div className={styles.userPreferenceTag}>
							<HashTag
								tagName={`#${preferredProducts[0].gender}`}
							/>
							<HashTag tagName={preferredProducts[0].hashTag} />
						</div>
					) : (
						<></>
					)}
				</div>

				{isLoggedIn && hasPreference && preferredProducts ? (
					<ul>
						{currentUserPreference &&
						currentUserPreference.gender !== '' &&
						currentUserPreference.preference !== '' &&
						preferredProducts.length === 0 ? (
							<div className={styles.none}>
								<h5 className={styles.notice}>
									맞춤 정보에 알맞은 상품이 없습니다.
								</h5>
								<BlackButton
									text="맞춤 정보 재설정하기"
									onClick={userNavigateAccount}
								/>
							</div>
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
										<div className={styles.blurimageWrap}>
											<img
												src={product.mainImage}
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
