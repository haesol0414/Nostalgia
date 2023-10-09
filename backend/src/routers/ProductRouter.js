const express = require('express');
const ProductController = require('../controllers/ProductController');
// const VerifyToken = require('../middleware/VerifyToken');

const ProductRouter = express.Router();

// [관리자] 상품 추가
ProductRouter.post('/admin/products', ProductController.addProducts);

// [관리자] 상품 수정
// ProductRouter.patch('/admin/products', ProductController.updateProducts);

// [관리자] 상품 삭제
ProductRouter.delete('/admin/products', ProductController.deleteProducts);
