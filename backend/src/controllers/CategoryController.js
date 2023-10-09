const CategoryService = require('../services/CategoryService');
const { badRequestError } = require('../middleware/ErrorHandler');

const CategoryController = {
    // 전체 카테고리 조회
	// 성별 카테고리 조회
	// 브랜드 카테고리 조회

	// [관리자] 카테고리 추가
	addCategory: async (req, res, next) => {
		const role = req.currentUserRole;
		const { categoryName } = req.body;

		try {
			if (role !== 'admin') {
				throw new badRequestError('관리자만 접근이 가능합니다.');
			}

			await CategoryService.addCategory({ categoryName });

			res.status(200).json({
				message: '[관리자] 카테고리 추가 성공',
			});
		} catch (err) {
			next(err);
		}
	},

	// [관리자] 카테고리 삭제
	deleteCategory: async (req, res, next) => {
		const role = req.currentUserRole;
		const { categoryName } = req.body;

		try {
			if (role !== 'admin') {
				throw new badRequestError('관리자만 접근이 가능합니다.');
			}

			await CategoryService.deleteCategory({ categoryName });

			res.status(200).json({
				message: '[관리자] 카테고리 삭제 성공',
			});
		} catch (err) {
			next(err);
		}
	},

	// [관리자] 카테고리 수정
	updateCategory: async (req, res, next) => {
		const role = req.currentUserRole;
		const { categoryName, editedName } = req.body;

		try {
			if (role !== 'admin') {
				throw new badRequestError('관리자만 접근이 가능합니다.');
			}

			await CategoryService.updateCategory({ categoryName, editedName });

			res.status(200).json({
				message: '[관리자] 카테고리 수정 성공',
			});
		} catch (err) {
			next(err);
		}
	},
};

module.exports = CategoryController;
