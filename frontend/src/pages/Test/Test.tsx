/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import LargeButton from '../../components/Button/LargeButton';
import Input from '../../components/Input/Input';
import Depth01 from '../../components/ImageList/Depth01';
import { styled } from 'styled-components';

export default function Test() {
	return (
		<TestSection>
			{/* <LargeButton text="LargeButton"></LargeButton> */}
			{/* <Input type="text" placeholder="이메일"></Input> */}
			{/* <Depth01></Depth01> */}
		</TestSection>
	);
}

const TestSection = styled.section`
	margin: 5% 0;
	display: flex;
	flex-direction: column;
	gap: 30px;
`;
