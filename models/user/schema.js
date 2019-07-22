// Import External Dependancies
const graphql = require('graphql')

// Destructure GraphQL functions
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull
} = graphql

// Import Controllers
const userController = require('./UserController')

// Define Object Types
const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        email: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
    })
})

const rootEntries = {
    user: {
        type: userType,
        args: {
            id: {
                type: GraphQLID
            }
        },
        async resolve(parent, args) {
            return await userController.getSingleUser(args)
        }
    }
}

// Define Mutations
const mutations = {
    addUser: {
        type: userType,
        args: {
            email: {
                type: new GraphQLNonNull(GraphQLString)
            },
            password: {
                type: new GraphQLNonNull(GraphQLString)
            },
        },
        async resolve(parent, args) {
            const data = await userController.addUser(args)
            return data
        }
    },
    updateUser: {
        type: userType,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            email: {
                type: new GraphQLNonNull(GraphQLString)
            },
            password: {
                type: new GraphQLNonNull(GraphQLString)
            },
        },
        async resolve(parent, args) {
            const data = await userController.updateUser(args)
            return data
        }
    },
    deleteUser: {
        type: userType,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        async resolve(parent, args) {
            const data = await userController.deleteUser(args)
            return data
        }
    }
}

module.exports = {
    userType,
    rootEntries,
    mutations
}