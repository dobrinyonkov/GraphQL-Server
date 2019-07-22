// Import External Dependancies
const graphql = require('graphql')

// Destructure GraphQL functions
const {
	GraphQLSchema,
	GraphQLObjectType,
} = graphql

const user = require('../models/user/schema')

// Define Root Query
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		...user.rootEntries
	}
})

// Define Mutations
const Mutations = new GraphQLObjectType({
	name: 'Mutations',
	fields: {
		...user.mutations
	}
})

// Export the schema
module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutations
})