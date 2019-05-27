const mongoose = require('mongoose')

const visitSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	place: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Place'
	}
})

module.exports = mongoose.model('Visit', visitSchema)
