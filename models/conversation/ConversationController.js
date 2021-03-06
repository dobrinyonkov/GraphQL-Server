// External Dependancies
const boom = require('boom')

// Get Data Models
const Conversation = require('./Conversation')
const Message = require('../message/Message')

// Get all conversations
exports.getConversations = async (req, reply) => {
	try {
		return await Conversation.find()
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Get all conversations
exports.getConversationsByParticipant = async (req, reply) => {
	try {
		const participantId = req.params.id
		const messagesRequired = req.query.requireMessages
		
		const messages = messagesRequired ? await Message.find({conversationId: messagesRequired})
			 : null
			//  .populate({
			// 	path: 'author',
			// 	select: 'image profile.firstName profile.lastName +_id'
			// })
		const conversations = await Conversation.find({participants: participantId})
				// .populate({
				// 	path: 'participants',
				// 	select: 'image profile.firstName profile.lastName +_id'
				// })
				// .populate({
				// 	path: 'lastMessage',
				// })
			
		return {
			conversations,
			messages,
			conversationId: messagesRequired
		}
		
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Get single conversation by ID
exports.getSingleConversation = async (req, reply) => {
	try {
		const id = req.params.id
		return await Conversation.findById(id) //.populate('lastMessage')
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Add a new conversation
exports.addConversation = async (req, reply) => {
	try {
		const recipient = req.body.recipient
		const user = req.body.user
		const composedMessage = req.body.composedMessage
		
		if(!recipient || !user) {
			return {
				message: 'Please choose a valid recipient for your message.',
				statusCode: 422
			}
		}
		
		if(!composedMessage) {
			return {
				message: 'Please enter a message.',
				statusCode: 422
			}
		}

		//check if conversation exists
		let conversation = await Conversation.findOne({ "participants": { "$size" : 2, "$all": [recipient, user] }  });

		if (!conversation) {
			conversation = new Conversation({ participants: [recipient, user] })
		}

		const message = new Message({
			conversationId: conversation._id,
			body: composedMessage,
			author: user
		})
		
		conversation.lastMessage = message._id // TODO :: temporary solution
		
		return {
			message: await message.save(),
			conversation: await conversation.save()
		}
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Update an existing conversation
exports.updateConversation = async (req, reply) => {
	try {
		const id = req.params.id
		const conversation = req.body
		const { ...updateData } = conversation
		return await Conversation.findByIdAndUpdate(id, updateData, {new: true})
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Delete a conversation
exports.deleteConversation = async (req, reply) => {
	try {
		const id = req.params.id
		return await Conversation.findByIdAndRemove(id)
	} catch (err) {
		throw boom.boomify(err)
	}
}
