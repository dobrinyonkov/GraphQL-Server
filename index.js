// Require external modules
const mongoose = require('mongoose')

const routes = require('./routes')

// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})

fastify.register(require('fastify-cors'), { 
  // put your options here
})

routes.forEach((route, index) => {
	fastify.route(route)
})

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

mongoose.set('useFindAndModify', false);

// Connect to DB
mongoose.connect('mongodb://admin:1q2w3e@ds211265.mlab.com:11265/uber-guide-v2')
 .then(() => console.log('MongoDB connected…'))
 .catch(err => console.log(err))

// Run the server!
const port = 3000
const start = async () => {
  try {
    await fastify.listen(process.env.PORT, '0.0.0.0')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
