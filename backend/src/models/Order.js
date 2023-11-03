const { mongoose, Schema } = require('mongoose');

const OrderSchema = new Schema(
	{
		userId: {
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
		purchase: [
			{
				productId: {
					type: String,
				},
				title: {
					type: String,
				},
				brand: {
					type: String,
				},
				selectedSize: {
					type: Number,
				},
				cost: {
					type: Number,
				},
				concentration: {
					type: String,
				},
				mainImage: {
					type: Number,
				},
				orderAmount: {
					type: Number,
				},
				totalPrice: {
					type: Number,
				},
			},
		],
		shippingRequest: {
			type: String,
		},
		shippingFee: {
			type: Number,
			default: 0,
		},
		totalPayment: {
			type: Number,
		},
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
