import { atom } from 'recoil';
import { User } from '../assets/interface';

export const userState = atom<User | null>({
	key: 'userState',
	default: null, // 로그인 안된 경우, 초기값을 null로 설정
});
