const messageController = require('../../models/message/MessageController')
const conversationController = require('../../models/conversation/ConversationController')
const { pubsub } = require('../pubsub');

const USER_MUTATED = 'messageMutated';

module.exports = {
    Query: {
        async messages() {
            return await messageController.getMessages()
        },

        async message(parent, args) {
            return await messageController.getSingleMessage(args)
        }
    },

    Mutation: {
        async createMessage(parent, args) {
            const data = await messageController.addMessage(args.message)
            return data
        },
        async updateMessage(parent, args) {
            const data = await messageController.updateMessage(args)
            return data
        }
    },

    Subscription: {
        messageMutated: {
            subscribe: () => pubsub.asyncIterator(USER_MUTATED)
        }
    },

    Message: {
        async author(parent) {
            return await userController.getSingleUser({ id: parent.author });
        },
        async conversation(parent) {
            return await conversationController.getSingleConversation({ id: parent.conversation });
        },
    }
};
