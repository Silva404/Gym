// usando o express
const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')

const server = express()


server.use(routes)
server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
    noCache: true,
    express: server,
    autoescape: false
})

server.listen(3000, () => {
    console.log('Server is on!')
})