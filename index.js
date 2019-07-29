// Require external modules
const mongoose = require('mongoose')

// const routes = require('./routes')
// const schema = require('./schema')

const {
  ApolloServer,
  gql
} = require('apollo-server-fastify');

const {
  typeDefs
} = require('./graphql/typedefs');
const {
  resolvers
} = require('./graphql/resolvers');

// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})

fastify.register(require('fastify-cors'), {
  // put your options here
  origin: '*',
  credentials: true,
  allowedHeaders: ['Origin', 'Content-Type', 'Authorization', 'Content-Length'],
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']
})

// // Register Fastify GraphQL
// fastify.register(gql, {
//   schema,
//   graphiql: true
// })

// routes.forEach((route, index) => {
// 	fastify.route(route)
// })

// // Declare a route
// fastify.get('/', async (request, reply) => {
//   return { hello: 'world' }
// })

mongoose.set('useFindAndModify', false);

const server = new ApolloServer({
  typeDefs: gql `
    ${typeDefs}
  `,
  resolvers,
});

fastify.register(server.createHandler());

// Connect to DB
// mongoose.connect('mongodb://admin:1q2w3e@ds153947.mlab.com:53947/property-store', {
mongoose.connect('mongodb://admin:1q2w3e@ds211265.mlab.com:11265/uber-guide-v2',  { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected…'))
  .catch(err => console.log(err))

// Run the server!
const port = 3000
const start = async () => {
  try {
    await fastify.listen(process.env.PORT || port, '0.0.0.0')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()