const { mongoose, Schema } = require('mongoose');

const ReviewSchema = new Schema(
	{
		productId: {
			type: Schema.Types.ObjectId,
			ref: 'Product',
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		text: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
		},
	},
	{
		timestamps: { createdAt: 'reviewDate', updatedAt: 'updatedDate' },
	}
);

const Review = mongoose.model('Review', ReviewSchema, 'Review');

module.exports = Review;
