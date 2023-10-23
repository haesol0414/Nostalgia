/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { styled } from 'styled-components';
// import AccountList from '../../components/AccountList/AccountList';
import OrderList from '../../components/OrderList/OrderList';

export default function Test() {
	return (
		<TestSection>
			<OrderList
				orderDate="20210808"
				orderNumber="1234567"
				detailLink="/"
			></OrderList>
		</TestSection>
	);
}

const TestSection = styled.section`
	margin: 5% 0;
	display: flex;
	flex-direction: column;
	gap: 30px;
`;
