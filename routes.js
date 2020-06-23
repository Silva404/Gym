const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
    res.redirect('/instructors')
})

routes.get('/instructors', (req, res) => {
    return res.render('instructors/index')
})

routes.post('/instructors', (req, res) => {
    const keys = Object.keys(req.body)

    for (let key of keys) {
        if (req.body[key] == '') 
            res.send('Please fill and the fields!')
        
    }

    return 
    // return res.send(req.body)
})

routes.get('/instructors/create', (req, res) => {
    return res.render('instructors/create')
})

routes.get('/members', (req, res) => {
    return res.render('members')
})

module.exports = routes