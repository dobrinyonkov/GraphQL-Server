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
const propertyController = require('./PropertyController')

// Define Object Types
const propertyType = new GraphQLObjectType({
    name: 'Property',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        location: {
            type: GraphQLString,
        },
        price: {
            type: GraphQLString,
        },
        pricePerSquare: {
            type: GraphQLString,
        },
        floor: {
            type: GraphQLString,
        },
        type: {
            type: GraphQLString,
        },
        quadrature: {
            type: GraphQLString,
        },
        publisher: {
            type: GraphQLObjectType
        }
    })
})

const rootEntries = {
    property: {
        type: propertyType,
        args: {
            id: {
                type: GraphQLID
            }
        },
        async resolve(parent, args) {
            return await propertyController.getSingleProperty(args)
        }
    }
}

// Define Mutations
const mutations = {
    addProperty: {
        type: propertyType,
        args: {
            location: {
                type: new GraphQLNonNull(GraphQLString),
            },
            price: {
                type: new GraphQLNonNull(GraphQLString),
            },
            pricePerSquare: {
                type: new GraphQLNonNull(GraphQLString),
            },
            floor: {
                type: new GraphQLNonNull(GraphQLString),
            },
            type: {
                type: new GraphQLNonNull(GraphQLString),
            },
            quadrature: {
                type: new GraphQLNonNull(GraphQLString),
            },
            publisher: {
                type: new GraphQLNonNull(GraphQLObjectType),
            }
        },
        async resolve(parent, args) {
            const data = await propertyController.addProperty(args)
            return data
        }
    },
    updateProperty: {
        type: propertyType,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            location: {
                type: new GraphQLNonNull(GraphQLString),
            },
            price: {
                type: new GraphQLNonNull(GraphQLString),
            },
            pricePerSquare: {
                type: new GraphQLNonNull(GraphQLString),
            },
            floor: {
                type: new GraphQLNonNull(GraphQLString),
            },
            type: {
                type: new GraphQLNonNull(GraphQLString),
            },
            quadrature: {
                type: new GraphQLNonNull(GraphQLString),
            },
            publisher: {
                type: new GraphQLNonNull(GraphQLObjectType),
            }
        },
        async resolve(parent, args) {
            const data = await propertyController.updateProperty(args)
            return data
        }
    },
    deleteProperty: {
        type: propertyType,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        async resolve(parent, args) {
            const data = await propertyController.deleteProperty(args)
            return data
        }
    }
}

module.exports = {
    propertyType,
    rootEntries,
    mutations
}