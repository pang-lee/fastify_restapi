// Require the framework and instantiate it
const fastify = require('./app')({
    logger: {
      level: 'info',
      prettyPrint: true
    }
  })

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()