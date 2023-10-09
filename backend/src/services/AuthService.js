const User = require('../models/User');

const AuthService = {
	userLogin: async email => {
		return await User.findOne({ email });
	},
};

module.exports = AuthService;
