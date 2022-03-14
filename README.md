# Fasitfy_restAPI

------  Below are the brief description about this application ------

## Functionality
An application that can upload specific URL and get the shorter url

## How the application file and folder organization
In the whole folder \
server.js is the server initial entry point \
app.js is the configuration file about the fastify server and the plugin \
app.test.js is the unit test about the application \
test.http is the API testing file (like postman)

----------------------------------------------------------------

Inside folder route \
getUrl.js is the rest api that can get the url by passing the parameter id of the url \
postUrljs is the rest api that can upload the url and expired time

----------------------------------------------------------------

Inside folder option \
option.js is the fastify route option parameter include the return type and http status code (like schema in mongodb)

----------------------------------------------------------------

## The third-party library
devDependency: \
nodemon --> help that we don't need to reload the entire application (auto reload) during devlopment

----------------------------------------------------------------

dependency: \
@autotelic/fastify-bee-queu --> create the queue that can use in our application \
fastify-plugin --> create the manual fastify plugin \
fastify-redis --> easier way to interact with the redis \
fastify-swagger --> create a swagger page that can show all the avaliable route api (like API documentation) \
pino-pretty --> organize the better log \
uuidv4 --> create the unique ID that can identify the data

## The concept about this sever organziation
Due to we are creating the microservice, we don't need to consider about UI part

At the server part, I choose fastify \
Fasitfy has below advantage: \
    1. the fastest server compare with other node framework (about 30% faster than express) \
    2. easy way to create a specific route to use \
    3. clear route schema that can help with validation and increase the API error handle \
    4. light amount of file size \
    5. newest package that can build the microservice easily

At the database part, I choose redis \
Redis has below advantage: \
    1. key - value pair data format that can easily store the javascript object \
    2. fast in CRUD \
Due to the URL will be expired, so I consider this as a cache database, and if we keep building the real app
this URL upload system won't affect toward the permanent data (like user information)

At the third-party library part, I choose serveral unique lib such as fastify-swagger and fastify-queue. \
If we need to publish our api for client side, we need to create a full documantation page that can reference (route is /doc)
As for the queue, we need to push our request sequentially (Fisrt in first serve)

----------------------------------------------------------------

In the /route folder, we define two route

inside the getUrl.js \
/url/:id --> to get the redirect url by id \
in this file, we put every request inside queue at first, and once we want to send the redirect url, we need to pass it by order
and before we redirect the url, we will have some basic logic which can check about this url

inside the postUrl.js \
/url --> to upload the url by http post method \
in this file, we will get the user upload url and expired time \
firstly, we will check the url is valid or not \
secondly, we will check the upload time (by iso time format) is expired or not \
eventually, pass the data with a generated ID (by uuidv4) into redis

inside /option folder, we define a option.js (this file is similar to mongodb schema) \
in this file, every route option can be define here \
for example, we define when the http post reqeuest success (/url in postUrl.js), once the status code is 201 (success post)
we will response the specific type of object and it's property, and we also define the upload parameter type and property

A special route is /doc that have a whole page showing the avaliable route

----------------------------------------------------------------

In the whole server setup

we will register all of the third-party or manual build plugin inside the app.js
so it can make our folder structure look more clear

and if we later want to add more functionality, we just need to base on our folder or file

----------------------------------------------------------------
## Missing function
miss a function that inside the getUrl.js, we have to check the url is upload inside database or not

## Available Scripts
In the project directory, you can run:

### `npm start`

Runs the app.\
Open [http://localhost:3000](http://localhost:3000) to use your application.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.