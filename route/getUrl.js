module.exports = (fastify, _, done) => {
    fastify.get('/url/:id', async(req, res) => {
        try {
            //push the new request into the queue
            fastify.bq.queues.http_queue.createJob({ ip: req.ip }).save()

            //get the request inside the queue which status is waiting
            let redis_queue = await fastify.bq.queues.http_queue.getJobs('waiting')
            
            //map the whole queue request
            redis_queue.reverse().map(async(job) => {
                
                //get the origin data from the redis db by id
                let db_url = JSON.parse(await fastify.redis.get(req.params.id))

                //check if the URL can found or not
                if(!db_url) throw new Error('URL cannot found')

                //check the date from the url is expired or not
                if(new Date().getTime() > new Date(db_url.expired).getTime()){
                    res.code(404).send('Your URL has already expired, please upload again')
                    throw new Error('Your URL has already expired')
                }

                //remove the first queue request
                await fastify.bq.queues.http_queue.removeJob(job.id)

                //redirect to the origin url
                return res.redirect(`http://localhost/${db_url.origin.slice(db_url.origin.indexOf(':') + 3)}`)
            })
        } catch (error) {
            console.log('controller get url error', error)
        }
    })

    done()
}