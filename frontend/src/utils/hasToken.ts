import { useCookies } from 'react-cookie';

export function hasToken(): boolean {
	const [cookies] = useCookies(['authToken']);
	return !!cookies.authToken;
}
