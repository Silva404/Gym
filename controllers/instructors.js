const fs = require('fs')
const data = require('../data.json')
const { age, formatter, date } = require('../utilities')

exports.index = (req, res) => {
    return res.render('instructors/index', { instructors: data.instructors })
}

exports.edit = (req, res) => {
    const { id } = req.params

    const foundInstructors = data.instructors.find(instructor => instructor.id == id)
    if (!foundInstructors) return res.send('not found')

    const instructor = {
        ...foundInstructors,
        birth: date(foundInstructors.birth).iso
    }


    return res.render('instructors/edit', { instructor })
}

exports.create = (req, res) => {
    return res.render('instructors/create')
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
    const id = Number(data.instructors.length + 1)
    const services_New = services.split(',')

    data.instructors.push({
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

        return res.redirect(`/instructors/${id}`)
    })
}

exports.show = (req, res) => {
    const { id } = req.params

    const foundInstructors = data.instructors.find(instructor => instructor.id == id)
    if (!foundInstructors) return res.send('not found')

    const instructor = {
        ...foundInstructors,
        age: age(foundInstructors.birth),
        created_at: date(foundInstructors.created_at).created,
    }

    return res.render('instructors/show', { instructor })
}

exports.put = (req, res) => {
    const { id } = req.body
    let index = 0

    const foundInstructors = data.instructors.find((instructor, foundIndex) => {
        if (instructor.id == id) {
            index = foundIndex
            return true
        }
    })
    if (!foundInstructors) return res.send('not found')

    let { services } = req.body
    const services_New = services.split(',')

    const instructor = {
        ...foundInstructors,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id),
        services: services_New
    }

    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        if (err) return res.send('Instructor not found!')

        return res.redirect(`/instructors/${id}`)
    })
}

exports.delete = (req, res) => {
    const { id } = req.body

    const filteredInstructors = data.instructors.filter( instructor => instructor.id != id)

    data.instructors = filteredInstructors

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        if (err) res.send('User not found')

        return res.redirect('/instructors')
    })

}