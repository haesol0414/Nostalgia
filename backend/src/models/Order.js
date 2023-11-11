const { mongoose, Schema } = require('mongoose');

const OrderSchema = new Schema(
	{
		email: {
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
		shippingAddress: {
			city: {
				type: String,
			},
			detail: {
				type: String,
			},
			zipCode: {
				type: String,
			},
		},
		purchase: [
			{
				_id: {
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
					type: String,
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
			default: '',
		},
		shippingFee: {
			type: Number,
			default: 0,
		},
		totalProductPrice: {
			type: Number,
		},
		totalPayment: {
			type: Number,
		},
		payMethod: {
			type: String,
			enum: ['카드 결제', '무통장 입금'],
			defulat: '카드 결제',
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
