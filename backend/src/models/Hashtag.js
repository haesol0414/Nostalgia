const { mongoose, Schema } = require('mongoose');

const HashtagSchema = new Schema({
	tagName: {
		type: String,
		required: true,
	},
	tagProducts: {
		type: [Schema.Types.ObjectId],
		ref: 'Product',
	},
});

const Hashtag = mongoose.model('Hashtag', HashtagSchema, 'Hashtag');

module.exports = Hashtag;
