const { mongoose, Schema } = require('mongoose');

const CommentSchema = new Schema(
	{
		commenter: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		text: {
			type: String,
			required: true,
		},
		parentComment: {
			type: Schema.Types.ObjectId,
			ref: 'Commment',
		},
	},
	{
		timestamps: { createdAt: 'commentDate', updatedAt: 'updatedDate' },
	}
);

const ArticleSchema = new Schema(
	{
		subject: {
			type: String,
			enum: ['추천 해요', '추천 받아요'],
			required: true,
		},
		writer: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		content: {
			type: String,
			required: true,
		},
		comments: {
			type: [CommentSchema],
		},
		likedUsers: {
			type: [Schema.Types.ObjectId],
			ref: 'User',
		},
	},
	{
		timestamps: { createdAt: 'ArticleDate', updatedAt: 'updatedDate' },
	}
);

const Article = mongoose.model('Article', ArticleSchema, 'Article');

module.exports = { Article, Commment };
