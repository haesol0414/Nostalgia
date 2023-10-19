import React, { useState } from 'react';
import styles from './Header.module.scss';
import { useCookies } from 'react-cookie';
import { hasToken } from '../../utils/hasToken';

export default function Header() {
	const [showGenderCategories, setShowGenderCategories] = useState(false);
	const isLoggedIn = hasToken();
	const [, , removeCookie] = useCookies(['authToken']);

	const toggleGenderCategories = () => {
		setShowGenderCategories(!showGenderCategories);
	};

	const logoutUser = () => {
		removeCookie('authToken');
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
							Gender
						</div>
						{showGenderCategories && (
							<div className={styles.backdrop}>
								<div className={styles.subCategories}>
									<a href="/categories/gender/man">Man</a>
									<a href="/categories/gender/woman">Woman</a>
									<a href="/categories/gender/genderless">
										Genderless
									</a>
								</div>
							</div>
						)}
					</li>
					<li>
						<div className={styles.category}>Brand</div>
					</li>
				</ul>

				<div className={styles.icons}>
					<li>
						{isLoggedIn ? (
							<button
								className={styles.logout}
								onClick={logoutUser}
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
						<a href="/">Community</a>
					</li>
					<li>
						<a href="/">Cart</a>
					</li>
				</div>
			</div>
		</section>
	);
}
