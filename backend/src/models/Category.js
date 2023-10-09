const { mongoose, Schema } = require('mongoose');

const CategorySchema = new Schema({
	categoryName: {
		type: String,
		required: true,
	},
	isGender: {
		type: Boolean,
		default: false,
	},
	isBrand: {
		type: Boolean,
		default: false,
	},
});

const Category = mongoose.model('Category', CategorySchema, 'Category');

module.exports = Category;
