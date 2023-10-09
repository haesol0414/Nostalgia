const { mongoose, Schema } = require('mongoose');

const ProductSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	brand: {
		type: String,
		enum: ['chanel', 'cucci', 'dior', 'hermes', 'byredo', 'jomalone'],
		required: true,
	},
	gender: {
		type: String,
		enum: ['man', 'woman', 'genderless'],
		required: true,
	},
	priceBySize: [
		{
			size: {
				type: Number,
				required: true,
			},
			price: {
				type: Number,
				required: true,
			},
		},
	],
	discount: {
		type: Number,
	},
	concentration: {
		type: String,
		enum: ['오 드 코롱', '오 드 뚜왈렛', '오 드 빠르펭', '퍼퓸'],
	},
	discription: {
		type: String,
		default: '',
	},
	currentAmount: {
		type: Number,
		default: 100,
	},
	salseAmount: {
		type: Number,
		default: 0,
	},
	mainImageUrl: {
		type: [String],
	},
	detailImageUrl: {
		type: String,
	},
	hashtag: {
		type: [Schema.Types.ObjectId],
		ref: 'Hashtag',
	},
});

const Product = mongoose.model('Product', ProductSchema, 'Product');

module.exports = Product;
