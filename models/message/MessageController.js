// External Dependancies
const boom = require('boom')

// Get Data Models
const Message = require('./Message')
const Conversation = require('../conversation/Conversation')

// Get all messages
exports.getMessages = async (args) => {
	try {
		return await Message.find()
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Get all messages in conversation
exports.getMessagesInConversation = async (args) => {
	try {
		const conversationId = args.id
		return await Message.find({conversationId: conversationId})
			// .populate({
			// 	path: 'author',
			// 	select: 'image profile.firstName profile.lastName +_id'
			// })
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Get single message by ID
exports.getSingleMessage = async (args) => {
	try {
		const id = args.id
		return await Message.findById(id)
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Add a new message
exports.addMessage = async (args) => {
	try {
		const message = new Message(args.body)
		let conversations = await Conversation.find({_id: args.body.conversationId, participants: args.body.author})
		
		//TODO :: implement validator.js and move there
		if (!conversations || conversations.length === 0) {
			const err = new Error('Forbidden or No Permission to Access');
			err.code = '403'
			throw boom.boomify(err)
		}
		
		await Conversation.findByIdAndUpdate(message.conversationId, {lastMessage: message._id}, {new: true})
		return message.save()
			// .then(m => m.populate({
			// 	path: 'author',
			// 	select: 'profile +_id'
			// }).execPopulate())
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Update an existing message
exports.updateMessage = async (args) => {
	try {
		const id = args.id
		const message = args.body
		const { ...updateData } = message
		return await Message.findByIdAndUpdate(id, updateData, {new: true})
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Delete a message
exports.deleteMessage = async (args) => {
	try {
		const id = args.id
		return await Message.findByIdAndRemove(id)
	} catch (err) {
		throw boom.boomify(err)
	}
}
