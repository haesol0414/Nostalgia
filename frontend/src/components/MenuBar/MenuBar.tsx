import React from 'react';
import styles from './MenuBar.module.scss';

interface MenuBarProps {
	title: string;
	linkTo: string;
}

export default function MenuBar({ title, linkTo }: MenuBarProps) {
	return (
		<>
			<ul>
				<li>
					<div className={styles.menuBar}>
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
