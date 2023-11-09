const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

const OrderService = {
	// 주문하기
	createOrder: async (email, newOrder) => {
		const orderInformation = {
			email: email,
			recipient: newOrder.recipient,
			phone: newOrder.phone,
			shippingAddress: newOrder.shippingAddress,
			purchase: newOrder.purchase,
			shippingRequest: newOrder.shippingRequest,
			shippingFee: newOrder.shippingFee,
			totalProductPrice: newOrder.totalProductPrice,
			totalPayment: newOrder.totalPayment,
		};

		// salesAmount, currentAmount Update
		newOrder.purchase.map(async product => {
			await Product.updateOne(
				{ _id: product._id },
				{
					$inc: {
						salesAmount: product.orderAmount,
						currentAmount: -product.orderAmount,
					},
				}
			);
		});

		return await Order.create(orderInformation);
	},

	// [회원] 배송지 확인
	checkAddress: async email => {
		const address = await User.find(
			{ email: email },
			{ _id: 0, addressInformation: 1 }
		);

		return address;
	},

	// [회원] 주문 내역 전체 조회
	checkOrderHistory: async email => {
		return await Order.find(
			{ email: email },
			{ _id: 1, orderDate: 1 }
		).sort({ _id: -1 });
	},

	// 전체 주문 조회
	getAllOrder: async () => {
		return await Order.find({}).sort({ _id: -1 });
	},

	// 주문 상세 조회
	checkOrderDetail: async orderNumber => {
		return await Order.findOne({ _id: orderNumber });
	},

	// [회원] 기본 배송지 설정
	addAddress: async (email, addressInformation) => {
		await User.updateOne(
			{ email: email },
			{ addressInformation: addressInformation }
		);
	},

	// 주문 취소
	cancleOrder: async (orderId, { purchase }) => {
		await Order.updateOne(
			{ _id: orderId },
			{ shippingStatus: '주문 취소' }
		);
		purchase.map(async product => {
			await Product.updateOne(
				{ _id: product.productId },
				{
					$inc: {
						salesAmount: -product.orderAmount,
						currentAmount: product.orderAmount,
					},
				}
			);
		});
	},

	// 배송 상태 변경
	updateShippingStatus: async (orderId, shippingStatus) => {
		await Order.updateOne(
			{ _id: orderId },
			{ shippingStatus: shippingStatus }
		);
	},
};

module.exports = OrderService;
