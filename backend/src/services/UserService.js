const { badRequestError } = require('../middleware/ErrorHandler');
const User = require('../models/User');

const UserService = {
	userSignup: async ({ email, name, password }) => {
		await User.create({
			email,
			name,
			password,
		});
	},

	// 회원 정보 조회
	getUserInformation: async email => {
		return await User.findOne({ email: email }, { password: 0 });
	},

	// 연락처, 주소, 상세 주소 변경
	updateUser: async (email, phone, city, detail) => {
		await User.updateOne(
			{ email: email },
			{
				phone: phone,
				'address.city': city,
				'address.detail': detail,
			}
		);
	},

	// 비밀번호 변경
	updatePassword: async (email, newPassword) => {
		await User.updateOne(
			{ email: email },
			{ password: newPassword.password }
		);
	},

	// 회원 탈퇴
	withdrawn: async email => {
		await User.deleteOne({ email: email });
	},
};

module.exports = UserService;
