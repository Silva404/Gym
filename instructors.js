const fs = require('fs')
const data = require('./data.json')
const { age, formatter, date } = require('./utilities')

// show
exports.show = (req, res) => {
    const { id } = req.params

    const foundInstructors = data.instructors.find(instructor => instructor.id == id)
    if(!foundInstructors) return res.send('not found')

    

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
    if(!foundInstructors) return res.send('not found')

    const instructor = {
        ...foundInstructors,
        birth: date(foundInstructors.birth)
    }


    return res.render('instructors/edit', { instructor })
}

// create
exports.post = (req, res) => {
    // form authentication
    const keys = Object.keys(req.body)

    for (let key of keys) {
        if (req.body[key] == '')
            res.send('Please fill and the fields!')
    }

    // deconstructing data from req.body so i can select the data that i push
    let { avatar_url, birth, gender, services, name } = req.body

    // data conversion     
    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1)

    data.instructors.push({
        avatar_url,
        birth,
        gender,
        id,
        services,
        created_at
    })

    // system data
    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Error occurred while writing file!')

        return res.redirect('/instructors')
    })
}