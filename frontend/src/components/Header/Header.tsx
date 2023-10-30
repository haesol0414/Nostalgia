import React, { useState } from 'react';
import styles from './Header.module.scss';
import { isTokenAvailable } from '../../utils/authUtils';
import { useCookies } from 'react-cookie';

export default function Header() {
	const [showGenderCategories, setShowGenderCategories] = useState(false);
	const isLoggedIn = isTokenAvailable();
	const [, , removeCookie] = useCookies(['token']);

	const toggleGenderCategories = () => {
		setShowGenderCategories(!showGenderCategories);
	};

	const handleLogout = () => {
		removeCookie('token');
		alert('로그아웃');
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
							CATEGORY
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
					{/* <li>
						<div className={styles.category}>Brand</div>
					</li> */}
				</ul>

				<div className={styles.icons}>
					<li>
						{isLoggedIn ? (
							<button
								className={styles.logout}
								onClick={handleLogout}
							>
								Logout
							</button>
						) : (
							<a href="/login">Login</a>
						)}
					</li>
					<li>
						<a href="/admin">Admin</a>
					</li>
					<li>
						<a href="/account">My</a>
					</li>
					<li>
						<a href="/board">Board</a>
					</li>
					<li>
						<a href="/cart">Cart</a>
					</li>
				</div>
			</div>
		</section>
	);
}
