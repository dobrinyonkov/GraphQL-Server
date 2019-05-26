// Import our Controllers
const conversationController = require('./ConversationController')

const routes = [
	{
		method: 'GET',
		url: '/api/conversations',
		handler: conversationController.getConversations
	},
	{
		method: 'GET',
		url: '/api/conversations/participants/:id',
		handler: conversationController.getConversationsByParticipant
	},
	{
		method: 'GET',
		url: '/api/conversations/:id',
		handler: conversationController.getSingleConversation
	},
	{
		method: 'POST',
		url: '/api/conversations',
		handler: conversationController.addConversation,
		// schema: documentation.addConversationSchema
	},
	{
		method: 'PUT',
		url: '/api/conversations/:id',
		handler: conversationController.updateConversation
	},
	{
		method: 'DELETE',
		url: '/api/conversations/:id',
		handler: conversationController.deleteConversation
	}
]

module.exports = routes
