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
			city: {
				type: String,
				default: '',
			},
			detail: {
				type: String,
				default: '',
			},
		},
		role: {
			type: String,
			enum: ['admin', 'customer'],
			default: 'customer',
		},
	},
	{
		timestamps: { createdAt: 'registerDate', updatedAt: false },
	}
);

const User = mongoose.model('User', UserSchema, 'User');

module.exports = User;
