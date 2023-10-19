const { mongoose, Schema } = require('mongoose');

const UserSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
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
			type: String,
			default: '',
		},
		detailAddress: {
			type: String,
			default: '',
		},
		role: {
			type: String,
			enum: ['admin', 'customer'],
			default: 'customer',
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: { createdAt: 'registerDate', updatedAt: false },
	}
);

const User = mongoose.model('User', UserSchema, 'User');

module.exports = User;
