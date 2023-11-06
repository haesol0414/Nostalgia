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
ProductRouter.get('/products/gender', ProductController.getProductsByGender);

// // 브랜드별 상품 조회
// ProductRouter.get('/products/brand', ProductController.getProductsByBrand);

// 태그별 상품 조회
ProductRouter.get('/products/tags', ProductController.getProductsByTags);

// 상품 상세 조회
ProductRouter.get('/products/:productId', ProductController.getProductById);

// 홈 화면 제품 조회
ProductRouter.get('/main-products', ProductController.getMainProducts);

module.exports = ProductRouter;
