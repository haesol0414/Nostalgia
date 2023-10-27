const ProductService = require('../services/ProductService');
const {
	badRequestError,
	unauthorizedError,
	notFoundError,
} = require('../middleware/ErrorHandler');

const ProductController = {
	// [관리자] 상품 추가
	addProducts: async (req, res, next) => {
		// const role = req.currentUserRole;
		const { product } = req.body;

		try {
			// if (role !== 'admin') {
			// 	throw new unauthorizedError('관리자만 접근이 가능합니다.');
			// }

			console.log('ctr');
			await ProductService.addProducts({
				product,
			});

			res.status(201).json({
				message: '[관리자] 상품 추가 성공',
			});
		} catch (err) {
			next(err);
		}
	},

	// [관리자] 전체 상품 조회
	getAllProducts: async (req, res, next) => {
		try {
			const totalProducts = await ProductService.getAllProducts();

			return res.status(200).json({
				message: '전체 상품 조회 성공',
				totalProducts,
			});
		} catch (err) {
			next(err);
		}
	},

	// [관리자] 상품 수정
	updateProducts: async (req, res, next) => {
		const role = req.currentUserRole;
		const { updatedProduct } = req.body;

		try {
			if (role !== 'admin') {
				throw new unauthorizedError('관리자만 접근이 가능합니다.');
			}

			const {
				_id,
				title,
				brand,
				gender,
				concentration,
				priceBySize,
				description,
				currentAmount,
				mainImage,
				detailImage,
			} = updatedProduct;

			// priceBySize 어떻게 처리

			await AdminService.updateProducts(itemId, {
				title,
				price,
				manufacturer,
				description,
				currentAmount,
				salesAmount,
				category,
				imageURL,
				detailImageURL,
			});

			res.status(200).json({
				message: '[관리자] 상품 수정 성공',
			});
		} catch (err) {
			next(err);
		}
	},

	// [관리자] 상품 삭제
	deleteProducts: async (req, res, next) => {
		const role = req.currentUserRole;
		const { _id } = req.body;

		try {
			if (role !== 'admin') {
				throw new unauthorizedError('관리자만 접근이 가능합니다.');
			}

			await AdminService.deleteProducts(_id);

			res.status(200).json({
				message: '[관리자] 상품 삭제 성공',
			});
		} catch (err) {
			next(err);
		}
	},

	// (성별) 카테고리별 상품 조회
	getProductsByGender: async (req, res, next) => {
		const { gender } = req.params;

		try {
			const productsByGender = await ProductService.getProductsByGender(
				gender
			);

			res.status(200).json({
				message: '성별 카테고리별 제품 조회 성공',
				productsByGender,
			});
		} catch (err) {
			next(err);
		}
	},

	// 브랜드별 상품 조회
	getProductsByBrand: async (req, res, next) => {
		const { brand } = req.params;

		try {
			const productsByBrand = await ProductService.getProductsByBrand(
				brand
			);

			res.status(200).json({
				message: '브랜드별 제품 조회 성공',
				productsByBrand,
			});
		} catch (err) {
			next(err);
		}
	},

	// 상품 상세 조회
	getProductById: async (req, res, next) => {
		const { productId } = req.params;

		try {
			const productInfo = await ProductService.getProductById(productId);

			if (!productInfo) {
				throw new notFoundError(
					'상품이 존재하지 않습니다. 다시 한 번 확인해주세요.'
				);
			}

			res.status(200).json({
				message: '제품 상세 보기 조회 성공',
				productInfo,
			});
		} catch (err) {
			next(err);
		}
	},

	// 인기 상품 상위 4개 조회
	getBestProducts: async (req, res, next) => {
		try {
			const bestProducts = await ProductService.getBestProducts();

			res.status(200).json({
				message: '인기 상품 4개 조회 성공',
				bestProducts,
			});
		} catch (err) {
			next(err);
		}
	},
};

module.exports = ProductController;
