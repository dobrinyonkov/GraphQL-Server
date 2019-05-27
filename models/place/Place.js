const mongoose = require('mongoose')

const pointSchema = new mongoose.Schema({
	type: {
		type: String,
		enum: ['Point'],
		required: true
	},
	coordinates: {
		type: [Number],
		index: '2dsphere',
		required: true
	}
});

const userSchema = new mongoose.Schema({
	visits: [{
		type:
		mongoose.Schema.Types.ObjectId,
		ref: 'Visit'
	}],
	location: pointSchema
})

module.exports = mongoose.model('Place', userSchema)
