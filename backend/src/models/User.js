const { mongoose, Schema } = require('mongoose');

const UserSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			enum: ['woman', 'man', 'genderless'],
		},
		name: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			default: '',
		},
		address: {
			city: {
				type: String,
				default: '',
			},
			detail: {
				type: String,
				default: '',
			},
			zipCode: {
				type: String,
				default: '',
			},
		},
		role: {
			type: String,
			enum: ['admin', 'customer'],
			default: 'customer',
		},
		wishList: {
			type: [Schema.Types.ObjectId],
			ref: 'Product',
		},
		preference: {
			type: String,
		},
	},
	{
		timestamps: { createdAt: 'registerDate', updatedAt: false },
	}
);

const User = mongoose.model('User', UserSchema, 'User');

module.exports = User;
