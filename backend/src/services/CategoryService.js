const Category = require('../models/Category');

const CategoryService = {
	// [관리자] 카테고리 추가
	addCategory: async ({ categoryName }) => {
		await Category.create({ categoryName: categoryName });
	},

	// [관리자] 카테고리 삭제
	deleteCategory: async ({ categoryName }) => {
		await Category.deleteOne({ categoryName: categoryName });
	},

	// [관리자] 카테고리 수정
	updateCategory: async ({ categoryName, editedName }) => {
		await Category.updateOne(
			{ categoryName: categoryName },
			{ categoryName: editedName }
		);
	},
};

module.exports = CategoryService;
