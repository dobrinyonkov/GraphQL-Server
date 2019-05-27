// Import our Controllers
const userPaths = require('../models/user/paths')
const messagePaths = require('../models/message/paths')
const conversationPaths = require('../models/conversation/paths')
const placePaths = require('../models/place/paths')
const visitPaths = require('../models/visit/paths')

const routes = [
	...userPaths,
	...messagePaths,
	...conversationPaths,
	...placePaths,
	...visitPaths
]

module.exports = routes
