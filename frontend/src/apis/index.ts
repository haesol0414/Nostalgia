import axios from 'axios';
// 나중에 지울 폴더

const allowMethod: string[] = ['get', 'post', 'put', 'patch', 'delete'];

axios.defaults.baseURL = 'http://localhost:4026/api';

interface AxiosRequest {
	requestAxios: <T>(method: string, url: string, data?: object) => Promise<T>;
}

const axiosRequest: AxiosRequest = {
	requestAxios: async <T>(method: string, url: string, data = {}) => {
		if (!allowMethod.includes(method.toLowerCase()))
			throw new Error('허용되지 않은 호출 method입니다.');

		try {
			const response = await axios({
				method,
				url: `${axios.defaults.baseURL}${url}`,
				data,
			});

			return response as T;
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
};

export default axiosRequest;
