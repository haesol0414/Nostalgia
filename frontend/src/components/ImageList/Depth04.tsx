import React, { useEffect, useState } from 'react';
import styles from './Depth04.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import BlackButton from '../Button/BlackButton';
import { useAuth } from '../../hooks/useAuth';
import {
	getUserDetails,
	getUserPreferenceProducts,
} from '../../utils/apiRequests';
import { User, UserPreference } from '../../model/user';
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

interface UserDetailResponse {
	message: string;
	user: User;
}

interface UserPreferenceResponse {
	message: string;
	userPreferences: Product[];
}

export default function Depth04({ mainTitle, subTitle, productList }: Props) {
	const navigate = useNavigate();
	const [hasPreference, setHasPreference] = useState<boolean>(false);
	const [userPreference, setUserPreference] = useState<UserPreference>({
		gender: '',
		preference: '',
	});
	const [preferredProducts, setPreferredProducts] = useState<Product[]>();

	const isLoggedIn = isTokenAvailable();

	const guestNavigateLogin = () => {
		navigate('/login');
	};
	const userNavigateAccount = () => {
		navigate('/account/personal-details');
	};

	// 유저 정보 조회
	const getUserInformation = async () => {
		try {
			console.log('유저정보조회');
			const response = await getUserDetails<UserDetailResponse>();

			if (response.data.user) {
				setUserPreference({
					gender: response.data.user.gender,
					preference: response.data.user.preference,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	// 둘 중 하나라도 빈문자열이 아닐 경우 (설정되어 있을 경우) usePreference로 백엔드 api 전송
	const getUserPreferredProducts = async () => {
		setHasPreference(true);

		console.log('유저선호에 맞는 상품 조회');
		try {
			const response =
				await getUserPreferenceProducts<UserPreferenceResponse>(
					userPreference,
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
			getUserInformation();
		}
	}, [isLoggedIn]);

	useEffect(() => {
		if (userPreference.gender !== '' && userPreference.preference !== '') {
			getUserPreferredProducts();
		}
	}, [userPreference]);

	return (
		<section className={styles.dep04}>
			<div>
				<div className={styles.title}>
					<h2 className={styles.mainTitle}>{mainTitle}</h2>
					<p className={styles.subTitle}>{subTitle}</p>
				</div>

				{isLoggedIn && hasPreference && preferredProducts ? (
					<ul>
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
