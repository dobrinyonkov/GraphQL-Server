// External Dependancies
const boom = require('boom')

// Get Data Models
const Message = require('./Message')
const Conversation = require('../conversation/Conversation')

// Get all messages
exports.getMessages = async (req, reply) => {
	try {
		return await Message.find()
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Get all messages in conversation
exports.getMessagesInConversation = async (req, reply) => {
	try {
		const conversationId = req.params.id
		return await Message.find({conversationId: conversationId})
			.populate({
				path: 'author',
				select: 'image profile.firstName profile.lastName +_id'
			})
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Get single message by ID
exports.getSingleMessage = async (req, reply) => {
	try {
		const id = req.params.id
		return await Message.findById(id)
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Add a new message
exports.addMessage = async (req, reply) => {
	try {
		const message = new Message(req.body)
		await Conversation.findByIdAndUpdate(message.conversationId, {lastMessage: message._id}, {new: true})
		return message.save().then(m => m.populate({
			path: 'author',
			select: 'profile +_id'
		}).execPopulate())
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Update an existing message
exports.updateMessage = async (req, reply) => {
	try {
		const id = req.params.id
		const message = req.body
		const { ...updateData } = message
		return await Message.findByIdAndUpdate(id, updateData, {new: true})
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Delete a message
exports.deleteMessage = async (req, reply) => {
	try {
		const id = req.params.id
		return await Message.findByIdAndRemove(id)
	} catch (err) {
		throw boom.boomify(err)
	}
}
