const { mongoose, Schema } = require('mongoose');

const CouponSchema = new Schema({
	couponCode: {
		type: String,
		required: true,
	},
	couponName: {
		type: String,
		required: true,
	},
	discountAmount: {
		type: Number,
		required: true,
	},
	validFrom: {
		type: Date,
		default: Date.now,
	},
	validUntil: {
		type: Date,
	},
});

const Coupon = mongoose.model('Coupon', CouponSchema, 'Coupon');

module.exports = Coupon;
