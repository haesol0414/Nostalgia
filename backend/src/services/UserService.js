const { badRequestError } = require('../middleware/ErrorHandler');
const User = require('../models/User');

const UserService = {
	userSignup: async ({ email, name, password, phone }) => {
		await User.create({
			email,
			name,
			password,
			phone,
		});
	},

	// 회원 정보 조회
	getUserInformation: async email => {
		return await User.findOne({ email: email }, { password: 0 });
	},

	// 연락처, 주소, 상세 주소 변경
	updateUser: async (email, newPhone, city, detail, zipCode) => {
		await User.updateOne(
			{ email: email },
			{
				phone: newPhone,
				'address.city': city,
				'address.detail': detail,
				'address.zipCode': zipCode,
			}
		);
	},

	// 맞춤 정보 변경 email, gender, prefrence
	updatePreference: async (email, gender, preference) => {
		await User.updateOne(
			{ email: email },
			{
				gender: gender,
				preference: preference,
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
