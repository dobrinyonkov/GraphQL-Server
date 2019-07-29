const userController = require('../../models/user/UserController')
const propertyController = require('../../models/property/PropertyController')
const { pubsub } = require('../pubsub');

const USER_MUTATED = 'userMutated';

module.exports = {
    Query: {
        async users() {
            return await userController.getUsers()
        },

        async user(parent, args) {
            return await userController.getSingleUser(args)
        }
    },

    Mutation: {
        async createUser(parent, args) {
            const data = await userController.addUser(args.user)
            return data
        },
        async updateUser(parent, args) {
            const data = await userController.updateUser(args)
            return data
        }
    },

    Subscription: {
        userMutated: {
            subscribe: () => pubsub.asyncIterator(USER_MUTATED)
        }
    },

    User: {
        async properties(parent) {
            return await propertyController.getUserProperties(parent._id);
        }
    }
};
