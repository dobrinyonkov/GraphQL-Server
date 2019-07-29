const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: false
	},
	properties: [{
		type:
		mongoose.Schema.Types.ObjectId,
		ref: 'Property'
	}],
})

module.exports = mongoose.model('User', userSchema)