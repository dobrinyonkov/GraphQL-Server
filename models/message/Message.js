const mongoose = require('mongoose');

// Schema defines how chat messages will be stored in MongoDB
const messageSchema = new mongoose.Schema({
		conversationId: {
			type:  mongoose.Schema.Types.ObjectId,
			required: true
		},
		body: {
			type: String,
			required: true
		},
		author: {
			type:  mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	{
		timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
	});


module.exports = mongoose.model('Message', messageSchema)
