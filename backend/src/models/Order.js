const { mongoose, Schema } = require('mongoose');

const OrderSchema = new Schema(
	{
		userEmail: {
			type: String,
			required: true,
		},
		recipient: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		// address: {
		// 	type: [Schema.Types.ObjectId],
		// 	ref: 'Coupon',
		// },
		// detailAddress: {
		// 	type: String,
		// 	enum: ['admin', 'customer'],
		// 	default: 'customer',
		// },
		shippingRequest: {
			type: String,
		},
		purchase: [
			{
				product: {
					type: [Schema.Types.ObjectId],
					ref: 'Product',
				},
				quantity: {
					type: Number,
					required: true,
				},
			},
		],
		// discountCost: {
		// 	type: Number,
		// },
		shippingFee: {
			type: Number,
			default: 0,
		},
		totalPrice: {
			type: Number,
		},
		// payMethod: {
		// 	type: String,
		// 	enum: ['무통장 입금', '신용 카드', '휴대폰 결제'],
		// },
		orderStatus: {
			type: String,
			enum: ['상품 준비 중', '배송 중', '배송 완료', '주문 취소'],
			default: '상품 준비 중',
		},
	},
	{
		timestamps: { createdAt: 'orderDate', updatedAt: 'updateDate' },
	}
);

const Order = mongoose.model('Order', OrderSchema, 'Order');

module.exports = Order;
