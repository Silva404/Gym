const { date, age, formatter } = require('../../lib/utils')
const Member = require('../models/Members')

module.exports = {
    index(req, res) {
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(members) {

                const pagination = {
                    total: Math.ceil(members[0].total / limit),
                    page,
                }

                return res.render('members/index', { members, pagination, filter })
            }
        } 

        Member.paginate(params)
    },
    create(req, res) {
        Member.instructorsSelectOptions(options => {
            return res.render('members/create', { Instructor_options: options })
        })
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == '')
                res.send('Please fill and the fields!')
        }

        Member.create(req.body, member => {
            return res.redirect(`/members/${member.id}`)
        })

    },
    show(req, res) {
        Member.find(req.params.id, function (member) {
            if (!member) return res.send('Member not found')

            member.birth = date(member.birth).birthday
            member.created_at = date(member.created_at).created

            return res.render('members/show', { member })
        })
    },
    edit(req, res) {
        Member.find(req.params.id, function (member) {
            if (!member) return res.send('Member not found')

            member.birth = date(member.birth).iso

            Member.instructorsSelectOptions(options => {
                return res.render('members/edit', { member, Instructor_options: options })
            })
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == '')
                res.send('Please fill and the fields!')
        }

        Member.update(req.body, () => {
            return res.redirect(`/members/${req.body.id}`)
        })
    },
    delete(req, res) {
        Member.delete(req.body.id, () => {
            return res.redirect('/members')
        })
    }
}