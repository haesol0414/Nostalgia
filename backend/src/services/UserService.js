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
		return await User.findOne({ email }, { password: 0 });
	},

	// 연락처, 주소, 상세 주소 변경
	updateUser: async (userId, { updatedInfo }) => {
		await User.updateOne({ _id: userId }, { updatedInfo });
	},

	// 비밀번호 변경
	updatePassword: async (userId, password) => {
		await User.updateOne({ _id: userId }, { password: password });
	},

	withdrawn: async userId => {
		await User.updateOne({ userId }, { isDeleted: true });
	},
};

module.exports = UserService;
