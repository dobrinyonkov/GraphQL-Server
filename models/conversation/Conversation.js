const mongoose = require('mongoose')

// Schema defines how chat messages will be stored in MongoDB
const conversationSchema = new mongoose.Schema({
	participants: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	lastMessage: {
		type: Object,
		// ref: 'Message'
	}
});


module.exports = mongoose.model('Conversation', conversationSchema)
