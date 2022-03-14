//define the schema and validation in the post request

//post url API request validation and response type
exports.postUrlOpt = {
    schema:{
        //body is the validation of the request
        body: {
            type: 'object',
            required: ['url', 'expiredAt'],
            properties: {
                url: {  type: 'string' },
                expired: { type: 'string' }
            }
        },
        response:{
            201: {
                type: 'object',
                properties: {
					id: { type: 'string' },
                    shortUrl: { type: 'string' }
                }
            }
        }
    }
}