const AuthService = require('../services/AuthService');
const {
	badRequestError,
	conflictError,
} = require('../middleware/ErrorHandler');

const AuthController = {
	login: async (req, res, next) => {
		const { credentials } = req.body;

		try {
			const { email, password } = credentials;
			const token = await AuthService.userLogin(email, password);

			return res.status(201).json({
				message: '로그인 성공',
				token,
			});
		} catch (err) {
			next(err);
		}
	},
};

module.exports = AuthController;
