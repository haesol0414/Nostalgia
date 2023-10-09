import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Container from './components/Container/Container';
import Footer from './components/Footer/Footer';
import { RecoilRoot } from 'recoil';

function App() {
	return (
		<RecoilRoot>
			<Header />
			<Container>
				<Outlet />
			</Container>
			<Footer />
		</RecoilRoot>
	);
}

export default App;
