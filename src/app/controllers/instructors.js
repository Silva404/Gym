const { age, formatter, date } = require('../../lib/utils')

exports = {
    index(req, res) {
        return res.render('instructors/index')
    },
    create(req, res) {
        return res.render('instructors/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == '')
                res.send('Please fill and the fields!')
        }
    },
    edit(req, res) {
        return
    },
    show(req, res) {
        return
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == '')
                res.send('Please fill and the fields!')
        }
    },
    delete(req, res) {
        return
    },
}