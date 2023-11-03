/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from 'react';
import { styled } from 'styled-components';
// import AccountList from '../../components/AccountList/AccountList';
import QuantitySelector from '../../components/QuantitySelector/QuantitySelector';
import OrderList from '../../components/OrderList/OrderList';

// 컴포넌트 테스트용
export default function Sol() {

	return (
		<TestSection>
			{/* <OrderList
				orderDate="20210808"
				orderNumber="1234567"
				detailLink="/"
			></OrderList> */}
			<QuantitySelector
				quantity={1}
				onIncrease={() => {}}
				onDecrease={() => {}}
			></QuantitySelector>
		</TestSection>
	);
}

const TestSection = styled.section`
	margin: 5% 0;
	display: flex;
	flex-direction: column;
	gap: 30px;
`;
