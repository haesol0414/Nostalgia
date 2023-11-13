import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Container from './components/Container/Container';
import Footer from './components/Footer/Footer';

function App() {
	return (
		<>
			<Header />
			<Container>
				<Outlet />
			</Container>
			<Footer />
		</>
	);
}

export default App;
