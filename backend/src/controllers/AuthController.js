const AuthService = require('../services/AuthService');

const AuthController = {
	login: async (req, res, next) => {
		const { credentials } = req.body;

		try {
			const { email, password } = credentials;

			const currentUser = await AuthService.userLogin(email, password);

			return res.status(201).json({
				message: '로그인 성공',
				currentUser,
			});
		} catch (err) {
			next(err);
		}
	},

	kakaoLogin: async (req, res, next) => {
		const { kakaoUser } = req.body;
		console.log('req: ', req.body);
		console.log('ku: ', kakaoUser);

		try {
			const { email, name } = kakaoUser;

			if ((!email, !name)) {
				throw new badRequestError('누락된 값이 있습니다.');
			}

			const currentUser = await AuthService.kakaoLogin({
				email,
				name,
			});

			return res.status(201).json({
				message: '카카오 로그인 성공',
				currentUser,
			});
		} catch (err) {
			next(err);
		}
	},
};

module.exports = AuthController;
