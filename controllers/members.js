const fs = require('fs')
const data = require('../data.json')
const { age, formatter, date } = require('../utilities')
const { parse } = require('path')

exports.index = (req, res) => {
    return res.render('members/index', { members: data.members })
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

    birth = Date.parse(req.body.birth)

    // let id = 1
    // const lastMember = data.members[data.members.length - 1]

    // if (lastMember) {
    //     id == lastMember.id + 1
    // }

    const id = data.members.length + 1 

    data.members.push({
        id,
        ...req.body,
        birth
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Error occurred while writing file!')

        return res.redirect(`/members/${id}`)
    })
}

exports.show = (req, res) => {
    const { id } = req.params

    const foundMembers = data.members.find(member => member.id == id)
    if (!foundMembers) return res.send('not found')

    const member = {
        ...foundMembers,
        age: age(foundMembers.birth),
        weight: `${foundMembers.weight} kg`,
        height: `${foundMembers.height} cm`,
        birth: date(foundMembers.birth).birthday
    }

    return res.render('members/show', { member })
}

exports.edit = (req, res) => {
    const { id } = req.params

    const foundMembers = data.members.find(member => member.id == id)
    if (!foundMembers) return res.send('not found')

    const member = {
        ...foundMembers,
        birth: date(foundMembers.birth).iso,
        blood: foundMembers.blood
    }


    return res.render('members/edit', { member })
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

    const member = {
        ...foundMembers,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        if (err) return res.send('Member not found!')

        return res.redirect(`/members/${id}`)
    })
}

exports.delete = (req, res) => {
    const { id } = req.body

    const filteredMembers = data.members.filter(member => member.id != id)

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        if (err) res.send('User not found')

        return res.redirect('/members')
    })

}