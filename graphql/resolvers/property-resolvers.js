const propertyController = require('../../models/property/PropertyController')
const userController = require('../../models/user/UserController')

const { pubsub } = require('../pubsub');

const PROPERTY_MUTATED = 'propertyMutated';

function publishPropertyUpdated(property) {
    pubsub.publish(PROPERTY_MUTATED, {
        propertyMutated: {
            mutation: 'UPDATED',
            node: property
        }
    });
    return property;
}

module.exports = {
    Query: {
        async properties() {
            return await propertyController.getProperties()
        },
        async property(parent, args) {
            return await propertyController.getSingleProperty(args)
        }
    },


    Mutation: {
        async createProperty(parent, args) {
            const data = await propertyController.addProperty(args.property)
            return data
        },
        async updateUser(parent, args) {
            const data = await propertyController.updateProperty(args)
            return data
        },
        async setPropertyPublisher(parent, args) {
            const data = await propertyController.updateProperty(args)
            return data
        }
    },

    Subscription: {
        propertyMutated: {
            subscribe: () => pubsub.asyncIterator(PROPERTY_MUTATED)
        }
    },

    Property: {
        async publisher(parent) { 
            return await userController.getSingleUser({ id: parent.publisher });
        },
    }
};
