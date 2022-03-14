const { postUrlOpt } = require('../option/option.js')
const { v4: uuidv4 } = require('uuid')

module.exports = (fastify, _, done) => {
    fastify.post('/url',  postUrlOpt, async(req, res) => {
        try {
            //check the post URL
            const regex = new RegExp("((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)")
            if (!req.body.url.match(regex)) throw new Error('Invalid URL')

            //check the url upload date is expired or not
            if(new Date().getTime() > new Date(req.body.expiredAt).getTime()) {
                res.code(404).send('404 not found, Your URL has already expired, please upload again')
                throw new Error('Your URL has already expired')
            }

            //if no problem in regular expression that define the response value
            let id = uuidv4(), url_info = {
                id: id,
                origin: req.body.url,
                shortUrl: `http://localhost:3000/${id}`,
                expired: req.body.expiredAt
            }

            // set the data inside the redis
            let db_set = await fastify.redis.set(id, JSON.stringify(url_info))
            if(!db_set) throw new Error('Some mistake in storing data, please check')
            
            //response will only send back id and short url because schema validation
            return res.code(201).send(url_info)
        } catch (error) {
            console.log('route post error', error)
        }
    })
    
    done()
}