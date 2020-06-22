const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
    res.redirect('/instructors')
})

routes.get('/instructors', (req, res) => {
    res.render('instructors/index')
})


routes.get('/members', (req, res) => {
    res.render('members')
})

module.exports = routes