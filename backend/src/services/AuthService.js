const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {
	badRequestError,
	conflictError,
} = require('../middleware/ErrorHandler');

const AuthService = {
	userLogin: async (email, password) => {
		const searchedUser = await User.findOne({ email });
		if (searchedUser === null) {
			throw new badRequestError('존재하지 않는 아이디입니다.');
		}

		if (searchedUser.password !== password) {
			throw new conflictError('비밀번호가 일치하지 않습니다.');
		}

		const token = jwt.sign(
			{
				email: searchedUser.email,
				name: searchedUser.name,
				role: searchedUser.role,
			},
			process.env.JSONSECRETKEY,
			{
				expiresIn: '1h',
			}
		);

		return token;
	},

	kakaoLogin: async ({ email, name }) => {
		const user = await User.findOne({
			email: email,
		});

		if (!user) {
			const newUser = await User.create({
				email,
				name,
				platform: 'kakao',
			});

			const jwtToken = jwt.sign(
				{
					email: newUser.email,
					name: newUser.name,
					role: newUser.role,
				},
				process.env.JSONSECRETKEY,
				{
					expiresIn: '1h',
				}
			);

			return jwtToken;
		} else {
			const jwtToken = jwt.sign(
				{
					email: user.email,
					name: user.name,
					role: user.role,
				},
				process.env.JSONSECRETKEY,
				{
					expiresIn: '1h',
				}
			);

			return jwtToken;
		}
	},
};

module.exports = AuthService;
