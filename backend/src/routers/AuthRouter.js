const express = require('express');
const AuthController = require('../controllers/AuthController');

const AuthRouter = express.Router();

AuthRouter.post('/login', AuthController.login);

AuthRouter.post('/users/login/kakao', AuthController.kakaoLogin);

module.exports = AuthRouter;
