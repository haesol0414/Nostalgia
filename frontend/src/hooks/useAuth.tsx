import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenAvailable } from '../utils/authUtils';

export function useAuth() {
	const navigate = useNavigate();
	const isLoggedIn = isTokenAvailable();

	useEffect(() => {
		if (!isLoggedIn) {
			alert('로그인이 필요한 페이지입니다.');
			navigate('/login');
		}
	}, []);
}
