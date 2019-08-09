const conversationController = require('../../models/conversation/ConversationController')
const userController = require('../../models/user/UserController')
const messageController = require('../../models/message/MessageController')
const { pubsub } = require('../pubsub');

const USER_MUTATED = 'conversationMutated';

module.exports = {
    Query: {
        async conversations() {
            return await conversationController.getConversations()
        },

        async conversation(parent, args) {
            return await conversationController.getSingleConversation(args)
        }
    },

    Mutation: {
        async createConversation(parent, args) {
            const data = await conversationController.addConversation(args.conversation)
            return data
        },
        // async updateConversation(parent, args) {
        //     const data = await conversationController.updateConversation(args)
        //     return data
        // }
    },

    Subscription: {
        conversationMutated: {
            subscribe: () => pubsub.asyncIterator(USER_MUTATED)
        }
    },

    Conversation: {
        async participants(parent) {
            return await userController.getUsers({ ids: parent.participants });
        },
        async lastMessage(parent) {
            return await messageController.getSingleMessage({ id: parent.lastMessage });
        },
    }
};
