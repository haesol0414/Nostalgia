import React, { useState } from 'react';
import styles from './Header.module.scss';
import { isTokenAvailable } from '../../utils/authUtils';
import { useCookies } from 'react-cookie';
import { BsPerson } from '@react-icons/all-files/bs/BsPerson';
import { FiShoppingCart } from '@react-icons/all-files/fi/FiShoppingCart';

import { useNavigate } from 'react-router-dom';

export default function Header() {
	const navigate = useNavigate();
	const [showGenderCategories, setShowGenderCategories] = useState(false);
	const [showUserMenu, setShowUserMenu] = useState(false);
	const isLoggedIn = isTokenAvailable();
	const [, , removeCookie] = useCookies(['token']);

	const toggleGenderCategories = () => {
		setShowGenderCategories(!showGenderCategories);
	};

	const handleLogout = () => {
		removeCookie('token');
		sessionStorage.removeItem('user');
		sessionStorage.removeItem('userPreference');
		alert('로그아웃');

		navigate('/');
	};

	const toggleUserMenu = () => {
		setShowUserMenu(!showUserMenu);
	};

	return (
		<section className={styles.headerSection}>
			<div className={styles.inner}>
				<a href="/">
					<h1>Nostalgia</h1>
				</a>
				<ul className={styles.nav}>
					<li>
						<div
							className={styles.category}
							onClick={toggleGenderCategories}
						>
							Perfumes
						</div>
						{showGenderCategories && (
							<div className={styles.backdrop}>
								<div className={styles.subCategories}>
									<a href="/products/gender/man">Man</a>
									<a href="/products/gender/woman">Woman</a>
									<a href="/products/gender/genderless">
										Genderless
									</a>
								</div>
							</div>
						)}
					</li>
				</ul>

				<ul className={styles.icons}>
					<li>
						<div
							className={styles.userMenu}
							onClick={toggleUserMenu}
						>
							<BsPerson size={22} style={{ cursor: 'pointer' }} />
							{showUserMenu && (
								<div className={styles.userDropdown}>
									{isLoggedIn ? (
										<>
											<a
												className={styles.dropdownMenu}
												href="/account"
											>
												My
											</a>
											<button
												className={styles.dropdownMenu}
												onClick={handleLogout}
											>
												Logout
											</button>
										</>
									) : (
										<>
											<a
												className={styles.dropdownMenu}
												href="/login"
											>
												Login
											</a>
											<a
												className={styles.dropdownMenu}
												href="/sign-up"
											>
												SignUp
											</a>
										</>
									)}
								</div>
							)}
						</div>
					</li>
					<li>
						<button
							onClick={() => {
								navigate('/cart');
							}}
							aria-label="Go to Cart"
						>
							<FiShoppingCart size={20} color={'white'} />
						</button>
					</li>
				</ul>
			</div>
		</section>
	);
}
