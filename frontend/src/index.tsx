import React from 'react';
import ReactDOM from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './assets/styles/global.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Error from './pages/Error/Error';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Test from './pages/Test/Test';
import ByGender from './pages/Products/ByGender';
import Admin from './pages/Admin/Admin';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import MyPage from './pages/MyPage/MyPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <Error />,
		children: [
			{ index: true, path: '/', element: <Home /> },
			{ index: true, path: '/login', element: <Login /> },
			{ index: true, path: '/test', element: <Test /> },
			{ index: true, path: '/signup', element: <SignUp /> },
			{
				index: true,
				path: '/categories/gender/:categoryName',
				element: <ByGender />,
			},

			{ index: true, path: '/admin', element: <Admin /> },
			{
				index: true,
				path: '/products/:productId',
				element: <ProductDetails />,
			},
			{ index: true, path: '/mypage', element: <MyPage /> },
		],
	},
]);
const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);
root.render(
	<React.StrictMode>
		<CookiesProvider>
			<RouterProvider router={router} />
		</CookiesProvider>
	</React.StrictMode>,
);

reportWebVitals();
