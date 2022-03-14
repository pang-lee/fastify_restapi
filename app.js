function build(opts={ trustProxy: true }) {
    const app = require('fastify')(opts)

    //register the redis
    app.register(require('fastify-redis'), { 
      host: '127.0.0.1',
      password: '',
      port: 6379, // Redis port
      family: 4   // 4 (IPv4) or 6 (IPv6)
    })

    //register API doc in route /doc
    app.register(require('fastify-swagger'), {
      routePrefix: '/docs',
      exposeRoute: true,
      swagger: {
        info: { title: 'fastify-api' },
        description: 'Avaliable fastify swagger api'
      }
    })

    //register the queue with redis
    app.register(require('@autotelic/fastify-bee-queue').fastifyBeeQueue, {
      redis: 'redis://127.0.0.1',
    })
    
    // Create a Queue instance. By default each Queue will create a connection to redis.
    app.register(async (fastify, opts) => {
      await fastify.bq.createProducer('http_queue')
    })
    
    // register the route plugin
    app.register(require('./route/getUrl.js'))
    app.register(require('./route/postUrl.js'))

    //default route
    app.get('/', async function (request, reply) {
      return { hello: 'world' }
    })

    return app
}

module.exports = build