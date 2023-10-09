const express = require('express');
const UserController = require('../controllers/UserController');
// const VerifyToken = require('../middleware/VerifyToken');

const UserRouter = express.Router();

UserRouter.post('/users/signup', UserController.userSignup);
UserRouter.get('/users/signup/:email', UserController.emailOverlapCheck);

// 비밀번호 변경
UserRouter.post('/users', UserController.updatePassword);
UserRouter.patch('/users', UserController.updateUser);

// 회원 탈퇴
UserRouter.delete('/users', UserController.withdrawn);

// 회원 전체 정보 조회 => 이거 나중에 토큰으로만 받기
UserRouter.get('/users/:email', UserController.getUserInformation);

module.exports = UserRouter;
