const build = require('./app')

const test = async () => {
  try {
    const app = build()

    //default get the slash 
    const getslash = await app.inject({
      method: 'GET',
      url: '/'
    })

    //get the url from getAPI
    const getUrl = await app.inject({
      method: 'GET',
      url: '/url'
    })

    //get the post url from postAPI
    const postUrl = await app.inject({
      method: 'POST',
      url: '/url',
      payload: {
        url: "https://test.com",
        expiredAt: "2023-02-08T09:20:41Z"
      }
    })

    console.log('status code: ', getslash.statusCode)
    console.log('body: ', getslash.body)

    console.log('status code: ', getUrl.statusCode)
    console.log('body: ', getUrl.body)

    console.log('status code: ', postUrl.statusCode)
    console.log('body: ', postUrl.body)

  } catch (error) {
    console.log('app test error', error)
  }
}
test()