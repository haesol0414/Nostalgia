import { useCookies } from 'react-cookie';

// 쿠키에 토큰이 있는지 확인하는 함수
export const isTokenAvailable = () => {
	const [cookies] = useCookies(['token']);
	return !!cookies.token;
};

// 쿠키의 토큰을 가져오는 함수
export const getToken = (): string => {
	const cookies: Record<string, string> = document.cookie
		.split('; ')
		.reduce((acc: Record<string, string>, cookie: string) => {
			const [name, value] = cookie.split('=');
			acc[name] = value;
			return acc;
		}, {});

	return cookies.token;
};
