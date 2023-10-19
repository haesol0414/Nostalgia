/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { styled } from 'styled-components';
import AccountList from '../../components/AccountList/AccountList';

export default function Test() {
	return (
		<TestSection>
			<AccountList title="나의 정보" linkTo="/"></AccountList>
		</TestSection>
	);
}

const TestSection = styled.section`
	margin: 5% 0;
	display: flex;
	flex-direction: column;
	gap: 30px;
`;
