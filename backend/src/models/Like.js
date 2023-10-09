const { mongoose, Schema } = require('mongoose');

const LikeSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	likedProducts: {
		type: [Schema.Types.ObjectId],
		ref: 'Product',
	},
	likedArticles: {
		type: [Schema.Types.ObjectId],
		ref: 'Article',
	},
});

const Like = mongoose.model('Like', LikeSchema, 'Like');

module.exports = Like;
