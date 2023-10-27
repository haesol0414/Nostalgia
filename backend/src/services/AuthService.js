const User = require('../models/User');
const jwt = require('jsonwebtoken');

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
};

module.exports = AuthService;
