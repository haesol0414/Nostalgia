import React from 'react';
import styles from './AccountList.module.scss';

interface AccountListProps {
	title: string;
	linkTo: string;
}

export default function AccountList({ title, linkTo }: AccountListProps) {
	return (
		<>
			<ul>
				<li>
					<div className={styles.accountList}>
						<a href={linkTo}>
							<span>{title}</span>
						</a>
						<p>+</p>
					</div>
				</li>
			</ul>
		</>
	);
}
