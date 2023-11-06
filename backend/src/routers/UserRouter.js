const express = require('express');
const UserController = require('../controllers/UserController');
const VerifyToken = require('../middleware/VerifyToken');

const UserRouter = express.Router();

UserRouter.post('/users/signup', UserController.userSignup);
UserRouter.get('/users/signup/:email', UserController.emailOverlapCheck);

// 회원 정보 조회 => 이거 나중에 토큰으로만 받기
UserRouter.get('/users', VerifyToken, UserController.getUserInformation);

// 비밀번호 변경
UserRouter.post('/users/password', VerifyToken, UserController.updatePassword);

// 내 정보 변경
UserRouter.patch('/users', VerifyToken, UserController.updateUser);

// 맞춤 정보 변경
UserRouter.post(
	'/users/preference',
	VerifyToken,
	UserController.updatePreference
);

// 회원 탈퇴
UserRouter.delete('/users', VerifyToken, UserController.withdrawn);

module.exports = UserRouter;
