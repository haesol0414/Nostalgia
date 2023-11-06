const express = require('express');
const OrderController = require('../controllers/OrderController');
const VerifyToken = require('../middleware/VerifyToken');

const OrderRouter = express.Router();

// 주문하기
OrderRouter.post('/orders', VerifyToken, OrderController.createOrder);

// // [회원] 배송지 조회
// OrderRouter.get(
// 	'/orders/checkAddress',
// 	VerifyToken,
// 	OrderController.checkAddress
// );

// // [회원] 배송지 추가(업데이트)
// OrderRouter.post('/orders/addAddress', VerifyToken, OrderController.addAddress);

// // [회원] 주문 내역 조회
// OrderRouter.get(
// 	'/orders/history',
// 	VerifyToken,
// 	OrderController.checkOrderHistory
// );

// // 주문 상세 조회
// OrderRouter.post('/orders/history/:orderId', OrderController.checkOrderDetail);

// // 주문 취소
// OrderRouter.patch('/orders/history/:orderId', OrderController.cancleOrder);

// // 배송 상태 변경
// OrderRouter.post(
// 	'/orders/:orderId',
// 	VerifyToken,
// 	OrderController.adminUpdateShippingStatus
// );

module.exports = OrderRouter;
