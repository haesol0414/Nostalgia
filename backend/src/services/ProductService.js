const Category = require('../models/Category');
const Product = require('../models/Product');

const ProductService = {
	// [관리자] 상품 추가
	addProducts: async ({ product }) => {
		return await Product.create(product);
	},

	// 전체 상품 조회
	getAllProducts: async () => {
		return await Product.find({}).sort({ _id: -1 });
	},

	// [관리자] 상품 수정
	updateProducts: async (
		_id,
		title,
		brand,
		gender,
		concentration,
		priceBySize,
		description,
		currentAmount,
		mainImage
	) => {
		await Product.updateOne(
			{ _id: _id },
			{
				title: title,
				brand: brand,
				gender: gender,
				concentration: concentration,
				priceBySize: productBySize,
				description: description,
				currentAmount,
				mainImage: mainImage,
			}
		);
	},

	// [관리자] 상품 삭제
	deleteProducts: async selectedProductId => {
		await Product.deleteOne({ _id: selectedProductId });
	},

	// 인기 상품 4개 조회
	getBestProducts: async () => {
		return await Product.find({}).sort({ salesAmount: -1 }).limit(4);
	},

	// 신규 상품 4개 조회
	getNewestProducts: async () => {
		return await Product.find({}).sort({ _id: -1 }).limit(4);
	},

	// 성별 카테고리별 베스트 제품 조회
	getBestProductsByGender: async () => {
		const womanBest = await Product.findOne({ gender: 'woman' })
			.sort({ salesAmount: -1 })
			.limit(1);
		const manBest = await Product.findOne({ gender: 'man' })
			.sort({ salesAmount: -1 })
			.limit(1);
		const genderlessBest = await Product.findOne({ gender: 'genderless' })
			.sort({ salesAmount: -1 })
			.limit(1);

		return { womanBest, manBest, genderlessBest };
	},

	// 성별 카테고리별 제품 조회
	getProductsByGender: async gender => {
		return await Product.find({ gender: gender });
	},

	// 브랜드별 제품 조회
	getProductsByBrand: async brand => {
		return await Product.find({ brand: brand });
	},

	// 상품 상세 조회
	getProductById: async productId => {
		const productInfo = await Product.findOne({ _id: productId });

		return productInfo;
	},
};

module.exports = ProductService;
