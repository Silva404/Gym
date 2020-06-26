const fs = require('fs')
const data = require('./data.json')
const { age, formatter, date } = require('./utilities')

// show
exports.show = (req, res) => {
    const { id } = req.params

    const foundInstructors = data.instructors.find(instructor => instructor.id == id)
    if (!foundInstructors) return res.send('not found')

    const instructor = {
        ...foundInstructors,
        age: age(foundInstructors.birth),
        services: foundInstructors.services.split(','),
        created_at: formatter.format(foundInstructors.created_at),
    }

    return res.render('instructors/show', { instructor })
}

// edit
exports.edit = (req, res) => {
    const { id } = req.params

    const foundInstructors = data.instructors.find(instructor => instructor.id == id)
    if (!foundInstructors) return res.send('not found')

    const instructor = {
        ...foundInstructors,
        birth: date(foundInstructors.birth)
    }


    return res.render('instructors/edit', { instructor })
}

// create
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

    data.instructors.push({
        avatar_url,
        birth,
        gender,
        id,
        name,
        services,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Error occurred while writing file!')

        return res.redirect(`/instructors/${id}`)
    })
}

// put 
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

    const instructor = {
        ...foundInstructors,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        if (err) return res.send('Instructor not found!')

        return res.redirect(`/instructors/${id}`)
    })
}

// delete
exports.delete = (req, res) => {
    const { id } = req.body

    const filteredInstructors = data.instructors.filter( instructor => instructor.id != id)

    data.instructors = filteredInstructors

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        if (err) res.send('User not found')

        return res.redirect('/instructors')
    })

}