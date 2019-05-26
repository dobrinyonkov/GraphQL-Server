// Import our Controllers
const messageController = require('./MessageController')

const routes = [
	{
		method: 'GET',
		url: '/api/messages',
		handler: messageController.getMessages
	},
	{
		method: 'GET',
		url: '/api/messages/conversation/:id',
		handler: messageController.getMessagesInConversation
	},
	{
		method: 'GET',
		url: '/api/messages/:id',
		handler: messageController.getSingleMessage
	},
	{
		method: 'POST',
		url: '/api/messages',
		handler: messageController.addMessage,
		// schema: documentation.addMessageSchema
	},
	{
		method: 'PUT',
		url: '/api/messages/:id',
		handler: messageController.updateMessage
	},
	{
		method: 'DELETE',
		url: '/api/messages/:id',
		handler: messageController.deleteMessage
	}
]

module.exports = routes
