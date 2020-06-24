const express = require('express')
const routes = express.Router()
const instructors = require('./instructors')

routes.get('/', (req, res) => {
    res.redirect('/instructors')
})

routes.get('/instructors', (req, res) => {
    return res.render('instructors/index')
})

routes.get('/instructors/create', (req, res) => {
    return res.render('instructors/create')
})

routes.get('/instructors/:id', instructors.show)    

routes.post('/instructors', instructors.post)

routes.get('/members', (req, res) => {
    return res.render('members')
})

module.exports = routes