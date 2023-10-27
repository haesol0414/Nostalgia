const express = require('express');
const ProductController = require('../controllers/ProductController');
const VerifyToken = require('../middleware/VerifyToken');

const ProductRouter = express.Router();

// [관리자] 상품 추가
ProductRouter.post('/products', VerifyToken, ProductController.addProducts);

// [관리자] 상품 전체 조회
ProductRouter.get('/products', VerifyToken, ProductController.getAllProducts);

// [관리자] 상품 수정
ProductRouter.patch(
	'/admin/products',
	VerifyToken,
	ProductController.updateProducts
);

// [관리자] 상품 삭제
ProductRouter.delete(
	'/admin/products',
	VerifyToken,
	ProductController.deleteProducts
);

// (성별) 카테고리별 상품 조회
ProductRouter.get(
	'/products/gender/:gender',
	ProductController.getProductsByGender
);

// 브랜드별 상품 조회
ProductRouter.get(
	'/products/brand/:brand',
	ProductController.getProductsByBrand
);
// = 쿼리로 바꿔야함

// 상품 상세 조회
ProductRouter.get('/products/:productId', ProductController.getProductById);

// 인기 상품 4개 조회
ProductRouter.get('/products/best-products', ProductController.getBestProducts);

module.exports = ProductRouter;
