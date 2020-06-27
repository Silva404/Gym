const fs = require('fs')
const data = require('../data.json')
const { age, formatter, date } = require('../utilities')

exports.index = (req, res) => {
    return res.render('members/index', { members: data.members })
}

exports.show = (req, res) => {
    const { id } = req.params

    const foundMembers = data.members.find(member => member.id == id)
    if (!foundMembers) return res.send('not found')

    const member = {
        ...foundMembers,
        age: age(foundMembers.birth),
        // services: foundMembers.services.split(','),
        created_at: formatter.format(foundMembers.created_at),
    }

    return res.render('members/show', { member })
}

exports.edit = (req, res) => {
    const { id } = req.params

    const foundMembers = data.members.find(member => member.id == id)
    if (!foundMembers) return res.send('not found')

    const member = {
        ...foundMembers,
        birth: date(foundMembers.birth)
    }


    return res.render('members/edit', { member })
}

exports.create = (req, res) => {
    return res.render('members/create')
}

exports.post = (req, res) => {
    const keys = Object.keys(req.body)

    for (let key of keys) {
        if (req.body[key] == '')
            res.send('Please fill and the fields!')
    }

    let { avatar_url, birth, gender, services, name } = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.members.length + 1)
    const services_New = services.split(',')

    data.members.push({
        avatar_url,
        birth,
        gender,
        id,
        name,
        services: services_New,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Error occurred while writing file!')

        return res.redirect(`/members/${id}`)
    })
}

exports.put = (req, res) => {
    const { id } = req.body
    let index = 0

    const foundMembers = data.members.find((member, foundIndex) => {
        if (member.id == id) {
            index = foundIndex
            return true
        }
    })
    if (!foundMembers) return res.send('not found')

    let { services } = req.body
    const services_New = services.split(',')

    const member = {
        ...foundMembers,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id),
        services: services_New,
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        if (err) return res.send('Member not found!')

        return res.redirect(`/members/${id}`)
    })
}

exports.delete = (req, res) => {
    const { id } = req.body

    const filteredMembers = data.members.filter( member => member.id != id)

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        if (err) res.send('User not found')

        return res.redirect('/members')
    })

}