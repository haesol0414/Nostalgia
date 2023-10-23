const jwt = require('jsonwebtoken');
const { unauthorizedError } = require('./ErrorHandler');

const VerifyToken = async (req, res, next) => {
	const token = await req.header('Authorization').replace('Bearer ', '');

	try {
		if (!token) {
			throw new unauthorizedError('로그인한 유저만 사용 가능합니다.');
		}

		try {
			const verified = jwt.verify(token, process.env.JSONSECRETKEY);
			const currentUserEmail = verified.email;
			const currentUserName = verified.name;
			const currentUserRole = verified.role;

			req.currentUserEmail = currentUserEmail;
			req.currentUserName = currentUserName;
			req.currentUserRole = currentUserRole;

			next();
		} catch (err) {
			res.status(403).json({ message: '정상적인 토큰이 아닙니다.' });
		}
	} catch (err) {
		res.status(400).json({ message: '로그인한 유저만 사용 가능합니다.' });
	}
};

module.exports = VerifyToken;
