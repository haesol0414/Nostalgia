const Category = require('../models/Category');
const Product = require('../models/Product');

const ProductService = {
	// [관리자] 상품 추가
	addProducts: async ({ productInfo }) => {
		await Product.create(productInfo);
	},

	// [관리자] 상품 수정
	// updateProducts: async (
	// 	itemId,
	// 	{
	// 		title,
	// 		price,
	// 		manufacturer,
	// 		description,
	// 		currentAmount,
	// 		salesAmount,
	// 		category,
	// 		imageURL,
	// 		detailImageURL,
	// 	}
	// ) => {
	// 	await Product.updateOne(
	// 		{ _id: itemId },
	// 		{
	// 			title: title,
	// 			price: price,
	// 			manufacturer: manufacturer,
	// 			description: description,
	// 			currentAmount: currentAmount,
	// 			salesAmount: salesAmount,
	// 			category: category,
	// 			imageURL: imageURL,
	// 			detailImageURL: detailImageURL,
	// 		}
	// 	);
	// },

	// [관리자] 상품 삭제
	deleteProducts: async productId => {
		await Product.deleteOne({ _id: productId });
	},

	// 전체 상품 조회
	getAllProducts: async () => {
		return await Product.find({}).sort({ _id: -1 }).populate('category');
	},

	// 전체 상품 중 인기 상품 4개까지 조회
	getBestProducts: async () => {
		return await Product.find({}).sort({ salesAmount: -1 }).limit(4);
	},

	// (성별) 카테고리별 제품 조회
	getProductsByCategory: async category => {
		return await Product.find({ category: category }).populate('category');
	},

	// (브랜드) 카테고리별 제품 조회
	// getProductsByCategory: async category => {
	// 	return await Product.find({ category: category }).populate('category');
	// },

	// 상품 상세 조회
	getProductById: async productId => {
		const product = await Product.findOne({ _id: productId }).populate(
			'category'
		);

		return product;
	},
};

module.exports = ProductService;
