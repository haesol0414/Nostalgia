const UserService = require('../services/UserService');
const User = require('../models/User');
const {
	badRequestError,
	conflictError,
} = require('../middleware/ErrorHandler');

const UserController = {
	userSignup: async (req, res, next) => {
		const { email, name, password } = req.body;

		try {
			await UserService.userSignup({ email, name, password });

			return res.status(201).json({
				message: '가입 완료',
			});
		} catch (err) {
			next(err);
		}
	},

	emailOverlapCheck: async (req, res, next) => {
		const { email } = req.params;

		try {
			const searchedEmail = await User.findOne({ email: email });

			if (searchedEmail) {
				throw new badRequestError('이미 가입된 이메일입니다.');
			}

			return res.status(200).json({
				message: '사용 가능한 email입니다.',
			});
		} catch (err) {
			next(err);
		}
	},

	getUserInformation: async (req, res, next) => {
		const { email } = req.params;

		try {
			const user = await UserService.getUserInformation(email);

			return res.status(200).json({
				message: '회원 정보 조회 완료',
				user,
			});
		} catch (err) {
			next(err);
		}
	},

	updatePassword: async (req, res, next) => {
		const { userId, password } = req.body;

		try {
			if (!userId || !password) {
				throw new badRequestError('누락된 값이 있습니다.');
			}

			await UserService.updatePassword(userId, password);

			return res.status(200).json({
				message: '비밀번호 변경 성공',
			});
		} catch (err) {
			next(err);
		}
	},

	updateUser: async (req, res, next) => {
		const { userId, updatedInfo } = req.body;

		try {
			await UserService.updateUser(email);

			return res.status(200).json({
				message: '회원 정보 수정 성공',
			});
		} catch (err) {
			next(err);
		}
	},

	withdrawn: async (req, res, next) => {
		const { userId } = req.body;

		try {
			await UserService.withdrawn(userId);

			return res.status(200).json({
				message: '회원 탈퇴 성공',
			});
		} catch (err) {
			next(err);
		}
	},
};

module.exports = UserController;
