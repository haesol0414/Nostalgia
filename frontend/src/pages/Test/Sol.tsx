/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from 'react';
import { styled } from 'styled-components';
// import AccountList from '../../components/AccountList/AccountList';
import QuantitySelector from '../../components/QuantitySelector/QuantitySelector';
import OrderList from '../../components/OrderList/OrderList';
import OrderProductList from '../../components/OrderProductList/OrderProductList';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import KaKaoLoginButton from '../../components/KaKaoLogin/KaKaoLoginButton';

// 컴포넌트 테스트용
export default function Sol() {
	return (
		<>
			<TestSection>
				{/* <LoadingSpinner /> */}
				<KaKaoLoginButton />
			</TestSection>
		</>
	);
}

const TestSection = styled.section`
	margin: 5% 0;
	display: flex;
	flex-direction: column;
	gap: 30px;
`;
