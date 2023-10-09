import React from 'react';
import { ReactNode } from 'react';
import styles from './Container.module.scss';

interface ContainerProps {
	children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
	return <section className={styles.container}>{children}</section>;
}
