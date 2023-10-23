import { useCookies } from 'react-cookie';

export const isTokenAvailable = () => {
	const [cookies] = useCookies(['token']);
	return !!cookies.token;
};

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
