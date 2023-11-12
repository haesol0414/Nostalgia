const { mongoose, Schema } = require('mongoose');

const ProductSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	brand: {
		type: String,
		enum: [
			'chanel',
			'cucci',
			'dior',
			'hermes',
			'byredo',
			'jomalone',
			'diptyque',
		],
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
	concentration: {
		type: String,
		enum: ['오 드 코롱', '오 드 뚜왈렛', '오 드 빠르펭', '퍼퓸'],
	},
	description: {
		type: String,
		default: '',
	},
	currentAmount: {
		type: Number,
		default: 0,
	},
	salesAmount: {
		type: Number,
		default: 0,
	},
	mainImage: {
		type: [String],
	},
	hashTag: {
		type: String,
		enum: [
			'#플로럴',
			'#우디',
			'#머스크',
			'#스파이시',
			'#프루티',
			'#시트러스',
			'#달콤한',
			'#오리엔탈',
			'#허브',
		],
	},
});

const Product = mongoose.model('Product', ProductSchema, 'Product');

module.exports = Product;
