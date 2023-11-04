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
import Sol from './pages/Test/Sol';
import ByGender from './pages/Products/ByGender';
import Admin from './pages/Admin/Admin';
import ProductDetails from './pages/Products/ProductDetails';
import UserDetails from './pages/Account/UserDetails';
import Account from './pages/Account/Account';
import OrderHistory from './pages/Account/OrderHistory';
import AddProduct from './pages/Admin/AddProduct';
import Board from './pages/Board/Board';
import Cart from './pages/Cart/Cart';
import Order from './pages/Order/Order';
import UpdateProduct from './pages/Admin/UpdateProduct';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <Error />,
		children: [
			{ index: true, path: '/', element: <Home /> },
			{ index: true, path: '/login', element: <Login /> },
			{ index: true, path: '/test', element: <Sol /> },
			{ index: true, path: '/sign-up', element: <SignUp /> },
			{
				index: true,
				path: '/products/gender/:gender',
				element: <ByGender />,
			},

			{ index: true, path: '/admin', element: <Admin /> },
			{
				index: true,
				path: '/products/:productId',
				element: <ProductDetails />,
			},
			{ index: true, path: '/account', element: <Account /> },
			{
				index: true,
				path: '/account/personal-details',
				element: <UserDetails />,
			},
			{
				index: true,
				path: '/account/orders',
				element: <OrderHistory />,
			},
			{
				index: true,
				path: '/admin/add-product',
				element: <AddProduct />,
			},
			{
				index: true,
				path: '/board',
				element: <Board />,
			},
			{
				index: true,
				path: '/cart',
				element: <Cart />,
			},
			{
				index: true,
				path: '/orders',
				element: <Order />,
			},
			{
				index: true,
				path: '/admin/products/:productId',
				element: <UpdateProduct />,
			},
		],
	},
]);
const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);
root.render(
	<CookiesProvider>
		<RouterProvider router={router} />
	</CookiesProvider>,
);

reportWebVitals();
