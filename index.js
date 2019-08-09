// Require external modules
require('./env')
const mongoose = require('mongoose')

const { ApolloServer, gql } = require('apollo-server-fastify');

const { typeDefs } = require('./graphql/typedefs');
const { resolvers } = require('./graphql/resolvers');

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

fastify.register(require('fastify-cors'), {
  // put your options here
  origin: '*',
  credentials: true,
  allowedHeaders: ['Origin', 'Content-Type', 'Authorization', 'Content-Length'],
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']
})

mongoose.set('useFindAndModify', false);

const server = new ApolloServer({
  typeDefs: gql `
    ${typeDefs}
  `,
  resolvers,
});

fastify.register(server.createHandler());

mongoose
  .connect(`mongodb://${dbUser}:${dbPassword}@ds211265.mlab.com:11265/uber-guide-v2`, { 
    useNewUrlParser: true 
  })
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