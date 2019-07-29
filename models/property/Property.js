const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
	location: {
		type: String,
	},
	price: {
		type: String,
	},
	pricePerSquare: {
		type: String,
	},
	floor: {
		type: String,
	},
	type: {
		type: String,
	},
	quadrature: {
		type: String,
	},
	publisher: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},

})

module.exports = mongoose.model('Property', propertySchema)
