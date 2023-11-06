const UserService = require('../services/UserService');
const User = require('../models/User');
const {
	badRequestError,
	conflictError,
} = require('../middleware/ErrorHandler');

const UserController = {
	userSignup: async (req, res, next) => {
		const { newUser } = req.body;

		try {
			const { email, name, password } = newUser;

			const isUser = await User.findOne({ email: email });
			if (isUser) {
				throw new badRequestError('이미 가입된 이메일입니다.');
			}

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
		const email = req.currentUserEmail;

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

	updateUser: async (req, res, next) => {
		const email = req.currentUserEmail;
		const { newPhone, newAddress } = req.body;

		try {
			const { city, detail, zipCode } = newAddress;

			if (!city || !detail || !zipCode || !phone) {
				throw new badRequestError('누락된 값이 있습니다.');
			}

			await UserService.updateUser(
				email,
				newPhone,
				city,
				detail,
				zipCode
			);

			return res.status(200).json({
				message: '회원 정보 수정 성공',
			});
		} catch (err) {
			next(err);
		}
	},

	updatePassword: async (req, res, next) => {
		const email = req.currentUserEmail;
		const { newPassword } = req.body;

		try {
			if (!newPassword) {
				throw new badRequestError('누락된 값이 있습니다.');
			}

			await UserService.updatePassword(email, newPassword);

			return res.status(201).json({
				message: '비밀번호 변경 성공',
			});
		} catch (err) {
			next(err);
		}
	},

	updatePreference: async (req, res, next) => {
		const email = req.currentUserEmail;
		const { newPreference } = req.body;

		try {
			if (!newPreference) {
				throw new badRequestError('누락된 값이 있습니다.');
			}

			const { gender, prefrence } = newPreference;

			await UserService.updatePreference(email, gender, prefrence);

			return res.status(201).json({
				message: '맞춤 정보 변경 성공',
			});
		} catch (err) {
			next(err);
		}
	},

	withdrawn: async (req, res, next) => {
		const email = req.currentUserEmail;

		try {
			await UserService.withdrawn(email);

			return res.status(200).json({
				message: '회원 탈퇴 성공',
			});
		} catch (err) {
			next(err);
		}
	},
};

module.exports = UserController;
